// Fonte única dos cases do portfólio. Home (grade compacta) e /portfolio
// (dois blocos completos) consomem daqui — mesma disciplina de lib/faq.ts.

export type Case = {
  slug: string;
  titulo: string;
  resumo: string;
  contexto: string;
  selo: "demonstrativo" | "projeto-proprio";
  status: "em-breve" | "publicado";
  stack: string[];
  href?: string;
};

export const casesDemonstrativos: Case[] = [
  {
    slug: "serra-azul",
    titulo: "Distribuidora Serra Azul",
    resumo:
      "Atacadista de bebidas com 1.200 pontos de venda: da reposição no feeling a um cockpit de decisão em Power BI, com alerta diário de ruptura e resumo executivo gerado por IA.",
    contexto:
      "Atacadista de bebidas com 1.200 pontos de venda, 250 SKUs e R$ 4 milhões por mês em faturamento simulado. O caso cobre as quatro camadas do meu trabalho: pipeline de dados em Python, dashboard Power BI de 4 páginas, alerta diário de ruptura via Power Automate e resumo executivo semanal gerado por IA.",
    selo: "demonstrativo",
    status: "em-breve",
    stack: ["Python", "Power BI", "Power Automate", "IA"],
  },
  {
    slug: "colegios-simulados",
    titulo: "Rede de colégios — desempenho em simulados",
    resumo:
      "Acompanhamento de notas por aluno, turma, unidade e área de conhecimento entre simulados, com identificação dos tópicos de maior perda.",
    contexto:
      "Rede de colégios acompanhando o desempenho em simulados: evolução de notas por aluno, turma, unidade e área de conhecimento, comparação entre unidades ao longo do ano e identificação dos tópicos com maior perda de rendimento. Dados sintéticos.",
    selo: "demonstrativo",
    status: "em-breve",
    stack: ["Power BI", "Python"],
  },
  {
    slug: "forca-de-vendas",
    titulo: "Força de vendas — gestão de carteira",
    resumo:
      "Priorização das empresas a visitar por potencial, tempo desde a última visita e cobertura por vendedor, com roteirização da carteira.",
    contexto:
      "Gestão de carteira de uma força de vendas: priorização das empresas a visitar considerando potencial da conta, tempo desde a última visita, cobertura por vendedor e roteirização da carteira, além de um painel de acompanhamento por representante. Dados sintéticos.",
    selo: "demonstrativo",
    status: "em-breve",
    stack: ["Power BI", "Power Platform"],
  },
];

export const projetosProprios: Case[] = [
  {
    slug: "elas-jogam",
    titulo: "ELAS JOGAM",
    resumo:
      "Perfil de referência em esporte feminino brasileiro (@elasjogambr), operado por uma pipeline de 8 agentes de IA em cron, com gate de aprovação humana obrigatório nos primeiros 90 dias.",
    contexto:
      "Perfil de referência em esporte feminino brasileiro operado por uma pipeline de 8 agentes de IA (apuração, redação, design, checagem, publicação, plantão, análise). Tese: a imprensa dedica 2,7–4% da cobertura ao esporte feminino enquanto ele já ocupa 18,5% da conversa social — o público conversa 4 a 7x mais do que a imprensa cobre. Janela: Copa do Mundo Feminina no Brasil, jun–jul/2027.",
    selo: "projeto-proprio",
    status: "em-breve",
    stack: ["Agentes de IA", "Automação", "Instagram"],
  },
];
