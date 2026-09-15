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
    modeloPreco: "Implantação + fee mensal",
    descricao:
      "Central de atendimento, CRM, automação e agentes de IA num único ambiente conectado ao WhatsApp e ao Instagram.",
    ctaRotulo: "Conhecer o NexIAtend",
    href: "/nexiatend",
    externo: false,
  },
  {
    slug: "seo-aeo-geo",
    nome: "SEO, AEO & GEO",
    tagline: "Presença otimizada pra busca, incluindo IA.",
    modeloPreco: "Implantação única + manutenção de blog (opcional)",
    descricao:
      "Pesquisa de palavras-chave, engenharia reversa de concorrentes, páginas otimizadas e Google Business Profile: presença pronta para o Google e para a busca por IA.",
    ctaRotulo: "Falar sobre o projeto",
    href: "/contato",
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
