import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Layers,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { GrupoRecursos } from "@/components/GrupoRecursos";
import { Hero } from "@/components/ui/hero";
import { Planos } from "@/components/ui/planos";
import { PrintProduto } from "@/components/ui/print-produto";
import { Rotulo } from "@/components/ui/rotulo";
import { faqNexiatend } from "@/lib/faq";
import {
  implantacaoMinima,
  mesesGratis,
  parcelasImplantacao,
  precoMinimo,
} from "@/lib/nexiatend";
import { site } from "@/lib/site";
import agentes from "@/public/nexiatend/agentes_inteligentes.webp";
import aplicativos from "@/public/nexiatend/aplicativos.webp";
import atendimentoMobile from "@/public/nexiatend/atendimento_mobile.webp";
import centralAtendimento from "@/public/nexiatend/central_atendimento.webp";
import crmPipeline from "@/public/nexiatend/crm_pipeline_comercial.webp";
import exemploWhatsappFlow from "@/public/nexiatend/exemplo_whatsapp_flow.webp";
import fluxoChatbot from "@/public/nexiatend/fluxo_chatbot.webp";
import horarioFuncionamento from "@/public/nexiatend/horario_funcionamento.webp";
import integracoes from "@/public/nexiatend/integracoes.webp";
import modelosMensagem from "@/public/nexiatend/modelos_mensagem.webp";
import rastreamento from "@/public/nexiatend/rastreamento.webp";

const reais = (valor: number) => `R$ ${valor.toLocaleString("pt-BR")}`;

export const metadata: Metadata = {
  title: "NexIAtend: atendimento no WhatsApp e no Instagram",
  description: `As conversas da sua empresa no WhatsApp e no Instagram num lugar só, implantadas pela TWR Tech. Diagnóstico gratuito; planos a partir de ${reais(precoMinimo)}/mês.`,
  alternates: { canonical: "/nexiatend" },
};

const selos = [
  { icone: ShieldCheck, texto: "WhatsApp Business Platform (API)" },
  { icone: Layers, texto: "WhatsApp e Instagram numa tela" },
  { icone: Smartphone, texto: "App no celular" },
  { icone: Bot, texto: "IA com passagem para pessoa" },
];

const cadeia = [
  "Campanha",
  "Conversa",
  "Atendimento",
  "CRM",
  "Retorno",
  "Venda",
  "Relacionamento",
];

const rupturas = [
  {
    titulo: "A origem do lead se perde",
    descricao:
      "O cliente chega por um anúncio, um post ou o Google, mas ninguém registra de onde veio.",
  },
  {
    titulo: "A conversa não vira registro",
    descricao:
      "O que foi combinado fica no WhatsApp de quem atendeu, e não no cadastro do cliente.",
  },
  {
    titulo: "A oportunidade fica sem dono",
    descricao:
      "Sem responsável e sem próxima ação, quem pediu preço some no meio de outras mensagens.",
  },
  {
    titulo: "O cliente é esquecido depois da compra",
    descricao:
      "Sem um retorno programado, o relacionamento só recomeça quando o cliente chama de novo.",
  },
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

const passosConversa = [
  {
    titulo: "Abertura",
    descricao:
      "A primeira mensagem diz quem fala, o que vem a seguir e por que vale responder.",
  },
  {
    titulo: "Engajamento",
    descricao:
      "Uma pergunta simples, fácil de responder, que põe o cliente em movimento.",
  },
  {
    titulo: "Qualificação",
    descricao:
      "Os dados que a equipe precisa são coletados aos poucos e gravados no cadastro.",
  },
  {
    titulo: "Conversão",
    descricao:
      "A próxima ação fica clara: agendar, pedir proposta, abrir o formulário, comprar.",
  },
  {
    titulo: "Passagem para pessoa",
    descricao:
      "Quando o cliente está pronto, a conversa vai para a pessoa certa, com o contexto junto.",
  },
];

const retem = [
  "Uma pergunta por vez, sem parede de texto",
  "Dado coletado sem parecer formulário",
  "Próxima ação sempre clara",
  "Saída para uma pessoa na hora certa",
  "Áudio e texto livre tratados, não só botões",
];

const fluxos = [
  {
    titulo: "Distribuição automática",
    descricao:
      "Cada conversa nova vai para quem deve atender, sem a equipe disputar a fila.",
  },
  {
    titulo: "Carteiras de clientes",
    descricao:
      "Cada cliente volta para o seu atendente, que conhece o histórico.",
  },
  {
    titulo: "Departamentos e filas",
    descricao:
      "Comercial, suporte e financeiro com equipes, filas e regras próprias.",
  },
  {
    titulo: "Horário e mensagem fora do expediente",
    descricao:
      "A empresa responde quando está fechada e o retorno entra na fila do dia seguinte.",
  },
  {
    titulo: "Modelos de mensagem aprovados pela Meta",
    descricao:
      "Campanhas e lembretes com mensagens aprovadas, enviadas para quem aceitou receber.",
  },
  {
    titulo: "Sequências e mensagens agendadas",
    descricao:
      "Retornos programados para quem pediu preço, para quem sumiu e para quem acabou de comprar.",
  },
];

const dados = [
  {
    titulo: "CRM como fonte única",
    descricao:
      "Contato, conversa, etapa do funil e responsável no mesmo cadastro.",
  },
  {
    titulo: "Origem de cada lead",
    descricao:
      "Campanha, anúncio ou site: o cliente chega com a origem registrada na conversa.",
  },
  {
    titulo: "Etiquetas e campos",
    descricao:
      "Classifique por interesse, estágio ou o que for útil para o seu negócio.",
  },
  {
    titulo: "Histórico completo",
    descricao:
      "O que foi dito fica com o cliente, mesmo quando o atendente sai da empresa.",
  },
];

const tempoDaEquipe = [
  "Triagem automática antes de a conversa chegar a uma pessoa",
  "Respostas rápidas para o que se repete todo dia",
  "Transcrição de áudio, para ler em vez de ouvir",
  "Retorno programado, sem depender da memória de ninguém",
  "Perguntas repetidas respondidas pelo agente de IA",
  "Tudo do cliente numa tela só",
];

const gestao = [
  {
    titulo: "Supervisão em tempo real",
    descricao: "Quem está esperando, há quanto tempo e com quem.",
  },
  {
    titulo: "Relatórios de volume, espera e duração",
    descricao: "Para saber se a equipe dá conta e onde a fila trava.",
  },
  {
    titulo: "Pesquisa de satisfação",
    descricao: "O cliente avalia o atendimento ao fim da conversa.",
  },
  {
    titulo: "Acompanhamento pelo celular",
    descricao: "A gestão vê e atende de onde estiver, pelo aplicativo.",
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

const adicionais = [
  {
    titulo: "Agente de IA",
    descricao: "Responde as perguntas frequentes e passa para uma pessoa quando precisa.",
  },
  {
    titulo: "Transcrição de áudio por IA",
    descricao: "O áudio do cliente vira texto na própria conversa.",
  },
  {
    titulo: "Pagamentos no chat",
    descricao: "Cobrança pelo Asaas dentro da conversa.",
  },
  {
    titulo: "Usuário ou canal extra",
    descricao: "Mais uma pessoa atendendo ou mais um número conectado.",
  },
  {
    titulo: "Integrações",
    descricao: "API, webhooks, Make e n8n para ligar a central aos seus sistemas.",
  },
  {
    titulo: "Widget de atendimento no site",
    descricao: "O visitante chama pelo site e a origem fica registrada.",
  },
  {
    titulo: "Chat interno",
    descricao: "Conversa entre a equipe sem sair da plataforma.",
  },
  {
    titulo: "Classificação de atendimento",
    descricao: "Marque o resultado de cada atendimento para medir a qualidade.",
  },
  {
    titulo: "Visita presencial no ABC paulista",
    descricao: "Início do projeto ou treinamento da equipe no local, a pedido.",
  },
];

// Dados estruturados: Service + FAQPage. O FAQPage lê as mesmas strings de
// faqNexiatend que a FaqSection renderiza (Question.name/Answer.text idênticos).
// O preço do Service vem de lib/nexiatend.ts, a mesma fonte dos cards.
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
        minPrice: precoMinimo,
        priceCurrency: "BRL",
        unitText: "MONTH",
      },
      description: `Planos a partir de ${reais(precoMinimo)} por mês; implantação a partir de ${reais(implantacaoMinima)}, parcelável em até ${parcelasImplantacao}x no contrato de 12 meses, que tem ${mesesGratis} mês de mensalidade grátis.`,
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

      <Hero
        eyebrow="WhatsApp, Instagram e IA"
        marca="NexIAtend"
        selo="by TWR Tech"
        titulo={
          <>
            Conversas inteligentes que{" "}
            <span className="text-acento">viram venda.</span>
          </>
        }
        subtitulo="Uma central única para a equipe atender junto e a gestão enxergar tudo, do primeiro contato ao pós-venda, no WhatsApp e no Instagram."
        ctas={{
          primario: {
            rotulo: "Pedir diagnóstico gratuito",
            href: site.links.whatsappDiagnostico,
            externo: true,
          },
          secundario: { rotulo: "Ver planos", href: "#planos" },
        }}
      >
        <div className="relative mx-auto max-w-5xl text-left">
          <PrintProduto
            src={centralAtendimento}
            alt="Central de atendimento do NexIAtend: lista de conversas à esquerda e a conversa aberta, com a origem do cliente, à direita"
            sizes="(min-width: 1024px) 1024px, 100vw"
            legenda="// central de atendimento"
            priority
          />
          <div className="absolute -bottom-12 -right-4 hidden w-36 md:block lg:-right-12 lg:w-48">
            <PrintProduto
              src={atendimentoMobile}
              alt="Lista de atendimentos do NexIAtend no celular, com etiquetas, equipe e tempo de espera de cada conversa"
              sizes="192px"
              variante="aparelho"
            />
          </div>
        </div>
      </Hero>

      <section className="border-y border-linha bg-painel/40">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-6 py-8 md:px-8 lg:grid-cols-4">
          {selos.map(({ icone: Icone, texto }) => (
            <li key={texto} className="flex items-center gap-3 text-sm text-suave">
              <Icone aria-hidden="true" className="h-5 w-5 shrink-0 text-acento" />
              {texto}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <Rotulo>{"// o problema"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Digitalizamos a conversa,{" "}
          <span className="text-acento">não o que ela gera.</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-suave">
          O WhatsApp virou o balcão da empresa, mas quase nada do que acontece
          ali vira registro. A conversa acontece, a venda talvez aconteça, e o
          caminho entre as duas se perde.
        </p>

        <ol className="mt-10 flex flex-wrap items-center gap-2 font-mono text-xs text-suave md:text-sm">
          {cadeia.map((etapa, i) => (
            <li key={etapa} className="flex items-center gap-2">
              <span className="rounded-full border border-linha bg-painel px-3 py-1.5">
                {etapa}
              </span>
              {i < cadeia.length - 1 && (
                <span aria-hidden="true" className="text-apagado">
                  {"→"}
                </span>
              )}
            </li>
          ))}
        </ol>

        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {rupturas.map((item) => (
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

        <h3 className="mt-16 font-mono text-xs text-apagado md:text-sm">
          {"// no dia a dia, aparece assim"}
        </h3>
        <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
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

      <GrupoRecursos
        rotulo="// 01 · conversas inteligentes"
        titulo={
          <>
            Conversa com objetivo,{" "}
            <span className="text-acento">não menu de opções.</span>
          </>
        }
        texto={
          "O mercado vende disparo em massa e o menu \"digite 1, 2 ou 3\". O NexIAtend monta conversas com um objetivo: cada mensagem leva o cliente ao passo seguinte, até a pessoa certa assumir."
        }
        recursos={passosConversa}
        visual={
          <div className="space-y-6">
            <PrintProduto
              src={fluxoChatbot}
              alt="Editor de fluxo do NexIAtend: um gatilho abre a conversa e os blocos seguintes enviam mensagens, aguardam respostas, alteram campos do cliente e transferem para uma equipe"
              sizes="(min-width: 1024px) 560px, 100vw"
              legenda="// fluxo no editor"
            />
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
              <PrintProduto
                src={exemploWhatsappFlow}
                alt="Formulário curto aberto dentro do WhatsApp, com título, três perguntas rápidas e o botão Começar"
                sizes="240px"
                variante="celular"
                className="max-w-[14rem]"
              />
              <p className="text-sm leading-relaxed text-suave">
                <span className="font-mono text-xs text-apagado">
                  {"// o que o cliente vê"}
                </span>
                <br />
                O formulário abre dentro do WhatsApp, sem site e sem sair da
                conversa. Os dados coletados vão direto para o cadastro.
              </p>
            </div>
          </div>
        }
      >
        <p className="mt-8 font-mono text-xs text-apagado md:text-sm">
          {"// o que mantém o cliente na conversa"}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-suave">
          {retem.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-acento">
                {"›"}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </GrupoRecursos>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <Rotulo>{"// 02 · fluxos de atendimento e vendas"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Cada conversa no caminho certo,{" "}
          <span className="text-acento">sem ninguém escalar.</span>
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          As regras ficam na plataforma, e não na cabeça de quem atende. A
          equipe responde, e o resto anda sozinho.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fluxos.map((item) => (
            <li
              key={item.titulo}
              className="rounded-2xl border border-linha bg-painel p-6"
            >
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {item.descricao}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              Funil de vendas
            </h3>
            <p className="mt-3 text-suave">
              Cada oportunidade numa coluna, com responsável, valor e atraso à
              vista. Quem pediu preço e não recebeu retorno aparece em destaque.
            </p>
          </div>
          <PrintProduto
            src={crmPipeline}
            alt="Funil de vendas do CRM em colunas (Prospecção, Contrato, Visita, Reclamação e Retenção), com cartões de clientes, responsáveis, valores e alertas de atraso"
            sizes="(min-width: 1024px) 640px, 100vw"
            legenda="// funil comercial"
          />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <figure>
            <PrintProduto
              src={horarioFuncionamento}
              alt="Tela de horário de atendimento da empresa, com dias da semana, horário de início, almoço e fim, e fuso horário de Brasília"
              sizes="(min-width: 768px) 480px, 100vw"
              legenda="// horário de atendimento"
            />
            <figcaption className="mt-3 text-sm text-suave">
              Horário da empresa, com intervalo de almoço e fuso.
            </figcaption>
          </figure>
          <figure>
            <PrintProduto
              src={modelosMensagem}
              alt="Lista de modelos de mensagem da plataforma, com o tipo (marketing) e o texto de cada modelo"
              sizes="(min-width: 768px) 480px, 100vw"
              legenda="// modelos de mensagem"
            />
            <figcaption className="mt-3 text-sm text-suave">
              Modelos de mensagem prontos para campanhas e lembretes.
            </figcaption>
          </figure>
        </div>
      </section>

      <GrupoRecursos
        rotulo="// 03 · dados organizados e rastreados"
        titulo={
          <>
            Cada conversa vira{" "}
            <span className="text-acento">um dado que você usa.</span>
          </>
        }
        texto="O CRM é a fonte única: quem é o cliente, de onde veio, com quem está e em que etapa. Quando a equipe muda, o histórico fica."
        recursos={dados}
        invertido
        visual={
          <PrintProduto
            src={rastreamento}
            alt="Conversa no NexIAtend com um cartão de rastreamento que registra a origem do cliente, a campanha, o título do anúncio e a página de acesso"
            sizes="(min-width: 1024px) 560px, 100vw"
            legenda="// origem registrada na conversa"
          />
        }
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Rotulo>{"// 04 · tempo devolvido à equipe"}</Rotulo>
            <h2 className="font-display mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
              O que sai da mão de quem{" "}
              <span className="text-acento">atende e vende.</span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg text-suave">
              A equipe volta a fazer o que só ela faz: conversar, entender e
              fechar. O repetitivo fica com a plataforma.
            </p>
          </div>
          <ul className="grid gap-3">
            {tempoDaEquipe.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-linha bg-painel px-5 py-4 text-sm text-suave"
              >
                <span aria-hidden="true" className="text-acento">
                  {"✓"}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GrupoRecursos
        rotulo="// 05 · gestão e monitoramento"
        titulo={
          <>
            Você vê a operação{" "}
            <span className="text-acento">enquanto ela acontece.</span>
          </>
        }
        texto="Quem está esperando, quem está atendendo e como a equipe está indo, sem pedir relatório para ninguém."
        recursos={gestao}
        visual={
          <PrintProduto
            src={atendimentoMobile}
            alt="Lista de atendimentos no celular, com abas Novos, Meus e Outros, etiquetas dos clientes, equipe responsável e tempo de espera"
            sizes="(min-width: 1024px) 272px, 70vw"
            variante="aparelho"
          />
        }
      />

      <GrupoRecursos
        rotulo="// 06 · inteligência artificial"
        titulo={
          <>
            Um agente que responde o repetido{" "}
            <span className="text-acento">e chama uma pessoa.</span>
          </>
        }
        texto="Agentes inteligentes usam a base de conhecimento da sua empresa para responder as perguntas frequentes. Quando o assunto pede uma pessoa, a conversa passa para a equipe."
        invertido
        visual={
          <PrintProduto
            src={agentes}
            alt="Tela de agentes inteligentes do NexIAtend, com os agentes criados, o objetivo de cada um e as abas Agentes, Supervisores e Base de conhecimento"
            sizes="(min-width: 1024px) 560px, 100vw"
            legenda="// agentes inteligentes"
          />
        }
      >
        <ul className="mt-6 space-y-2 text-sm text-suave">
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-acento">{"›"}</span>
            Configurado pela TWR Tech, com o tom e as regras da sua empresa
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-acento">{"›"}</span>
            O uso da IA roda na conta de IA da própria empresa
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-acento">{"›"}</span>
            Incluso no plano IA e adicional nos planos Vendas e Equipe
          </li>
        </ul>
      </GrupoRecursos>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <Rotulo>{"// como funciona"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
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
          A conexão é feita pela WhatsApp Business Platform (API), e o número e
          o aplicativo no celular podem continuar funcionando. O atendimento do
          dia a dia fica com a sua equipe: a TWR Tech implanta, treina e dá
          suporte, mas não opera a central.
        </p>
      </section>

      <section
        id="planos"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:px-8 md:py-20"
      >
        <Rotulo>{"// planos"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          Cada plano resolve uma dor a mais.
        </h2>
        <p className="mt-4 max-w-[58ch] text-suave">
          Mensalidade fixa e implantação paga uma vez. Escolha o contrato
          abaixo para ver o que muda no pagamento.
        </p>
        <div className="mt-8">
          <Planos />
        </div>
        <div className="mt-8 grid max-w-[70ch] gap-3 text-sm text-apagado">
          <p>
            Contrato mensal sem fidelidade, com a implantação à vista, ou
            contrato de 12 meses, com 1 mês de mensalidade grátis e a
            implantação parcelada em até 3x. Dá para mudar
            de plano quando a operação crescer.
          </p>
          <p>
            As mensagens que a Meta cobra são pagas pela empresa direto à Meta,
            e o uso do agente de IA roda na conta de IA da própria empresa.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <Rotulo>{"// recursos adicionais"}</Rotulo>
        <h2 className="font-display mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          O que mais pode entrar no seu plano.
        </h2>
        <p className="mt-4 max-w-[58ch] text-suave">
          Estes recursos podem ser agregados ao seu plano. A disponibilidade
          varia por plano, e a TWR Tech indica na proposta o que cabe no seu
          caso.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {adicionais.map((item) => (
            <li key={item.titulo} className="border-t border-linha pt-5">
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {item.descricao}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <PrintProduto
            src={aplicativos}
            alt="Tela de aplicativos da plataforma, com cada recurso (classificação de atendimento, CRM, sequências, chat interno, entre outros) e o botão de habilitar ou configurar"
            sizes="(min-width: 768px) 480px, 100vw"
            legenda="// aplicativos"
          />
          <PrintProduto
            src={integracoes}
            alt="Tela de integrações da plataforma, com widget de atendimento, webhooks, API, Make e n8n"
            sizes="(min-width: 768px) 480px, 100vw"
            legenda="// integrações"
          />
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
