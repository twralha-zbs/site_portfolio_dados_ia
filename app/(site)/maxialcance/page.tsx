import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { faqMaxialcance } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MaxIAlcance: presença no Google e nas IAs",
  description:
    "Seu negócio local encontrado no Google, no mapa e nas respostas de IAs como o ChatGPT. Avaliação gratuita; implantação a partir de R$ 3.000.",
  alternates: { canonical: "/maxialcance" },
};

// Números do eval de 2026-09-29 (6 negócios de Santo André), sem nomes. Fonte
// interna: Produtos/OptimumSites/Docs/2026-09-29_eval-rubrica.md na biblioteca.
const numeros = [
  { valor: "5 de 6", descricao: "estavam entre os 3 primeiros do mapa do Google" },
  { valor: "3 de 6", descricao: "não tinham site: o botão do perfil levava ao WhatsApp" },
  { valor: "4 de 6", descricao: "não publicavam nada novo havia mais de um ano" },
];

const lugares = [
  {
    titulo: "Google",
    descricao:
      "As páginas que aparecem quando alguém busca o serviço junto com o nome da cidade ou do bairro.",
  },
  {
    titulo: "Mapa",
    descricao:
      "O perfil no Google: categoria, telefone, horário, fotos e avaliações. É o que aparece primeiro no celular.",
  },
  {
    titulo: "IAs",
    descricao:
      "ChatGPT e Gemini respondem \"qual você recomenda?\" citando poucos nomes, montados a partir do perfil, das avaliações, das páginas e das menções em outros sites.",
  },
];

const etapas = [
  {
    titulo: "Avaliação gratuita",
    descricao:
      "Nota de 0 a 100 em 15 critérios, com a evidência de cada ponto, antes de qualquer proposta.",
  },
  {
    titulo: "Plano aprovado por você",
    descricao:
      "As buscas reais do seu setor na sua cidade, os concorrentes que aparecem na frente e as páginas a criar.",
  },
  {
    titulo: "Implantação",
    descricao:
      "Perfil no Google completo, páginas por serviço e região e site rápido no celular. Nada vai ao ar sem a sua aprovação.",
  },
  {
    titulo: "Acompanhamento mensal",
    descricao:
      "Reunião de pauta, artigos com as perguntas reais dos seus clientes, perfil ativo e um relatório simples.",
  },
];

const entregas = [
  {
    titulo: "Pesquisa de palavras-chave",
    descricao: "O que as pessoas digitam de verdade para achar o seu serviço na sua região.",
  },
  {
    titulo: "Engenharia reversa de concorrentes",
    descricao: "O que os negócios que aparecem na sua frente fazem, e onde deixam espaço.",
  },
  {
    titulo: "Perfil no Google completo",
    descricao: "Categoria certa, serviços, descrição, fotos e perguntas respondidas.",
  },
  {
    titulo: "Uma página por serviço e região",
    descricao: "Escrita para quem procura e para ser citada pelas IAs, com perguntas frequentes.",
  },
  {
    titulo: "Informações organizadas para o Google",
    descricao: "Nome, endereço, telefone e serviços marcados do jeito que buscadores e IAs leem.",
  },
  {
    titulo: "Site rápido no celular",
    descricao: "Site novo para quem não tem. Para quem já tem site em WordPress, ajustes no que existe.",
  },
];

const setores = [
  "Clínicas e consultórios",
  "Locação para eventos",
  "Escritórios de contabilidade",
  "Restaurantes, cafés e docerias",
];

// Dados estruturados: Service + FAQPage. O FAQPage lê as mesmas strings de
// faqMaxialcance que a FaqSection renderiza (Question.name/Answer.text idênticos).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MaxIAlcance",
    serviceType: "Otimização de presença para busca orgânica e por IA (SEO, AEO e GEO)",
    description:
      "Serviço que faz negócios locais serem encontrados no Google, no mapa e nas respostas de IAs como ChatGPT e Gemini.",
    url: `${site.urlProducao}/maxialcance`,
    areaServed: { "@type": "Country", name: "Brasil" },
    provider: {
      "@type": "Organization",
      name: site.marca,
      url: site.urlProducao,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 3000,
        priceCurrency: "BRL",
      },
      description: "Implantação a partir de R$ 3.000; acompanhamento mensal de R$ 300.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqMaxialcance.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  },
];

export default function Maxialcance() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-8 md:pt-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Presença no Google e nas IAs
        </p>
        <h1 className="font-display mt-5 max-w-[18ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          MaxIAlcance
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-apagado">
          by TWR Tech
        </p>
        <p className="mt-6 max-w-[52ch] text-lg text-suave">
          Quem procura o seu serviço na sua cidade encontra você: no Google,
          no mapa e nas respostas das IAs.
        </p>
        <p className="mt-3 max-w-[52ch] text-suave">
          Começa por uma avaliação gratuita da sua presença hoje. A TWR Tech
          acompanha cada etapa, do plano ao relatório de todo mês.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.links.whatsappAvaliacao}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110"
          >
            Pedir avaliação gratuita
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
          Seu negócio vive de indicação.{" "}
          <span className="text-acento">Quem não conhece você procura no Google.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          A indicação traz o melhor cliente, mas não escala e não tem ritmo.
          Quem ainda não conhece o negócio procura o serviço no Google, olha o
          mapa e, cada vez mais, pergunta a uma IA. Se o seu negócio não está
          nesses lugares, aparece um concorrente, um diretório ou uma lista de
          &quot;melhores&quot; no lugar.
        </p>
        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {lugares.map((lugar) => (
            <div key={lugar.titulo} className="border-t border-linha pt-5">
              <dt className="font-display text-xl font-extrabold tracking-tight">
                {lugar.titulo}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-suave">
                {lugar.descricao}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-sobre-azul-suave">
            Estar no mapa não basta
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
            Fonte: avaliação feita pela TWR Tech em 6 negócios de serviço de
            Santo André (psicologia, locação para eventos e contabilidade),
            setembro de 2026.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Como funciona
        </p>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Quatro etapas, e você aprova antes de publicar.
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
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          O que entregamos
        </p>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Tudo o que o Google e as IAs precisam ler.
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {entregas.map((entrega) => (
            <li key={entrega.titulo} className="border-t border-linha pt-5">
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                {entrega.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {entrega.descricao}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-12 max-w-[58ch] text-sm text-apagado">
          Para quem é: negócios locais de serviço que dependem de indicação,
          como {setores.join(", ").toLowerCase()}.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Investimento
        </p>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Preço de entrada claro, sem surpresa.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-azul-profundo p-6 text-sobre-azul">
            <p className="text-sm font-semibold text-sobre-azul-suave">Implantação</p>
            <p className="font-mono mt-2 text-3xl font-bold">a partir de R$ 3.000</p>
            <p className="mt-3 text-sm leading-relaxed text-sobre-azul-suave">
              O valor final depende do número de serviços, das regiões e de
              criar ou otimizar o site.
            </p>
          </div>
          <div className="rounded-2xl border border-linha bg-painel p-6">
            <p className="text-sm font-semibold text-suave">Acompanhamento</p>
            <p className="font-mono mt-2 text-3xl font-bold">R$ 300/mês</p>
            <p className="mt-3 text-sm leading-relaxed text-suave">
              Recomendado por 6 a 12 meses: o resultado de busca amadurece com
              o tempo.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-[58ch] text-sm text-apagado">
          O que a TWR Tech não promete: posição garantida no Google. Ninguém
          controla o Google, e quem garante está vendendo outra coisa.
        </p>
      </section>

      <FaqSection titulo="Perguntas frequentes" itens={faqMaxialcance} />

      <CTASection
        titulo="Como o seu negócio aparece hoje?"
        texto="A avaliação é gratuita: nota de 0 a 100 em 15 critérios, com o que mais pesa no seu caso. A TWR Tech responde em até 1 dia útil."
      />
    </>
  );
}
