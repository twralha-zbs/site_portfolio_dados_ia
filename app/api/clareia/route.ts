import { NextResponse } from "next/server";

// Inscrição na ClareIA: recebe o envio do FormularioClareia e repassa o email
// para a API do Beehiiv com dupla confirmação forçada. A chave da API só
// existe aqui, no servidor (variáveis BEEHIIV_API_KEY e
// BEEHIIV_PUBLICATION_ID, cadastradas na Vercel; nunca no repositório).
//
// Email novo e email já inscrito recebem a mesma resposta: a página nunca
// revela se alguém está na lista.

const LIMITE_ENVIOS = 5;
const JANELA_MS = 10 * 60 * 1000;
const TIMEOUT_MS = 10_000;
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limite por IP em memória. Melhor esforço: em serverless cada instância tem
// o seu mapa, o que já basta para proteger a cota da API (30 req/min).
const enviosPorIp = new Map<string, number[]>();

function estourouLimite(ip: string, agora: number): boolean {
  for (const [chave, tempos] of enviosPorIp) {
    const validos = tempos.filter((t) => agora - t < JANELA_MS);
    if (validos.length === 0) enviosPorIp.delete(chave);
    else enviosPorIp.set(chave, validos);
  }
  const tempos = enviosPorIp.get(ip) ?? [];
  if (tempos.length >= LIMITE_ENVIOS) return true;
  enviosPorIp.set(ip, [...tempos, agora]);
  return false;
}

function ipDe(req: Request): string {
  const encaminhado = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return encaminhado || req.headers.get("x-real-ip") || "desconhecido";
}

// "thiago@gmail.com" -> "th***@gmail.com": o log nunca guarda o email inteiro.
function mascarar(email: string): string {
  const [usuario, dominio] = email.split("@");
  return `${usuario.slice(0, 2)}***@${dominio ?? ""}`;
}

function texto(valor: unknown, max: number): string | undefined {
  if (typeof valor !== "string") return undefined;
  const limpo = valor.trim().slice(0, max);
  return limpo || undefined;
}

// URL da página da inscrição, sem query string (nada de UTM ou email na
// origem gravada no Beehiiv).
function paginaDeOrigem(valor: unknown): string | undefined {
  if (typeof valor !== "string") return undefined;
  try {
    const url = new URL(valor);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return undefined;
  }
}

function resposta(ok: boolean, status: number) {
  return NextResponse.json({ ok }, { status });
}

export async function POST(req: Request) {
  let corpo: Record<string, unknown>;
  try {
    const lido: unknown = await req.json();
    if (!lido || typeof lido !== "object") return resposta(false, 400);
    corpo = lido as Record<string, unknown>;
  } catch {
    return resposta(false, 400);
  }

  // Honeypot: robô preencheu o campo escondido. Finge sucesso e não chama o
  // Beehiiv.
  if (typeof corpo.site === "string" && corpo.site.trim() !== "") {
    return resposta(true, 200);
  }

  if (corpo.consentimento !== true) return resposta(false, 400);

  const email = typeof corpo.email === "string" ? corpo.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL_VALIDO.test(email)) return resposta(false, 400);

  if (estourouLimite(ipDe(req), Date.now())) return resposta(false, 429);

  const chave = process.env.BEEHIIV_API_KEY;
  const publicacao = process.env.BEEHIIV_PUBLICATION_ID;
  if (!chave || !publicacao) {
    console.error("[clareia] BEEHIIV_API_KEY ou BEEHIIV_PUBLICATION_ID ausente");
    return resposta(false, 503);
  }

  const origem =
    corpo.origem && typeof corpo.origem === "object"
      ? (corpo.origem as Record<string, unknown>)
      : {};
  const utmCampaign = texto(origem.utm_campaign, 100);
  const referringSite = paginaDeOrigem(origem.referring_site);

  const inscricao = {
    email,
    // Dupla confirmação mesmo se a configuração da publicação mudar: é a
    // prova de consentimento (LGPD).
    double_opt_override: "on",
    send_welcome_email: true,
    // Quem saiu da lista não volta sozinho por um formulário.
    reactivate_existing: false,
    utm_source: texto(origem.utm_source, 100) ?? "site",
    utm_medium: texto(origem.utm_medium, 100) ?? "formulario",
    ...(utmCampaign && { utm_campaign: utmCampaign }),
    ...(referringSite && { referring_site: referringSite }),
  };

  try {
    const r = await fetch(
      `https://api.beehiiv.com/v2/publications/${encodeURIComponent(publicacao)}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${chave}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inscricao),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      },
    );
    if (r.ok) return resposta(true, 200);
    console.error(`[clareia] Beehiiv respondeu ${r.status} para ${mascarar(email)}`);
  } catch (erro) {
    const motivo = erro instanceof Error ? erro.name : "erro desconhecido";
    console.error(`[clareia] falha ao chamar o Beehiiv (${motivo}) para ${mascarar(email)}`);
  }
  return resposta(false, 502);
}
