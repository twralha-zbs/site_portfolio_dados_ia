"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

type Props = {
  // Na página /clareia o título já é o h1: o bloco mostra só o formulário.
  semTitulo?: boolean;
};

const estiloCampo =
  "w-full rounded-lg border border-linha bg-fundo px-4 py-3 text-texto placeholder:text-apagado focus:border-acento focus:outline-none";

// Inscrição na ClareIA, o mesmo componente em /clareia, no fim dos artigos, no
// /blog vazio e na Home. Formulário próprio (e não o iframe do Beehiiv) para
// medir o envio: dispara "ClareIA Inscricao" no Vercel Analytics e abre a
// página de inscrição do Beehiiv com o email preenchido, onde a pessoa
// confirma. Sem a URL do Beehiiv em lib/site.ts, mostra "em breve".
// Consentimento explícito e link da política de privacidade (LGPD).
export function InscricaoClareia({ semTitulo = false }: Props) {
  const pagina = usePathname();
  const idEmail = useId();
  const [enviado, setEnviado] = useState(false);
  const urlInscricao = site.links.clareiaInscricao;

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!urlInscricao) return;
    const dados = new FormData(evento.currentTarget);
    const email = String(dados.get("email") ?? "").trim();
    track("ClareIA Inscricao", { pagina });
    const destino = new URL(urlInscricao);
    destino.searchParams.set("email", email);
    // Navegador que bloqueia a aba nova: segue na mesma aba, para a pessoa
    // nunca ficar sem destino.
    const aba = window.open(destino.toString(), "_blank", "noopener,noreferrer");
    if (!aba) {
      window.location.assign(destino.toString());
      return;
    }
    setEnviado(true);
  }

  // Na /clareia, com inscrições fechadas: só a frase, sem caixa em volta de
  // uma linha (a página já explica o que é a newsletter).
  if (semTitulo && !urlInscricao) {
    return (
      <p className="font-mono text-sm text-apagado">
        {"// as inscrições abrem em breve"}
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-linha bg-painel p-6 md:p-8">
      {!semTitulo && (
        <>
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
            ClareIA, a newsletter da TWR Tech
          </h2>
          <p className="mt-2 text-suave">Menos ruído, mais decisão. Toda quinta, por email.</p>
        </>
      )}

      {!urlInscricao ? (
        <p className={semTitulo ? "text-suave" : "mt-5 text-suave"}>
          As inscrições abrem em breve.{" "}
          {pagina !== "/clareia" && (
            <Link href="/clareia" className="font-semibold text-acento hover:underline">
              Conheça a ClareIA
            </Link>
          )}
        </p>
      ) : enviado ? (
        <p role="status" className={semTitulo ? "text-texto" : "mt-5 text-texto"}>
          Falta um passo: confirme a inscrição na página da ClareIA que abriu
          em outra aba.
        </p>
      ) : (
        <form onSubmit={enviar} className={semTitulo ? "flex flex-col gap-4" : "mt-5 flex flex-col gap-4"}>
          <div>
            <label htmlFor={idEmail} className="mb-1.5 block text-sm font-semibold">
              Seu email
            </label>
            <input
              id={idEmail}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@empresa.com.br"
              className={estiloCampo}
            />
          </div>
          <label className="flex items-start gap-3 text-sm text-suave">
            <input
              type="checkbox"
              name="consentimento"
              required
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-acento)]"
            />
            <span>
              Quero receber a ClareIA por email e li a{" "}
              <Link href="/privacidade" className="font-semibold text-acento hover:underline">
                política de privacidade
              </Link>
              . Dá para sair a qualquer momento.
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="submit"
              className="rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110"
            >
              Quero receber a ClareIA
            </button>
            <span className="text-xs text-apagado">
              Abre a página da ClareIA em outra aba para você confirmar.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
