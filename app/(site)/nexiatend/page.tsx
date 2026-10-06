import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { faqNexiatend } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NexIAtend: atendimento no WhatsApp e no Instagram",
  description:
    "As conversas da sua empresa no WhatsApp e no Instagram num lugar só, implantadas pela TWR Tech. Diagnóstico gratuito; planos a partir de R$ 437/mês.",
  alternates: { canonical: "/nexiatend" },
};

// Números do eval de 2026-10-05 (6 negócios de Santo André: estética,
// imobiliária, escola de idiomas), sem nomes. Fonte interna:
// Produtos/NexIAtend/Docs/2026-10-05_eval-diagnostico.md na biblioteca.
const numeros = [
  { valor: "4 de 6", descricao: "publicavam mais de um número para o cliente chamar" },
  { valor: "3 de 6", descricao: "mostravam no Google um telefone fixo que não era o WhatsApp do site" },
  { valor: "4 de 6", descricao: "tinham links de WhatsApp que não diziam de onde o cliente veio" },
];

const hoje = [
  {
    titulo: "Cada um no seu celular",
    descricao:
      "A conversa fica no aparelho de quem atendeu. Quando a pessoa sai de férias ou da empresa, o histórico vai junto.",
  },
  {
    titulo: "WhatsApp Web dividido",
    descricao:
      "Várias pessoas no mesmo número, sem saber quem respondeu o quê, e a conexão cai no meio do expediente.",
  },
  {
    titulo: "Retorno de memória",
    descricao:
      "Mensagem nova empurra para baixo quem pediu preço ontem. O retorno depende de alguém lembrar.",
  },
];

const etapas = [
  {
    titulo: "Diagnóstico gratuito",
    descricao:
      "O caminho de um cliente até você no Google, no site e no Instagram, com um ajuste que você mesmo pode fazer.",
  },
  {
    titulo: "Demonstração",
    descricao:
      "A central funcionando com o caso do seu negócio. Se quiser, 14 dias de teste com a sua equipe.",
  },
  {
    titulo: "Implantação",
    descricao:
      "A TWR Tech conecta o canal, escreve a mensagem de boas-vindas com você e configura equipe e horário. Nada entra no ar sem a sua aprovação.",
  },
  {
    titulo: "Acompanhamento",
    descricao:
      "Treinamento da equipe, check-ins no primeiro mês, revisão de 30 dias e suporte pelo WhatsApp.",
  },
];

const planos = [
  {
    nome: "Atendimento",
    preco: "R$ 437",
    capacidade: "3 pessoas · 1 canal",
    resolve: "As conversas num lugar só.",
    inclui:
      "Central de atendimento, mensagem automática de boas-vindas e triagem, horário de atendimento, app no celular.",
    implantacao: "R$ 767",
  },
  {
    nome: "Vendas",
    preco: "R$ 717",
    capacidade: "5 pessoas · 2 canais",
    resolve: "Retorno para quem pediu preço.",
    inclui:
      "Tudo do Atendimento, com WhatsApp e Instagram juntos, mais funil de vendas, envio de campanhas, mensagens de retorno programadas e saber de onde veio cada cliente.",
    implantacao: "R$ 1.647",
  },
  {
    nome: "Equipe",
    preco: "R$ 1.207",
    capacidade: "10 pessoas · 3 canais",
    resolve: "O time cresce sem bagunça.",
    inclui:
      "Tudo do Vendas, mais conversas divididas automaticamente, cada cliente com o seu atendente, pesquisa de satisfação, áudio transcrito e ligação com outros sistemas.",
    implantacao: "R$ 2.197",
  },
  {
    nome: "IA",
    preco: "R$ 2.197",
    capacidade: "20 pessoas · 3 canais",
    resolve: "Um assistente para as perguntas repetidas.",
    inclui:
      "Tudo do Equipe, mais um assistente de IA configurado pela TWR Tech, que responde as perguntas frequentes e passa para uma pessoa quando precisa.",
    implantacao: "R$ 3.297",
  },
];

// Dados estruturados: Service + FAQPage. O FAQPage lê as mesmas strings de
// faqNexiatend que a FaqSection renderiza (Question.name/Answer.text idênticos).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "NexIAtend",
    serviceType: "Central de atendimento no WhatsApp e no Instagram, com implantação",
    description:
      "Central que reúne as conversas do WhatsApp e do Instagram da empresa num lugar só, implantada, configurada e treinada pela TWR Tech.",
    url: `${site.urlProducao}/nexiatend`,
    areaServed: { "@type": "Country", name: "Brasil" },
    provider: {
      "@type": "Organization",
      name: site.marca,
      url: site.urlProducao,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        minPrice: 437,
        priceCurrency: "BRL",
        unitText: "MONTH",
      },
      description:
        "Planos a partir de R$ 437 por mês; implantação a partir de R$ 767, pela metade no contrato de 12 meses.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqNexiatend.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  },
];

export default function Nexiatend() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-8 md:pt-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Atendimento no WhatsApp e no Instagram
        </p>
        <h1 className="font-display mt-5 max-w-[18ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          NexIAtend
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-apagado">
          by TWR Tech
        </p>
        <p className="mt-6 max-w-[52ch] text-lg text-suave">
          As conversas da sua empresa no WhatsApp e no Instagram num lugar só,
          com a equipe atendendo junto e você vendo tudo.
        </p>
        <p className="mt-3 max-w-[52ch] text-suave">
          A TWR Tech implanta, configura e treina; sua equipe atende. Começa
          por um diagnóstico gratuito, e os planos partem de R$ 437 por mês.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.links.whatsappDiagnostico}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110"
          >
            Pedir diagnóstico gratuito
          </a>
          <a
            href={site.links.agenda}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-linha px-6 py-3 font-semibold transition-colors hover:bg-painel"
          >
            Agendar uma conversa
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          O problema
        </p>
        <h2 className="font-display mt-5 max-w-[26ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          O cliente encontra vários números.{" "}
          <span className="text-acento">A conversa fica espalhada.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          Quando duas ou mais pessoas atendem pelo WhatsApp, cada conversa
          fica num lugar diferente. O dono não vê o todo, o histórico se perde
          e ninguém sabe dizer de onde veio o cliente que fechou.
        </p>
        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {hoje.map((item) => (
            <div key={item.titulo} className="border-t border-linha pt-5">
              <dt className="font-display text-xl font-extrabold tracking-tight">
                {item.titulo}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-suave">
                {item.descricao}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-sobre-azul-suave">
            O caminho de um cliente até a empresa
          </h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {numeros.map((item) => (
              <div key={item.descricao} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm leading-relaxed text-sobre-azul-suave">
                  {item.descricao}
                </dt>
                <dd className="font-mono text-4xl font-bold tracking-tight">
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs text-sobre-azul-suave">
            Fonte: diagnóstico feito pela TWR Tech em 6 negócios de Santo André
            (estética, imobiliária e escola de idiomas), outubro de 2026, só com
            dados públicos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Como funciona
        </p>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Quatro etapas, e você aprova antes de ir ao ar.
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((etapa, i) => (
            <li
              key={etapa.titulo}
              className="rounded-2xl border border-linha bg-painel p-5"
            >
              <p className="font-mono text-sm font-bold text-apagado">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-2 text-lg font-extrabold tracking-tight">
                {etapa.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {etapa.descricao}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-[58ch] text-sm text-apagado">
          A conexão é a oficial do WhatsApp, e o número e o aplicativo no
          celular podem continuar funcionando. O atendimento do dia a dia fica
          com a sua equipe: a TWR Tech implanta, treina e dá suporte, mas não
          opera a central.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Planos
        </p>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Cada plano resolve uma dor a mais.
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {planos.map((plano) => (
            <li
              key={plano.nome}
              className="flex flex-col rounded-2xl border border-linha bg-painel p-6"
            >
              <h3 className="font-display text-xl font-extrabold tracking-tight">
                {plano.nome}
              </h3>
              <p className="mt-1 min-h-[2.5rem] text-sm font-semibold text-suave">
                {plano.resolve}
              </p>
              <p className="font-mono mt-5 text-3xl font-bold">
                {plano.preco}
                <span className="text-base font-medium text-apagado">/mês</span>
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.09em] text-apagado">
                {plano.capacidade}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-suave">
                {plano.inclui}
              </p>
              <p className="mt-auto pt-5 text-sm text-apagado">
                Implantação: {plano.implantacao}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid max-w-[70ch] gap-3 text-sm text-apagado">
          <p>
            Contrato mensal sem fidelidade, com a implantação inteira, ou
            contrato de 12 meses com a implantação pela metade. Dá para mudar
            de plano quando a operação crescer.
          </p>
          <p>
            Adicionais: pessoa ou canal extra, assistente de IA nos planos
            Vendas e Equipe, cobrança no chat e visita presencial no ABC
            paulista. As mensagens que a Meta cobra são pagas pela empresa
            direto à Meta, e o uso do assistente de IA roda na conta de IA da
            própria empresa.
          </p>
        </div>
      </section>

      <section className="bg-azul-profundo text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="font-display max-w-[22ch] text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl">
            Organizado o atendimento,{" "}
            <span className="text-acento">os dados vêm depois.</span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-sobre-azul-suave">
            Com as conversas num lugar só, o atendimento passa a gerar
            histórico e números. A mesma TWR Tech que implanta o NexIAtend faz
            painéis de gestão, indicadores e automações sobre esses dados, como
            nos{" "}
            <Link href="/portfolio" className="font-bold text-sobre-azul hover:underline">
              estudos de caso do portfólio
            </Link>
            , em projeto à parte.
          </p>
        </div>
      </section>

      <FaqSection titulo="Perguntas frequentes" itens={faqNexiatend} />

      <CTASection
        titulo="Como um cliente chega até você hoje?"
        texto="O diagnóstico é gratuito: o caminho de um cliente no Google, no site e no Instagram, com o que mais pesa no seu caso e um ajuste que você mesmo pode fazer."
      />
    </>
  );
}
