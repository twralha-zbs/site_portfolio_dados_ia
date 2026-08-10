import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { SubstackFeed } from "@/components/SubstackFeed";
import { ProcessoTrabalho } from "@/components/ProcessoTrabalho";
import { FaqSection } from "@/components/FaqSection";
import { faqHome } from "@/lib/faq";
import { site } from "@/lib/site";
import { ofertaEntrada, ofertas } from "@/lib/servicos";
import { casesDemonstrativos, projetosProprios } from "@/lib/cases";
import fotoThiago from "@/public/thiago-ralha.jpg";

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

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:px-8 md:pb-24 md:pt-28">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          {site.nome} · São Paulo
        </p>
        <h1 className="font-display mt-6 max-w-[14ch] text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
          De dados dispersos a <span className="text-acento">decisões claras.</span>
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
            <div className="flex flex-col rounded-2xl border border-azul-linha bg-azul-profundo p-6 md:col-span-2 md:flex-row md:items-center md:justify-between md:gap-8">
              <div>
                <p className="inline-block rounded-full bg-sobre-azul px-3 py-1 text-xs font-bold uppercase tracking-[0.09em] text-azul-profundo">
                  Porta de entrada
                </p>
                <h3 className="font-display mt-4 text-2xl font-extrabold tracking-tight">
                  {ofertaEntrada.titulo}
                </h3>
                <p className="mt-1 text-sm font-medium text-sobre-azul-suave">
                  {ofertaEntrada.formato}
                </p>
                <p className="mt-4 max-w-[56ch] text-sobre-azul-suave">
                  {ofertaEntrada.descricao}
                </p>
              </div>
              <Link
                href={ofertaEntrada.href}
                className="mt-6 inline-block shrink-0 rounded-full bg-sobre-azul px-6 py-3 font-bold text-azul-profundo transition-[filter] hover:brightness-95 md:mt-0"
              >
                {ofertaEntrada.ctaRotulo} {"→"}
              </Link>
            </div>
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
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Portfólio
        </p>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Quatro casos, do diagnóstico ao dashboard.
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          Estudos de caso demonstrativos com dados sintéticos e um projeto
          próprio em produção — a mesma metodologia aplicada a operações
          diferentes.
        </p>

        <ul className="mt-11 grid gap-4 border-t border-linha pt-10 sm:grid-cols-2">
          {[...casesDemonstrativos, ...projetosProprios].map((item) => (
            <li
              key={item.slug}
              className="rounded-2xl border border-linha bg-painel p-6"
            >
              <p className="inline-block rounded-full border border-linha px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-apagado">
                {item.selo === "demonstrativo"
                  ? "Estudo de caso demonstrativo"
                  : "Projeto próprio"}
              </p>
              <h3 className="font-display mt-4 text-xl font-extrabold tracking-tight">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {item.resumo}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/portfolio"
          className="mt-8 inline-block text-lg font-bold text-acento hover:underline"
        >
          Ver o portfólio completo →
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
