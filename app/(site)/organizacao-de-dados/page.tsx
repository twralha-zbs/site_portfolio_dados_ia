import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { GrupoRecursos } from "@/components/GrupoRecursos";
import { VisualDados } from "@/components/VisuaisProduto";
import { Hero } from "@/components/ui/hero";
import { Rotulo } from "@/components/ui/rotulo";
import { casesDemonstrativos } from "@/lib/cases";
import { faqDataconsult } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "DataConsult: organização de dados e processos",
  description:
    "A TWR Tech mapeia as fontes e os processos da sua empresa, propõe melhorias e constrói painéis e automações em que dá pra confiar. Escopo por projeto.",
  alternates: { canonical: "/organizacao-de-dados" },
};

const sintomas = [
  {
    titulo: "Cada área traz um número diferente",
    descricao:
      "Vendas, financeiro e operação calculam o mesmo indicador de jeitos diferentes, e ninguém sabe qual vale.",
  },
  {
    titulo: "O fechamento vira discussão",
    descricao:
      "Em vez de decidir, a reunião do mês gasta o tempo conferindo qual planilha está certa.",
  },
  {
    titulo: "Planilha que só uma pessoa entende",
    descricao:
      "A lógica mora na cabeça de quem montou, e a empresa para quando essa pessoa sai.",
  },
  {
    titulo: "Rotina manual entre sistemas",
    descricao:
      "Copiar do ERP para a planilha e da planilha para o e-mail, toda semana, na mão.",
  },
];

// Uma linha do tempo só: da primeira conversa ao projeto.
const etapas = [
  {
    titulo: "Conversa de 30 minutos",
    descricao:
      "Você descreve a dor de hoje, e a TWR Tech aponta se e como dá para resolver. Sem custo.",
  },
  {
    titulo: "Diagnóstico de escopo fixo",
    descricao:
      "Mapeia onde está cada dado, quem o usa e por onde passa até virar relatório, e propõe o que melhorar e em que ordem. Costuma levar poucos dias e termina num plano.",
  },
  {
    titulo: "Projeto por escopo",
    descricao:
      "Constrói as ferramentas que organizam e automatizam a operação, entregues em partes, com algo funcionando cedo.",
  },
];

// Resultado primeiro; a ferramenta aparece como etiqueta.
const camadas = [
  {
    titulo: "Todos os números partem da mesma base",
    ferramenta: "Python",
    descricao:
      "Os dados são buscados, limpos e padronizados na origem, para ERP, planilhas e sistemas deixarem de discordar.",
  },
  {
    titulo: "Painéis que a diretoria abre e confia",
    ferramenta: "Power BI",
    descricao:
      "Cada indicador é calculado uma vez, do mesmo jeito, e desenhado para leitura rápida de quem decide.",
  },
  {
    titulo: "Rotinas e alertas que rodam sozinhos",
    ferramenta: "Power Automate",
    descricao:
      "O trabalho manual entre sistemas, planilhas e e-mail vira rotina automática, com aviso quando algo foge do normal.",
  },
  {
    titulo: "Resumos que já chegam prontos",
    ferramenta: "IA aplicada",
    descricao:
      "Análises em linguagem natural sobre os dados reais da empresa, quando isso ajuda a decidir.",
  },
];

const condicoes = [
  "O valor depende do número de fontes, de áreas e de rotinas envolvidas.",
  "Chega por escrito, depois da conversa ou do diagnóstico.",
  "Nada é cobrado pela conversa inicial.",
];

// Dados estruturados: Service + FAQPage. Sem `offers`: o valor é sob consulta,
// por projeto. O FAQPage lê as mesmas strings de faqDataconsult que a
// FaqSection renderiza (Question.name/Answer.text idênticos).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DataConsult",
    serviceType:
      "Consultoria de organização de dados e processos (Power BI, Power Automate, Python e IA aplicada)",
    description:
      "Consultoria que mapeia as fontes, os processos e os fluxos de dados de uma empresa, propõe melhorias e constrói painéis e automações que organizam a operação.",
    url: `${site.urlProducao}/organizacao-de-dados`,
    areaServed: { "@type": "Country", name: "Brasil" },
    provider: {
      "@type": "Organization",
      name: site.marca,
      url: site.urlProducao,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqDataconsult.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  },
];

export default function OrganizacaoDeDados() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        eyebrow="Organização de dados e processos"
        marca="DataConsult"
        selo="by TWR Tech"
        titulo={
          <>
            Dados dispersos viram{" "}
            <span className="text-acento">decisão confiável.</span>
          </>
        }
        subtitulo="A TWR Tech mapeia as fontes e os processos da sua empresa, propõe o que melhorar e constrói as ferramentas que organizam e automatizam a operação."
        ctas={{
          primario: {
            rotulo: "Agendar conversa de 30 minutos",
            href: site.links.agenda,
            externo: true,
          },
          secundario: { rotulo: "Ver estudos de caso", href: "/portfolio" },
        }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-20 md:px-8 md:pb-16 md:pt-28">
        <Rotulo>{"// o problema"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Você não tem falta de relatórios. Tem falta de relatórios{" "}
          <span className="text-acento">em que dá pra confiar.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          Os dados existem, espalhados entre ERP, planilhas e sistemas que não
          conversam, e a decisão espera enquanto alguém confere qual número
          está certo.
        </p>
        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {sintomas.map((item) => (
            <div key={item.titulo} className="border-t border-linha pt-5">
              <dt className="font-display text-lg font-extrabold tracking-tight">
                {item.titulo}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-suave">
                {item.descricao}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-[58ch] text-sm text-apagado">
          Para PMEs de atacado e distribuição, varejo, indústria e serviços,
          com dados em ERP, planilhas e sistemas soltos.
        </p>
      </section>

      <GrupoRecursos
        className="py-12 md:py-16"
        rotulo="// como trabalhamos"
        titulo={
          <>
            Primeiro o mapa,{" "}
            <span className="text-acento">depois a ferramenta.</span>
          </>
        }
        texto="Painel bonito sobre dado desencontrado só espalha a dúvida. Por isso o trabalho começa em entender como a informação circula, e só depois constrói."
        recursos={etapas}
        visual={<VisualDados />}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <Rotulo>{"// o que pode ser construído"}</Rotulo>
            <h2 className="font-display mt-4 max-w-[16ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
              Quatro camadas que se combinam.
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg text-suave">
              Não são serviços isolados: o valor está em ligá-las na mesma
              operação, usando só o que o seu caso pede. As ferramentas são
              padrão de mercado, e a TWR Tech implanta, documenta e ensina a
              usar. A operação fica com a sua equipe, sem sistema proprietário
              que prenda a empresa a um fornecedor.
            </p>
          </div>
          <dl className="divide-y divide-linha border-y border-linha">
            {camadas.map((camada) => (
              <div
                key={camada.titulo}
                className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[1fr_auto]"
              >
                <dt className="font-display text-xl font-extrabold tracking-tight">
                  {camada.titulo}
                </dt>
                <dd className="font-mono text-xs text-apagado md:pt-1.5">
                  {camada.ferramenta}
                </dd>
                <dd className="text-sm leading-relaxed text-suave md:col-span-2">
                  {camada.descricao}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-xs text-sobre-azul-suave md:text-sm">
              {"// investimento"}
            </p>
            <h2 className="font-display mt-4 max-w-[18ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
              Escopo aberto, definido pelo seu problema.
            </h2>
            <p className="mt-5 max-w-[48ch] text-sobre-azul-suave">
              Não há tabela de preços, porque cada projeto é dimensionado pelo
              que existe na sua empresa hoje.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={site.links.agenda}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-sobre-azul px-6 py-3 font-bold text-azul-profundo transition-[filter] hover:brightness-95"
              >
                Agendar conversa de 30 minutos
              </a>
              <Link
                href="/contato"
                className="rounded-full border border-azul-linha px-6 py-3 font-semibold text-sobre-azul transition-colors hover:bg-azul-profundo"
              >
                Enviar mensagem
              </Link>
            </div>
          </div>
          <ul className="space-y-4 self-center">
            {condicoes.map((condicao) => (
              <li
                key={condicao}
                className="rounded-2xl border border-azul-linha bg-azul-profundo px-6 py-5 text-sobre-azul"
              >
                {condicao}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32">
        <Rotulo>{"// prova de método"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Três casos, do diagnóstico ao dashboard.
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          Estudos de caso demonstrativos, com empresas fictícias e dados
          sintéticos, construídos com o mesmo rigor de um projeto real. São
          exemplos de método, não referências de clientes.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {casesDemonstrativos.map((item) => (
            <li
              key={item.slug}
              className="rounded-2xl border border-linha bg-painel p-6"
            >
              <h3 className="font-display text-xl font-extrabold tracking-tight">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {item.resumo}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <Link
            href="/portfolio"
            className="py-1 text-lg font-bold text-acento hover:underline"
          >
            Ver o portfólio completo →
          </Link>
          <p className="max-w-[52ch] text-sm text-apagado">
            Já usa o{" "}
            <Link href="/nexiatend" className="font-semibold text-suave hover:underline">
              NexIAtend
            </Link>
            ? O histórico e o funil do atendimento também viram painéis, em
            projeto à parte.
          </p>
        </div>
      </section>

      <FaqSection titulo="Perguntas frequentes" itens={faqDataconsult} />

      <CTASection
        titulo="Em qual número da sua empresa ninguém confia?"
        texto="Uma conversa de 30 minutos costuma bastar para saber se o DataConsult pode ajudar."
      />
    </>
  );
}
