// Fonte única de identidade do site. Qualquer dado pessoal, link externo ou
// endpoint vive aqui — páginas e componentes importam deste módulo.
export const site = {
  nome: "Thiago Waldowski Ralha",
  marca: "TWR Tech",
  razaoSocial:
    "THIAGO WALDOWSKI RALHA CONSULTORIA EM TECNOLOGIA DA INFORMACAO LTDA",
  cnpj: "68.666.679/0001-96",
  titulo: "NexIAtend, MaxIAlcance e Consultoria de Dados | TWR Tech",
  headline: "Atendimento, presença e dados prontos pra escalar",
  subheadline:
    "Três produtos pra PME: atendimento com IA no WhatsApp, presença otimizada pra busca (Google e IA) e organização de dados e processos.",
  email: "twralha@gmail.com",
  localizacao: "São Paulo, SP · atendimento remoto para todo o Brasil",
  links: {
    linkedin: "https://linkedin.com/in/twralha",
    github: "https://github.com/twralha",
    substack: "https://twralha.substack.com",
    substackFeed: "https://twralha.substack.com/feed",
    agenda: "https://cal.com/twralha",
    whatsapp:
      "https://wa.me/551151234016?text=Ol%C3%A1%20Thiago%2C%20vim%20pelo%20seu%20site%20e%20quero%20conversar%20sobre%20dados.",
    // CTA da página /maxialcance: mesmo número comercial, mensagem de pedido de avaliação
    whatsappAvaliacao:
      "https://wa.me/551151234016?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20a%20avalia%C3%A7%C3%A3o%20gratuita%20do%20MaxIAlcance%20para%20o%20meu%20neg%C3%B3cio.",
  },
  formspreeEndpoint: "https://formspree.io/f/xjgnyzqk",
  urlProducao: "https://twralha.com",
} as const;
