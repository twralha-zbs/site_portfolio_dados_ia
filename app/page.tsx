import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { SubstackFeed } from "@/components/SubstackFeed";
import { ProcessoTrabalho } from "@/components/ProcessoTrabalho";
import { FaqSection } from "@/components/FaqSection";
import { faqHome } from "@/lib/faq";
import { site } from "@/lib/site";
import fotoThiago from "@/public/thiago-ralha.jpg";

const ofertas = [
  {
    titulo: "Diagnóstico de Dados & BI",
    formato: "Oferta de entrada · escopo fixo · valor sob consulta",
    descricao:
      "Um raio-x das suas fontes, indicadores e prioridades, com um plano do que construir primeiro. Poucos dias, e você já sai sabendo o caminho.",
    ctaRotulo: "Agendar diagnóstico",
    href: site.links.agenda,
    externo: true,
  },
  {
    titulo: "Construção de dashboards & relatórios",
    formato: "Por projeto · valor sob consulta",
    descricao:
      "Do dado disperso a um painel Power BI que a diretoria abre e confia: modelagem de dados, DAX e design pensado para leitura executiva.",
    ctaRotulo: "Conversar sobre um projeto",
    href: "/contato",
    externo: false,
  },
  {
    titulo: "Automação de fluxos",
    formato: "Por projeto · valor sob consulta",
    descricao:
      "Power Automate e Python eliminando o trabalho repetitivo entre sistemas, planilhas e e-mail. Rotinas e alertas que rodam sozinhos.",
    ctaRotulo: "Conversar sobre um projeto",
    href: "/contato",
    externo: false,
  },
  {
    titulo: "IA aplicada a negócios",
    formato: "Por projeto · valor sob consulta",
    descricao:
      "Resumos executivos, alertas e análises em linguagem natural, gerados em cima dos seus dados reais e prontos para a decisão.",
    ctaRotulo: "Conversar sobre um projeto",
    href: "/contato",
    externo: false,
  },
];

const verticais = [
  {
    titulo: "Atacado & distribuição",
    descricao:
      "Vendas, margem e estoque num só lugar, em vez de cinco planilhas que não batem.",
  },
  {
    titulo: "Varejo",
    descricao:
      "Giro, ruptura e desempenho de loja com números em que dá pra confiar.",
  },
  {
    titulo: "Indústria",
    descricao: "Produção, custo e estoque puxados direto do ERP.",
  },
  {
    titulo: "Serviços",
    descricao:
      "Faturamento, produtividade e projetos num painel único e confiável.",
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

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          O problema
        </p>
        <h2 className="font-display mt-5 max-w-[20ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Você não tem falta de relatórios. Tem falta de relatórios{" "}
          <span className="text-acento">em que dá pra confiar.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          Os dados existem, espalhados entre ERP, planilhas e sistemas que não
          conversam. Cada área traz um número diferente, o fechamento do mês vira
          discussão sobre qual está certo, e a decisão espera.
        </p>

        <h3 className="mt-14 text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Para quem é
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verticais.map((vertical) => (
            <li
              key={vertical.titulo}
              className="rounded-2xl border border-linha bg-painel p-5"
            >
              <h4 className="font-display text-lg font-extrabold tracking-tight">
                {vertical.titulo}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {vertical.descricao}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-20">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-sobre-azul-suave">
            Como eu posso ajudar
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ofertas.map((oferta) => (
              <div
                key={oferta.titulo}
                className="flex flex-col rounded-2xl border border-azul-linha p-6"
              >
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  {oferta.titulo}
                </h3>
                <p className="mt-1 text-sm font-medium text-sobre-azul-suave">
                  {oferta.formato}
                </p>
                <p className="mt-4 max-w-[52ch] flex-1 text-sobre-azul-suave">
                  {oferta.descricao}
                </p>
                {oferta.externo ? (
                  <a
                    href={oferta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block font-bold text-sobre-azul hover:underline"
                  >
                    {oferta.ctaRotulo} {"→"}
                  </a>
                ) : (
                  <Link
                    href={oferta.href}
                    className="mt-6 inline-block font-bold text-sobre-azul hover:underline"
                  >
                    {oferta.ctaRotulo} {"→"}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessoTrabalho />

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

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8 md:pb-24">
        <figure className="grid items-center gap-8 rounded-3xl border border-linha bg-painel p-8 md:grid-cols-[auto_1fr] md:gap-12 md:p-12">
          <Image
            src={fotoThiago}
            alt="Retrato de Thiago Waldowski Ralha"
            className="h-28 w-28 rounded-full border border-linha object-cover md:h-36 md:w-36"
            sizes="144px"
          />
          <div>
            <blockquote className="font-display text-2xl font-extrabold leading-[1.25] tracking-tight md:text-3xl">
              Minha missão é tornar seu negócio mais eficiente com{" "}
              <span className="text-acento">
                IA, análise de dados e automação de processos.
              </span>
            </blockquote>
            <figcaption className="mt-5 text-sm text-apagado">
              {site.nome} · consultor de dados, automação e IA
            </figcaption>
          </div>
        </figure>
      </section>

      <FaqSection itens={faqHome} />

      <SubstackFeed />

      <CTASection
        titulo="Sua operação tem uma dor parecida?"
        texto="Uma conversa de 30 minutos costuma bastar para saber se posso ajudar."
      />
    </>
  );
}
