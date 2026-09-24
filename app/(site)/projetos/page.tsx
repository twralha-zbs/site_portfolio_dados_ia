import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { projetosProprios } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos próprios da TWR Tech em produção, começando pelo ELAS JOGAM: automação e agentes de IA aplicados a um produto real, fora dos estudos de caso demonstrativos.",
};

export default function Projetos() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-8 md:pt-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Projetos
        </p>
        <h1 className="font-display mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          Projetos próprios
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-suave">
          Produtos que a TWR Tech constrói e opera para si mesma, aplicando a
          mesma metodologia de dados, automação e IA em produção real, fora
          dos estudos de caso demonstrativos.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <div className="flex flex-col gap-10">
          {projetosProprios.map((item, i) => (
            <article
              key={item.slug}
              className={i > 0 ? "border-t border-linha pt-10" : ""}
            >
              <p className="inline-block rounded-full border border-linha bg-painel px-4 py-1.5 text-xs font-medium uppercase tracking-[0.09em] text-suave">
                Projeto próprio · em desenvolvimento
              </p>
              <h3 className="font-display mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
                {item.titulo}
              </h3>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-suave">
                {item.contexto}
              </p>
              <p className="mt-6 inline-block rounded-full border border-linha px-5 py-2.5 text-sm font-semibold text-suave">
                Perfil ainda não no ar
              </p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        titulo="Quer aplicar essa metodologia ao seu negócio?"
        texto="A TWR Tech conta como o mesmo processo de dados e automação se aplica à sua operação."
      />
    </>
  );
}
