import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { faqWhatsapp } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ConectaCentral — Atendimento, CRM e IA no WhatsApp",
  description:
    "ConectaCentral é a plataforma de atendimento, CRM e IA no WhatsApp que organiza sua operação: central de atendimento, funil de vendas, automação e agentes de IA num único ambiente.",
};

const numeros = [
  { valor: "97%", descricao: "dos usuários abrem o WhatsApp diariamente" },
  {
    valor: "82%",
    descricao: "dos consumidores se comunicam com marcas pelo WhatsApp",
  },
  { valor: "75%", descricao: "já compraram algo através do WhatsApp" },
  {
    valor: "67%",
    descricao:
      "das empresas de varejo/serviços usam o WhatsApp como principal canal de vendas",
  },
];

const modulos = [
  {
    titulo: "Central de Atendimento",
    descricao:
      "Toda a equipe conversa pelo mesmo número de WhatsApp/Instagram, com histórico centralizado e distribuição de conversas — fim do WhatsApp do celular pessoal.",
  },
  {
    titulo: "CRM completo",
    descricao:
      "Funil de vendas em kanban, cadastro de contatos, campos personalizados e tarefas vinculadas a cada cliente: a jornada nunca se perde.",
  },
  {
    titulo: "Chatbot e automação",
    descricao:
      "Fluxos automatizados qualificam leads, respondem perguntas frequentes e atendem fora do horário comercial, sem aumentar a equipe.",
  },
  {
    titulo: "Disparo de mensagens",
    descricao:
      "Campanhas e promoções para listas segmentadas de contatos, direto pela plataforma, sem depender de anúncios pagos.",
  },
  {
    titulo: "Rastreabilidade de conversões",
    descricao:
      "Cada lead rastreado até a campanha, anúncio ou canal de origem — o retorno de cada ação de marketing fica visível, não é achismo.",
  },
  {
    titulo: "Agentes de IA",
    descricao:
      "Atendimento automatizado por IA que conversa, responde dúvidas e qualifica leads em linguagem natural, mesmo em alto volume.",
  },
  {
    titulo: "App mobile e web",
    descricao:
      "Acesso à central pelo celular ou navegador, de qualquer lugar — a equipe não fica presa a um computador ou local físico.",
  },
  {
    titulo: "Distribuição, carteiras e integrações via API",
    descricao:
      "Distribuição automática de contatos, carteiras fixas por cliente e conexão com ERP, e-commerce e planilhas via webhook/API.",
    planosSuperiores: true,
  },
];

const planos = [
  {
    nome: "Essencial",
    paraQuem: "Negócios pequenos começando a organizar o atendimento",
    usuarios: "3",
    modulos: "App mobile, automação básica, chatbot",
  },
  {
    nome: "Pro",
    destaque: "mais vendido",
    paraQuem: "Negócios com equipe de atendimento/vendas ativa",
    usuarios: "5",
    modulos: "+ CRM completo, Central de Atendimento, Disparo de Mensagens",
  },
  {
    nome: "Plus+",
    paraQuem: "Operações maiores, com múltiplos atendentes",
    usuarios: "10",
    modulos: "+ Distribuição automática, Carteiras de clientes, Integrações",
  },
  {
    nome: "Advanced",
    paraQuem: "Empresas com operação robusta e múltiplos canais",
    usuarios: "20",
    modulos: "Todos os módulos liberados",
  },
];

export default function AtendimentoWhatsapp() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-8 md:pt-24">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Porta de entrada
        </p>
        <h1 className="font-display mt-5 max-w-[18ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          ConectaCentral
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-apagado">
          by TWR Tech
        </p>
        <p className="mt-6 max-w-[52ch] text-lg text-suave">
          De conversas dispersas a atendimento organizado.
        </p>
        <p className="mt-3 max-w-[52ch] text-suave">
          Atendimento, CRM e IA no WhatsApp e Instagram, num único ambiente.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110"
          >
            Falar no WhatsApp
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
          Atendimento manual custa venda{" "}
          <span className="text-acento">e não deixa rastro.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          Quem atende pelo WhatsApp de forma manual perde venda por demora na
          resposta, não tem histórico organizado de conversas, não consegue
          medir o que gera resultado e não escala sem contratar mais gente.
          O ConectaCentral une atendimento, CRM, automação e IA num único
          ambiente conectado ao WhatsApp e ao Instagram Direct.
        </p>
      </section>

      <section className="bg-azul text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-sobre-azul-suave">
            Por que WhatsApp
          </h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {numeros.map((item) => (
              <div key={item.descricao}>
                <dd className="font-display text-4xl font-extrabold tracking-tight">
                  {item.valor}
                </dd>
                <dt className="mt-2 text-sm leading-relaxed text-sobre-azul-suave">
                  {item.descricao}
                </dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs text-sobre-azul-suave">
            Fontes: Opinion Box, Hazlo, CNN Brasil — dados do material
            comercial da plataforma.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          O que a plataforma faz
        </p>
        <h2 className="font-display mt-5 max-w-[20ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Oito módulos, um único ambiente.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modulos.map((modulo) => (
            <li
              key={modulo.titulo}
              className="rounded-2xl border border-linha bg-painel p-5"
            >
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                {modulo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {modulo.descricao}
              </p>
              {modulo.planosSuperiores && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.09em] text-apagado">
                  Planos superiores
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
          Planos por porte
        </p>
        <h2 className="font-display mt-5 max-w-[20ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Do primeiro atendente à operação com múltiplos canais.
        </h2>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-linha">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-linha bg-painel">
                <th className="p-4 font-display text-base font-extrabold">
                  Plano
                </th>
                <th className="p-4 font-display text-base font-extrabold">
                  Para quem serve
                </th>
                <th className="p-4 font-display text-base font-extrabold">
                  Usuários
                </th>
                <th className="p-4 font-display text-base font-extrabold">
                  Módulos-chave
                </th>
                <th className="p-4 font-display text-base font-extrabold">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {planos.map((plano, i) => (
                <tr
                  key={plano.nome}
                  className={i > 0 ? "border-t border-linha" : ""}
                >
                  <td className="p-4 align-top">
                    <span className="font-display font-extrabold">
                      {plano.nome}
                    </span>
                    {plano.destaque && (
                      <span className="ml-2 rounded-full bg-acento px-2.5 py-0.5 text-xs font-bold text-acento-contraste">
                        {plano.destaque}
                      </span>
                    )}
                  </td>
                  <td className="p-4 align-top text-suave">{plano.paraQuem}</td>
                  <td className="p-4 align-top text-suave">{plano.usuarios}</td>
                  <td className="p-4 align-top text-suave">{plano.modulos}</td>
                  <td className="p-4 align-top text-suave">
                    Valor sob consulta
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-[58ch] text-sm text-apagado">
          Agentes de IA, conexão de pagamentos e canais/usuários adicionais
          são add-ons disponíveis em qualquer plano. Sem multa de
          cancelamento — o plano se ajusta conforme a operação cresce.
        </p>
      </section>

      <section className="bg-azul-profundo text-sobre-azul">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="font-display max-w-[22ch] text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl">
            Organizado o atendimento,{" "}
            <span className="text-acento">os dados vêm depois.</span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-sobre-azul-suave">
            O ConectaCentral resolve a dor mais imediata: o atendimento
            organizado, com histórico e métricas. A partir daí, o mesmo
            trabalho de dados, BI e automação que aplico em{" "}
            <Link href="/portfolio" className="font-bold text-sobre-azul hover:underline">
              outros estudos de caso
            </Link>{" "}
            passa a valer para a sua operação — funil de vendas, indicadores
            de atendimento e IA em cima dos seus próprios números.
          </p>
        </div>
      </section>

      <FaqSection titulo="Perguntas frequentes" itens={faqWhatsapp} />

      <CTASection
        titulo="Quer ver o ConectaCentral no seu WhatsApp?"
        texto="Conto como funciona o onboarding e qual plano faz sentido para o seu porte."
      />
    </>
  );
}
