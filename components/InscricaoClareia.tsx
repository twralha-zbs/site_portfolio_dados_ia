"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

type Props = {
  // Na página /clareia o título já é o h1: o bloco mostra só o formulário.
  semTitulo?: boolean;
};

const LOADER_BEEHIIV = "https://subscribe-forms.beehiiv.com/v3/loader.js";

// Inscrição na ClareIA, o mesmo componente em /clareia, no fim dos artigos, no
// /blog e na Home (um por página). Usa o formulário oficial do Beehiiv
// (embed), que já traz o campo de email, a caixa de consentimento com link
// para /privacidade e a dupla confirmação: o site não repete esse texto.
// A origem da inscrição (UTMs) vai pelo attribution.js do layout
// app/(site)/layout.tsx. Sem `site.clareiaFormId`, mostra "em breve".
export function InscricaoClareia({ semTitulo = false }: Props) {
  const pagina = usePathname();
  const formId = site.clareiaFormId;

  if (semTitulo && !formId) {
    // Na /clareia, com inscrições fechadas: só a frase, sem caixa em volta de
    // uma linha (a página já explica o que é a newsletter).
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

      {formId ? (
        <EmbedBeehiiv formId={formId} className={semTitulo ? "" : "mt-5"} />
      ) : (
        <p className="mt-5 text-suave">
          As inscrições abrem em breve.{" "}
          {pagina !== "/clareia" && (
            <Link href="/clareia" className="font-semibold text-acento hover:underline">
              Conheça a ClareIA
            </Link>
          )}
        </p>
      )}
    </div>
  );
}

// O loader do Beehiiv desenha o formulário no lugar onde o <script> está, por
// isso o script é criado aqui dentro do div (next/script não serve: ele
// injeta o script no fim do documento). O cleanup esvazia o div, o que tira o
// script e o formulário desenhado: cobre o efeito duplo do Strict Mode em dev
// e a navegação client-side entre páginas que usam o componente.
// A altura mínima reserva o espaço do formulário para a página não pular
// quando ele carregar.
function EmbedBeehiiv({ formId, className }: { formId: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo) return;
    const script = document.createElement("script");
    script.src = LOADER_BEEHIIV;
    script.async = true;
    script.dataset.beehiivForm = formId;
    alvo.appendChild(script);
    return () => {
      // destroy() do loader tira os ouvintes que ele pôs na window; o
      // innerHTML vazio garante a limpeza mesmo se o registro não existir.
      const registro = (window as { __bhv_embeds?: Record<string, { destroy?: () => void }> })
        .__bhv_embeds;
      registro?.[formId]?.destroy?.();
      alvo.innerHTML = "";
    };
  }, [formId]);

  // Altura medida em 2026-11-05 com o design do formulário no Beehiiv (com
  // título e subtítulo próprios): ~420px. Mudou o design lá, medir de novo.
  return <div ref={ref} className={`min-h-[380px] md:min-h-[420px] ${className}`} />;
}
