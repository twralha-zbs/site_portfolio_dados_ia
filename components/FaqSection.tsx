import type { ItemFaq } from "@/lib/faq";

type Props = {
  titulo?: string;
  itens: ItemFaq[];
};

// Acordeão de FAQ com <details>/<summary> nativo: acessível, sem JavaScript, e
// o texto da resposta fica no HTML renderizado mesmo fechado (requisito de AEO —
// bots leem a resposta). Reutilizado na Home e, na Fase 4, na página do case.
export function FaqSection({ titulo = "Perguntas frequentes", itens }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        {titulo}
      </h2>
      <div className="mt-8 border-t border-linha">
        {itens.map((item) => (
          <details
            key={item.pergunta}
            className="group border-b border-linha"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden">
              {item.pergunta}
              <span
                aria-hidden="true"
                className="shrink-0 text-acento transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[70ch] pb-6 leading-relaxed text-suave">
              {item.resposta}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
