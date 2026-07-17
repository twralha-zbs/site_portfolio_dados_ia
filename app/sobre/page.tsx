import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";
import fotoThiago from "@/public/thiago-ralha.jpg";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Thiago Waldowski Ralha: engenheiro pela Poli-USP, consultor de dados com Power BI, Power Platform, Python e IA aplicada a negócios. São Paulo, atendimento remoto.",
};

const projetosReais = [
  {
    nome: "Ferramenta de vistorias do CRQ-IV",
    descricao:
      "25 fiscais trocaram um PDF estático de 60 páginas por planejamento com busca geolocalizada e agenda digital: Power BI conectado ao banco institucional (20 mil empresas), aplicativo Power Apps embutido no relatório e painel gerencial de produtividade.",
    stack: "Power BI · Power Apps · DAX · SharePoint · APIs",
  },
  {
    nome: "Plataforma ZBS Educa",
    descricao:
      "Produto analítico para o setor educacional, da ideação à implantação: pipeline com mais de 30 mil simulados ENEM processados, resultados exibidos em Power BI e integração site, SharePoint e Power BI via Power Automate com webhooks.",
    stack: "Power BI · Power Automate · pipeline de dados",
  },
  {
    nome: "Painel de Microdados ENAMED 2025",
    descricao:
      "Gestores de instituições de ensino analisam o desempenho de alunos por área médica e o índice de discriminação de cada questão da prova.",
    stack: "Power BI · modelagem de microdados",
  },
  {
    nome: "People Analytics e BI de varejo",
    descricao:
      "Indicadores de turnover e absenteísmo para RH e painéis de vendas e estoque a partir do ERP LINX.",
    stack: "Power BI · ERP LINX",
  },
];

const gruposStack = [
  {
    grupo: "Análise de dados",
    itens: ["Power BI", "DAX", "Power Query (M)", "SQL", "Excel avançado e VBA"],
  },
  {
    grupo: "Automação",
    itens: [
      "Power Automate (Cloud e RPA)",
      "Power Apps",
      "Python",
      "APIs REST",
      "SharePoint",
    ],
  },
  {
    grupo: "IA aplicada",
    itens: ["Gemini API", "Claude Code", "automação de análises com IA generativa"],
  },
];

export default function Sobre() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-8 md:pt-24">
        <div className="grid items-start gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
              Sobre
            </p>
            <h1 className="font-display mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Engenheiro de formação, analista de dados por vocação.
            </h1>
            <div className="mt-8 flex max-w-[62ch] flex-col gap-5 text-lg leading-relaxed text-suave">
              <p>
                Sou o Thiago. Me formei engenheiro químico pela Escola Politécnica
                da USP e descobri, ainda na indústria, que o problema raramente é
                a falta de dados: é a distância entre os dados e quem decide.
                Desde 2018 trabalho exatamente nessa distância.
              </p>
              <p>
                No Conselho Regional de Química, onde entrei em primeiro lugar no
                concurso para fiscal, vi 25 colegas planejarem vistorias com um
                PDF de 60 páginas. Por iniciativa própria, construí a ferramenta
                que substituiu esse processo: Power BI conectado ao banco do
                conselho, aplicativo de agenda embutido no relatório e painel
                gerencial para os supervisores. Foi a prova, na prática, de que
                uma solução bem desenhada muda a rotina de uma operação inteira.
              </p>
              <p>
                Como sócio da ZBS Data Analytics, levei essa lógica a produto:
                estruturei a plataforma ZBS Educa do zero, com pipeline de mais
                de 30 mil simulados ENEM, dashboards públicos e automações de
                ponta a ponta. Hoje curso a Pós Tech em IA para Negócios na FIAP
                e aplico IA generativa ao trabalho analítico: resumos executivos,
                alertas e análises que chegam prontos para a decisão.
              </p>
              <p>
                Atendo de {site.localizacao.split(" · ")[0]}, remotamente, empresas
                de qualquer lugar do Brasil e do mundo.
              </p>
            </div>
          </div>

          <figure className="md:sticky md:top-8">
            <Image
              src={fotoThiago}
              alt="Retrato de Thiago Waldowski Ralha"
              className="w-full max-w-sm rounded-2xl border border-linha"
              sizes="(max-width: 768px) 100vw, 384px"
              priority
            />
            <figcaption className="mt-3 text-sm text-apagado">
              {site.nome} · consultor de dados, automação e IA
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-sobre-azul-suave">
            Projetos reais que sustentam o discurso
          </h2>
          {projetosReais.map((projeto, i) => (
            <article
              key={projeto.nome}
              className={`py-7 ${i > 0 ? "border-t border-azul-linha" : "mt-4"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  {projeto.nome}
                </h3>
                <p className="text-sm text-sobre-azul-suave">{projeto.stack}</p>
              </div>
              <p className="mt-2 max-w-[68ch] leading-relaxed text-sobre-azul-suave">
                {projeto.descricao}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Ferramentas de trabalho
            </h2>
            <div className="mt-7 flex flex-col gap-6">
              {gruposStack.map((grupo) => (
                <div key={grupo.grupo}>
                  <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
                    {grupo.grupo}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {grupo.itens.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-linha bg-painel px-4 py-1.5 text-sm text-suave"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Formação
            </h2>
            <ul className="mt-7">
              <li className="border-t border-linha py-5">
                <p className="font-bold">Engenharia Química</p>
                <p className="mt-1 text-sm text-suave">
                  Escola Politécnica da USP · concluída em 2017
                </p>
              </li>
              <li className="border-t border-b border-linha py-5">
                <p className="font-bold">Pós Tech em IA para Negócios</p>
                <p className="mt-1 text-sm text-suave">
                  FIAP · em andamento, conclusão prevista em 2027
                </p>
              </li>
            </ul>
            <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-apagado">
              Português nativo, inglês fluente. Trabalho no dia a dia com
              documentação técnica e ferramentas em inglês.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        titulo="Quer ver essa experiência aplicada ao seu negócio?"
        texto="Me conte sua dor de dados: a primeira conversa é de diagnóstico, sem compromisso."
      />
    </>
  );
}
