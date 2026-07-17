import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Estudos de caso de dados, automação e IA: a Distribuidora Serra Azul, atacadista fictícia com dados sintéticos, do diagnóstico ao dashboard com alertas e resumo por IA.",
};

// Versão provisória da Fase 3: evita 404 no link do nav. O grid definitivo de
// cases (MDX + rota /portfolio/serra-azul) é entregue na Fase 4.
export default function Portfolio() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Portfólio
        </p>
        <h1 className="font-display mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          Estudos de caso
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-suave">
          Casos completos, do diagnóstico ao resultado, com metodologia aberta.
          Por enquanto sem clientes públicos, o portfólio parte de um caso
          demonstrativo construído com o mesmo rigor de um projeto real.
        </p>

        <article className="mt-14 border-t border-linha pt-10">
          <p className="inline-block rounded-full border border-linha bg-painel px-4 py-1.5 text-xs font-medium uppercase tracking-[0.09em] text-suave">
            Estudo de caso demonstrativo · empresa fictícia, dados sintéticos
          </p>
          <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
            Distribuidora Serra Azul
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-suave">
            Atacadista de bebidas com 1.200 pontos de venda, 250 SKUs e R$ 4
            milhões por mês em faturamento simulado. O caso cobre as quatro
            camadas do meu trabalho: pipeline de dados em Python, dashboard Power
            BI de 4 páginas, alerta diário de ruptura via Power Automate e resumo
            executivo semanal gerado por IA.
          </p>
          <p className="mt-6 inline-block rounded-full border border-linha px-5 py-2.5 text-sm font-semibold text-suave">
            Case completo em breve nesta página
          </p>
        </article>
      </section>

      <CTASection
        titulo="Prefere conversar sobre o seu caso?"
        texto="Me conte a dor da sua operação e eu digo, sem rodeio, se consigo ajudar."
      />
    </>
  );
}
