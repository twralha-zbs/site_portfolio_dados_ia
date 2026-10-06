// Fonte única dos 3 produtos da TWR Tech. Home consome os 3 cards simétricos
// daqui — mesma disciplina de lib/faq.ts e lib/cases.ts.

export type Produto = {
  slug: string;
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
    nome: "NexIAtend",
    selo: "by TWR Tech",
    tagline: "O nexo entre atendimento e IA.",
    modeloPreco: "A partir de R$ 437/mês",
    descricao:
      "As conversas da sua empresa no WhatsApp e no Instagram num lugar só, com a equipe atendendo junto. A TWR Tech implanta, configura e treina.",
    ctaRotulo: "Conhecer o NexIAtend",
    href: "/nexiatend",
    externo: false,
  },
  {
    slug: "maxialcance",
    nome: "MaxIAlcance",
    selo: "by TWR Tech",
    tagline: "Presença no Google, no mapa e nas IAs.",
    modeloPreco: "Implantação + acompanhamento mensal",
    descricao:
      "Pesquisa de palavras-chave, engenharia reversa de concorrentes, páginas otimizadas e perfil no Google: quem procura o seu serviço na sua cidade encontra você, inclusive no ChatGPT.",
    ctaRotulo: "Conhecer o MaxIAlcance",
    href: "/maxialcance",
    externo: false,
  },
  {
    slug: "organizacao-de-dados",
    nome: "Organização de Dados & Processos",
    tagline: "Dados dispersos viram decisão confiável.",
    modeloPreco: "Escopo aberto, por projeto",
    descricao:
      "Mapeamos fontes, processos e fluxos de dados, propomos melhorias e construímos as ferramentas que automatizam e organizam a operação.",
    ctaRotulo: "Falar sobre o projeto",
    href: "/contato",
    externo: false,
  },
];
