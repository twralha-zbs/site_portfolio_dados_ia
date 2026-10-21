// Fonte única dos 3 produtos da TWR Tech. A Home monta um bloco por produto,
// pela dor que ele resolve — mesma disciplina de lib/faq.ts e lib/cases.ts.

export type Produto = {
  slug: string;
  // Rótulo mono do bloco da Home (ex.: "// 01 · atendimento")
  rotulo: string;
  // A dor do cliente, que vira o título do bloco
  dor: string;
  // Dor em poucas palavras, para os atalhos do hero
  atalho: string;
  beneficios: string[];
  nome: string;
  selo?: string;
  tagline: string;
  modeloPreco: string;
  descricao: string;
  ctaRotulo: string;
  href: string;
  externo: boolean;
};

export const produtos: Produto[] = [
  {
    slug: "nexiatend",
    rotulo: "// 01 · atendimento",
    dor: "Seu WhatsApp tem conversa demais e registro de menos.",
    atalho: "WhatsApp com conversa demais",
    beneficios: [
      "Conversas do WhatsApp e do Instagram numa tela só, com a equipe atendendo junto",
      "Cada cliente com histórico, responsável e origem registrados",
      "Gestão vendo quem está esperando, em tempo real",
    ],
    nome: "NexIAtend",
    selo: "by TWR Tech",
    tagline: "O nexo entre atendimento e IA.",
    modeloPreco: "A partir de R$ 437/mês",
    descricao:
      "Uma central de atendimento que a TWR Tech implanta, configura e treina.",
    ctaRotulo: "Conhecer o NexIAtend",
    href: "/nexiatend",
    externo: false,
  },
  {
    slug: "maxialcance",
    rotulo: "// 02 · presença",
    dor: "Quem não conhece você procura no Google e pergunta à IA.",
    atalho: "Ninguém acha você no Google",
    beneficios: [
      "Perfil no Google completo e uma página para cada serviço e região",
      "Conteúdo escrito para as IAs, como o ChatGPT, poderem citar o seu negócio",
      "Avaliação gratuita, com nota de 0 a 100 em 15 critérios",
    ],
    nome: "MaxIAlcance",
    selo: "by TWR Tech",
    tagline: "Presença no Google, no mapa e nas IAs.",
    modeloPreco: "Implantação a partir de R$ 3.000 + R$ 400/mês",
    descricao:
      "Quem procura o seu serviço na sua cidade encontra você: no Google, no mapa e no ChatGPT.",
    ctaRotulo: "Conhecer o MaxIAlcance",
    href: "/maxialcance",
    externo: false,
  },
  {
    slug: "organizacao-de-dados",
    rotulo: "// 03 · dados",
    dor: "Cinco planilhas, nenhum número em que dá pra confiar.",
    atalho: "Números que não batem",
    beneficios: [
      "Fontes e processos mapeados antes de qualquer painel",
      "Painéis e indicadores que as áreas usam para decidir",
      "Automações que tiram o trabalho manual do fechamento",
    ],
    nome: "DataConsult",
    selo: "by TWR Tech",
    tagline: "Dados dispersos viram decisão confiável.",
    modeloPreco: "Escopo aberto, por projeto",
    descricao:
      "Mapeamos fontes, processos e fluxos de dados, propomos melhorias e construímos as ferramentas que automatizam e organizam a operação.",
    ctaRotulo: "Conhecer o DataConsult",
    href: "/organizacao-de-dados",
    externo: false,
  },
];
