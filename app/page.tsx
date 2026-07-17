import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { SubstackFeed } from "@/components/SubstackFeed";
import { site } from "@/lib/site";

const servicos = [
  {
    numero: "1",
    titulo: "Dashboards Power BI",
    descricao:
      "Indicadores confiáveis, atualizados sem esforço manual. Modelagem de dados, DAX e design pensado para leitura executiva.",
  },
  {
    numero: "2",
    titulo: "Automação de fluxos",
    descricao:
      "Power Automate e Python eliminando o trabalho repetitivo entre sistemas, planilhas e e-mail.",
  },
  {
    numero: "3",
    titulo: "IA aplicada a negócios",
    descricao:
      "Resumos executivos, alertas e análises em linguagem natural, gerados em cima dos seus dados reais.",
  },
];

const resultadosCase = [
  {
    antes: "3 dias",
    depois: "virou 20 min",
    indicador: "relatório gerencial mensal",
  },
  {
    antes: "8,4%",
    depois: "caiu a 2,1%",
    indicador: "ruptura nos top-50 SKUs",
  },
  {
    antes: "",
    depois: "87 clientes",
    indicador: "em risco de churn, mapeados e priorizados",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:px-8 md:pb-24 md:pt-28">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          {site.nome} · São Paulo
        </p>
        <h1 className="font-display mt-6 max-w-[12ch] text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
          Dados dispersos, <span className="text-acento">decisões claras.</span>
        </h1>
        <p className="mt-8 max-w-[48ch] text-lg text-suave">{site.subheadline}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110"
          >
            Ver estudos de caso
          </Link>
          <Link
            href="/contato"
            className="rounded-full border border-linha px-6 py-3 font-semibold transition-colors hover:bg-painel"
          >
            Fale comigo
          </Link>
        </div>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-20">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-sobre-azul-suave">
            O que eu faço
          </h2>
          {servicos.map((servico, i) => (
            <div
              key={servico.numero}
              className={`grid grid-cols-[3.5rem_1fr] items-baseline gap-6 py-8 md:grid-cols-[7rem_1fr] md:gap-8 ${
                i > 0 ? "border-t border-azul-linha" : "mt-4"
              }`}
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-extrabold leading-none text-sobre-azul-suave"
              >
                {servico.numero}
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  {servico.titulo}
                </h3>
                <p className="mt-2 max-w-[58ch] text-sobre-azul-suave">
                  {servico.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
        <p className="inline-block rounded-full border border-linha bg-painel px-4 py-1.5 text-xs font-medium uppercase tracking-[0.09em] text-suave">
          Estudo de caso demonstrativo · empresa fictícia, dados sintéticos
        </p>
        <h2 className="font-display mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          Distribuidora Serra Azul
        </h2>
        <p className="mt-5 max-w-[54ch] text-lg text-suave">
          Atacadista de bebidas com 1.200 pontos de venda: da reposição no feeling
          a um cockpit de decisão em Power BI, com alerta diário de ruptura e
          resumo executivo gerado por IA.
        </p>

        <dl className="mt-11 grid border-t border-linha md:grid-cols-3">
          {resultadosCase.map((resultado, i) => (
            <div
              key={resultado.indicador}
              className={`pt-6 ${
                i > 0
                  ? "mt-6 border-t border-linha md:mt-0 md:border-t-0 md:border-l md:pl-6"
                  : ""
              } md:pr-6`}
            >
              <dd className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                {resultado.antes && <span>{resultado.antes} </span>}
                <span className="text-acento">{resultado.depois}</span>
              </dd>
              <dt className="mt-2 text-sm text-apagado">{resultado.indicador}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-xs text-apagado">
          Resultados projetados em simulação; metodologia aberta no case.
        </p>
        <Link
          href="/portfolio"
          className="mt-8 inline-block text-lg font-bold text-acento hover:underline"
        >
          Ler o estudo de caso completo →
        </Link>
      </section>

      <SubstackFeed />

      <CTASection
        titulo="Sua operação tem uma dor parecida?"
        texto="Uma conversa de 30 minutos costuma bastar para saber se posso ajudar."
      />
    </>
  );
}
