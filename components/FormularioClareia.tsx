"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { lerOrigem } from "@/lib/origemClareia";

type Estado = "pronto" | "enviando" | "sucesso" | "erro";

const estiloCampo =
  "w-full min-w-0 rounded-full border border-linha bg-fundo px-5 py-3 text-texto placeholder:text-apagado focus:border-acento focus:outline-none sm:flex-1";

// Formulário de inscrição da ClareIA (dentro do cartão de InscricaoClareia).
// Posta para /api/clareia, que fala com a API do Beehiiv: a chave nunca chega
// ao navegador. A confirmação é pelo email do Beehiiv (dupla confirmação),
// que leva a pessoa para /clareia/obrigado.
export function FormularioClareia({ className = "" }: { className?: string }) {
  const pagina = usePathname();
  const id = useId();
  const caixaRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [avisoConsentimento, setAvisoConsentimento] = useState(false);
  const [estado, setEstado] = useState<Estado>("pronto");

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado === "enviando") return;
    // Sem consentimento, não envia: a caixa mostra o aviso e recebe o foco.
    if (!consentimento) {
      setAvisoConsentimento(true);
      caixaRef.current?.focus();
      return;
    }
    const dados = new FormData(evento.currentTarget);
    setEstado("enviando");
    try {
      const r = await fetch("/api/clareia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consentimento: true,
          origem: lerOrigem(),
          site: String(dados.get("site") ?? ""),
        }),
      });
      const corpo = (await r.json().catch(() => null)) as { ok?: boolean } | null;
      if (r.ok && corpo?.ok) {
        setEstado("sucesso");
        track("ClareIA Inscricao", { pagina });
      } else {
        setEstado("erro");
      }
    } catch {
      setEstado("erro");
    }
  }

  return (
    <div aria-live="polite" className={className}>
      {estado === "sucesso" ? (
        <div role="status">
          <p className="text-lg font-semibold text-texto">
            Quase lá! Abra seu email e clique no link para confirmar a inscrição.
          </p>
          <p className="mt-2 text-sm text-suave">
            Não chegou em 2 minutos? Veja em Promoções ou Spam.
          </p>
        </div>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-4">
          {estado === "erro" && (
            <p role="alert" className="text-sm font-semibold text-alerta">
              Não consegui fazer sua inscrição agora. Tente de novo em alguns minutos.
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor={`${id}-email`} className="sr-only">
              Seu e-mail
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={estiloCampo}
            />
            <button
              type="submit"
              disabled={estado === "enviando"}
              className="w-full shrink-0 rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {estado === "enviando" ? "Inscrevendo..." : "Inscrever-se"}
            </button>
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-suave">
              <input
                ref={caixaRef}
                type="checkbox"
                name="consentimento"
                checked={consentimento}
                onChange={(e) => {
                  setConsentimento(e.target.checked);
                  if (e.target.checked) setAvisoConsentimento(false);
                }}
                aria-required="true"
                aria-invalid={avisoConsentimento || undefined}
                aria-describedby={avisoConsentimento ? `${id}-aviso` : undefined}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-acento)] [color-scheme:dark]"
              />
              <span>
                Ao se inscrever, você concorda com a nossa{" "}
                <Link href="/privacidade" className="font-semibold text-acento hover:underline">
                  Política de Privacidade
                </Link>{" "}
                e aceita receber a ClareIA toda quinta no seu email.
              </span>
            </label>
            {avisoConsentimento && (
              <p id={`${id}-aviso`} className="mt-2 pl-8 text-sm font-semibold text-alerta">
                Marque a caixa para continuar.
              </p>
            )}
          </div>

          {/* Honeypot: invisível para pessoas; robôs costumam preencher. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={`${id}-site`}>Site</label>
            <input id={`${id}-site`} name="site" type="text" tabIndex={-1} autoComplete="off" />
          </div>
        </form>
      )}
    </div>
  );
}
