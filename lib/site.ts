// Fonte única de identidade do site. Qualquer dado pessoal, link externo ou
// endpoint vive aqui — páginas e componentes importam deste módulo.
export const site = {
  nome: "Thiago Waldowski Ralha",
  marca: "TWR Tech",
  razaoSocial:
    "THIAGO WALDOWSKI RALHA CONSULTORIA EM TECNOLOGIA DA INFORMACAO LTDA",
  cnpj: "68.666.679/0001-96",
  titulo: "NexIAtend, MaxIAlcance e Consultoria de Dados | TWR Tech",
  headline: "Conversas, presença e dados da sua empresa organizados",
  subheadline:
    "A TWR Tech tem três produtos para a PME organizar o atendimento, ser encontrada no Google e nas IAs e decidir com dados.",
  email: "twralha@gmail.com",
  localizacao: "São Paulo, SP · atendimento remoto para todo o Brasil",
  links: {
    linkedin: "https://linkedin.com/in/twralha",
    github: "https://github.com/twralha",
    substack: "https://twralha.substack.com",
    substackFeed: "https://twralha.substack.com/feed",
    agenda: "https://cal.com/twralha",
    // Porta única no WhatsApp (Helena). A mensagem pronta é o GATILHO do
    // chatbot, que envia o Flow e registra a origem: a frase tem que ser
    // exatamente esta, senão o Flow não dispara. Não editar sem mudar o
    // gatilho na Helena (lista de links por canal em Marketing/WhatsApp_Flows/
    // 2026-11_flow-porta-unica/README.md, seção 3, na biblioteca TWR Tech).
    // A mensagem só identifica a origem; os pedidos específicos (avaliação,
    // diagnóstico) saíram dela, e a isca passa a sair da dor que a pessoa
    // marca no Flow. As chaves separadas ficam para não mexer nas páginas.
    //
    // Origem "site": botões de WhatsApp de twralha.com (contato, /nexiatend,
    // /maxialcance).
    whatsapp: "https://wa.me/551151234016?text=Oi%2C%20Thiago!%20Vim%20pelo%20site.",
    whatsappAvaliacao:
      "https://wa.me/551151234016?text=Oi%2C%20Thiago!%20Vim%20pelo%20site.",
    whatsappDiagnostico:
      "https://wa.me/551151234016?text=Oi%2C%20Thiago!%20Vim%20pelo%20site.",
    // Origem "instagram": botões das páginas /bio (link da bio do Instagram).
    whatsappBio:
      "https://wa.me/551151234016?text=Oi%2C%20Thiago!%20Vim%20pelo%20Instagram.",
    whatsappDiagnosticoBio:
      "https://wa.me/551151234016?text=Oi%2C%20Thiago!%20Vim%20pelo%20Instagram.",
  },
  formspreeEndpoint: "https://formspree.io/f/xjgnyzqk",
  urlProducao: "https://twralha.com",
} as const;
