// Origem da inscrição na ClareIA (só no navegador). Os UTMs da primeira
// página da visita ficam no sessionStorage, para não se perderem quando a
// pessoa chega por /nexiatend?utm_source=... e só depois vai se inscrever.

const CHAVE = "clareia_utm";
const CAMPOS = ["utm_source", "utm_medium", "utm_campaign"] as const;

type Utm = Partial<Record<(typeof CAMPOS)[number], string>>;

export type OrigemClareia = Utm & { referring_site: string };

function utmDaUrl(): Utm {
  const params = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  for (const campo of CAMPOS) {
    const valor = params.get(campo);
    if (valor) utm[campo] = valor;
  }
  return utm;
}

// Chamado em toda página do site (components/CapturaUtm.tsx): grava só se a
// visita ainda não tiver UTM guardado.
export function guardarUtm() {
  const utm = utmDaUrl();
  if (Object.keys(utm).length === 0) return;
  try {
    if (window.sessionStorage.getItem(CHAVE)) return;
    window.sessionStorage.setItem(CHAVE, JSON.stringify(utm));
  } catch {
    // sessionStorage bloqueado (aba privada, cookies desligados): segue sem.
  }
}

// UTMs da URL atual, senão os guardados na visita, mais a página atual sem
// query string. Sem UTM nenhum, a rota usa site / formulario.
export function lerOrigem(): OrigemClareia {
  let utm = utmDaUrl();
  if (Object.keys(utm).length === 0) {
    try {
      const guardado = window.sessionStorage.getItem(CHAVE);
      if (guardado) utm = JSON.parse(guardado) as Utm;
    } catch {
      utm = {};
    }
  }
  return {
    ...utm,
    referring_site: `${window.location.origin}${window.location.pathname}`,
  };
}
