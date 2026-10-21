// Fonte única da oferta do NexIAtend: cards, tabela comparativa e JSON-LD da
// página /nexiatend leem daqui. Valores da oferta aprovada em 2026-10-05
// (Produtos/NexIAtend/Docs/oferta-e-planos.md, seções 2 e 5, na biblioteca).

export type Plano = {
  slug: string;
  nome: string;
  // Rótulo que acompanha o plano em destaque (sem alegar "mais vendido")
  rotulo?: string;
  destaque?: boolean;
  mensalidade: number;
  // Implantação do contrato mensal; no contrato de 12 meses sai pela metade
  implantacao: number;
  capacidade: string;
  resolve: string;
  // "Tudo do plano anterior, mais:" acima da lista
  herda?: string;
  inclui: string[];
};

export const planos: Plano[] = [
  {
    slug: "atendimento",
    nome: "Atendimento",
    mensalidade: 437,
    implantacao: 767,
    capacidade: "3 pessoas · 1 canal",
    resolve: "As conversas num lugar só.",
    inclui: [
      "Central de atendimento com histórico e transferência",
      "Mensagem de boas-vindas e triagem automática",
      "Horário de atendimento e mensagem fora do expediente",
      "App no celular e no computador",
    ],
  },
  {
    slug: "vendas",
    nome: "Vendas",
    rotulo: "Atendimento + vendas",
    destaque: true,
    mensalidade: 717,
    implantacao: 1647,
    capacidade: "5 pessoas · 2 canais",
    resolve: "Retorno para quem pediu preço.",
    herda: "Tudo do Atendimento, mais:",
    inclui: [
      "WhatsApp e Instagram na mesma tela",
      "Funil de vendas para acompanhar cada oportunidade",
      "Envio de campanhas e mensagens de retorno programadas",
      "Origem de cada cliente: campanha, anúncio ou site",
    ],
  },
  {
    slug: "equipe",
    nome: "Equipe",
    mensalidade: 1207,
    implantacao: 2197,
    capacidade: "10 pessoas · 3 canais",
    resolve: "O time cresce sem bagunça.",
    herda: "Tudo do Vendas, mais:",
    inclui: [
      "Conversas divididas automaticamente entre as equipes",
      "Cada cliente com o seu atendente (carteiras)",
      "Pesquisa de satisfação ao fim do atendimento",
      "Áudio transcrito por IA",
      "API e webhooks para ligar outros sistemas",
    ],
  },
  {
    slug: "ia",
    nome: "IA",
    mensalidade: 2197,
    implantacao: 3297,
    capacidade: "20 pessoas · 3 canais",
    resolve: "Um assistente para as perguntas repetidas.",
    herda: "Tudo do Equipe, mais:",
    inclui: [
      "Agente de IA configurado pela TWR Tech",
      "Base de conhecimento da sua empresa",
      "Passagem para uma pessoa quando precisa",
    ],
  },
];

export const precoMinimo = Math.min(...planos.map((p) => p.mensalidade));
export const implantacaoMinima = Math.min(...planos.map((p) => p.implantacao));

// Valor da célula na tabela comparativa, na ordem dos planos acima:
// true = incluso, false = não incluso, texto = detalhe do plano.
export type ValorCelula = boolean | string;

export type LinhaComparativo = {
  recurso: string;
  valores: [ValorCelula, ValorCelula, ValorCelula, ValorCelula];
};

export const comparativo: LinhaComparativo[] = [
  { recurso: "Pessoas atendendo", valores: ["3", "5", "10", "20"] },
  {
    recurso: "Canais incluídos",
    valores: ["1 (WhatsApp ou Instagram)", "2 (WhatsApp e Instagram)", "3", "3"],
  },
  { recurso: "Central de atendimento, histórico e notas internas", valores: [true, true, true, true] },
  { recurso: "App no celular e no computador", valores: [true, true, true, true] },
  { recurso: "Horário e mensagem fora do expediente", valores: [true, true, true, true] },
  { recurso: "Chatbots de atendimento", valores: ["2", "5", "Sem limite", "Sem limite"] },
  { recurso: "Etiquetas e respostas rápidas", valores: [true, true, true, true] },
  { recurso: "Funil de vendas (CRM)", valores: [false, "3 painéis", "Sem limite", "Sem limite"] },
  { recurso: "Campos personalizados", valores: [false, true, true, true] },
  { recurso: "Campanhas (envio em massa)", valores: [false, true, true, true] },
  {
    recurso: "Sequências e mensagens agendadas",
    valores: [false, "2 sequências", "Sem limite", "Sem limite"],
  },
  { recurso: "Origem do cliente (campanha e anúncio)", valores: [false, true, true, true] },
  { recurso: "Distribuição automática e departamentos", valores: [false, false, true, true] },
  { recurso: "Carteiras de clientes", valores: [false, false, true, true] },
  { recurso: "Pesquisa de satisfação", valores: [false, false, true, true] },
  {
    recurso: "Transcrição de áudio por IA",
    valores: ["Adicional", "Adicional", true, true],
  },
  { recurso: "API e webhooks", valores: [false, false, true, true] },
  {
    recurso: "Agente de IA",
    valores: [false, "Adicional", "Adicional", "1 incluso, configurado pela TWR Tech"],
  },
];
