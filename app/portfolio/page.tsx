import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { casesDemonstrativos, projetosProprios } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Estudos de caso de dados, automação e IA — Distribuidora Serra Azul, rede de colégios e força de vendas, com dados sintéticos — e o projeto próprio ELAS JOGAM.",
};

export default function Portfolio() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-8 md:pt-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Portfólio
        </p>
        <h1 className="font-display mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          Estudos de caso
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-suave">
          Casos completos, do diagnóstico ao resultado, com metodologia
          aberta. Por enquanto sem clientes públicos, o portfólio parte de
          casos demonstrativos construídos com o mesmo rigor de um projeto
          real, ao lado de um projeto próprio em produção.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Estudos de caso demonstrativos
        </h2>
        <div className="mt-8 flex flex-col gap-10">
          {casesDemonstrativos.map((item, i) => (
            <article
              key={item.slug}
              className={i > 0 ? "border-t border-linha pt-10" : ""}
            >
              <p className="inline-block rounded-full border border-linha bg-painel px-4 py-1.5 text-xs font-medium uppercase tracking-[0.09em] text-suave">
                Estudo de caso demonstrativo · empresa fictícia, dados
                sintéticos
              </p>
              <h3 className="font-display mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
                {item.titulo}
              </h3>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-suave">
                {item.contexto}
              </p>
              <p className="mt-6 inline-block rounded-full border border-linha px-5 py-2.5 text-sm font-semibold text-suave">
                Case completo em breve nesta página
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-linha pt-10">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
            Projeto próprio
          </h2>
          <div className="mt-8 flex flex-col gap-10">
            {projetosProprios.map((item) => (
              <article key={item.slug}>
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
        </div>
      </section>

      <CTASection
        titulo="Prefere conversar sobre o seu caso?"
        texto="Me conte a dor da sua operação e eu digo, sem rodeio, se consigo ajudar."
      />
    </>
  );
}
