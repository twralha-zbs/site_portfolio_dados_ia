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

const passos = [
  {
    titulo: "Mapear",
    descricao:
      "Onde está cada dado, quem o usa e por onde ele passa até virar relatório, antes de construir qualquer coisa.",
  },
  {
    titulo: "Propor",
    descricao:
      "O que melhorar e em que ordem, com o que dá mais retorno primeiro e o que pode esperar.",
  },
  {
    titulo: "Construir",
    descricao:
      "As ferramentas que organizam e automatizam a operação, entregues em partes, com algo funcionando cedo.",
  },
];

const camadas = [
  {
    titulo: "Python",
    descricao:
      "Pipeline que busca, trata e padroniza os dados na origem, para todos os números partirem da mesma base.",
  },
  {
    titulo: "Power BI",
    descricao:
      "Painéis com modelagem de dados e medidas consistentes, desenhados para a diretoria abrir e confiar.",
  },
  {
    titulo: "Power Automate",
    descricao:
      "Rotinas e alertas que rodam sozinhos e tiram o trabalho manual entre sistemas, planilhas e e-mail.",
  },
  {
    titulo: "IA aplicada",
    descricao:
      "Resumos e alertas em linguagem natural sobre os dados reais da empresa, quando isso ajuda a decidir.",
  },
];

const comecos = [
  {
    titulo: "Conversa de 30 minutos",
    descricao:
      "Você descreve a dor de hoje, e a TWR Tech aponta se e como dá para resolver. Sem custo.",
  },
  {
    titulo: "Diagnóstico de escopo fixo",
    descricao:
      "Um raio-x das fontes, dos indicadores e das prioridades, que costuma levar poucos dias e termina num plano.",
  },
  {
    titulo: "Projeto por escopo",
    descricao:
      "A proposta nasce do diagnóstico, com escopo escrito e valor dimensionado pelo problema.",
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

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <Rotulo>{"// o problema"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Você não tem falta de relatórios. Tem falta de relatórios{" "}
          <span className="text-acento">em que dá pra confiar.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          Os dados existem, espalhados entre ERP, planilhas e sistemas que não
          conversam. Cada área traz um número diferente, o fechamento do mês
          vira discussão sobre qual está certo, e a decisão espera.
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
      </section>

      <GrupoRecursos
        rotulo="// 01 · como trabalhamos"
        titulo={
          <>
            Primeiro o mapa,{" "}
            <span className="text-acento">depois a ferramenta.</span>
          </>
        }
        texto="Painel bonito sobre dado desencontrado só espalha a dúvida. O trabalho começa em entender como a informação circula e só então constrói."
        recursos={passos}
        visual={<VisualDados />}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <Rotulo>{"// 02 · o que pode ser construído"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Quatro camadas que{" "}
          <span className="text-acento">se combinam.</span>
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          Não são serviços isolados. O valor está em ligar as camadas na mesma
          operação, usando só o que o seu caso pede. As ferramentas são padrão
          de mercado, e a TWR Tech implanta, documenta e ensina a usar: a
          operação fica com a sua equipe, sem sistema proprietário que prenda a
          empresa a um fornecedor.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {camadas.map((camada, i) => (
            <li
              key={camada.titulo}
              className="rounded-2xl border border-linha bg-painel p-6"
            >
              <p className="font-mono text-sm font-bold text-apagado">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-2 text-xl font-extrabold tracking-tight">
                {camada.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {camada.descricao}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <Rotulo>{"// 03 · como começa"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Escopo aberto, definido pelo{" "}
          <span className="text-acento">seu problema.</span>
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          Não há tabela de preços: cada projeto é dimensionado pelo número de
          fontes, de áreas e de rotinas envolvidas. O valor vem depois da
          conversa ou do diagnóstico, por escrito.
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {comecos.map((passo, i) => (
            <li
              key={passo.titulo}
              className="rounded-2xl border border-linha bg-painel p-6"
            >
              <p className="font-mono text-sm font-bold text-apagado">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-2 text-xl font-extrabold tracking-tight">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {passo.descricao}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <Rotulo>{"// para quem é"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          PMEs com dados em ERP, planilhas e sistemas soltos.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verticais.map((vertical) => (
            <li
              key={vertical.titulo}
              className="rounded-2xl border border-linha bg-painel p-5"
            >
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                {vertical.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {vertical.descricao}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
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
              <p className="inline-block rounded-full border border-linha px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-apagado">
                Estudo de caso demonstrativo
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

      <section className="bg-azul-profundo text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="font-display max-w-[24ch] text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl">
            Atendimento organizado também{" "}
            <span className="text-acento">gera dados.</span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-sobre-azul-suave">
            Quem usa o{" "}
            <Link href="/nexiatend" className="font-bold text-sobre-azul hover:underline">
              NexIAtend
            </Link>{" "}
            passa a ter histórico, origem de cada cliente e funil de vendas. O
            DataConsult transforma esse material em painéis e indicadores, em
            projeto à parte.
          </p>
        </div>
      </section>

      <FaqSection titulo="Perguntas frequentes" itens={faqDataconsult} />

      <CTASection
        titulo="Qual número da sua empresa ninguém confia?"
        texto="Uma conversa de 30 minutos costuma bastar para saber se o DataConsult pode ajudar."
      />
    </>
  );
}
