// Fonte única do conteúdo de FAQ. O componente FaqSection renderiza o texto
// visível e, na Fase 5, o JSON-LD FAQPage lê exatamente as mesmas strings —
// garantindo a regra de AEO "Question.name/Answer.text idênticos ao visível"
// (PLANO_PROJETO.md §6.2). Respostas answer-first, factuais, ≤ 80 palavras (§6.3).

export type ItemFaq = {
  pergunta: string;
  resposta: string;
};

export const faqHome: ItemFaq[] = [
  {
    pergunta: "O que faz um consultor de dados e BI?",
    resposta:
      "Um consultor de dados e BI conecta os sistemas onde a informação está espalhada — ERP, CRM, planilhas — e transforma isso em relatórios confiáveis para decidir. Na prática: modelagem de dados, dashboards em Power BI, automação dos fluxos manuais e, quando faz sentido, IA para resumir e alertar. O foco é a distância entre o dado e quem decide, não a ferramenta.",
  },
  {
    pergunta: "Quanto tempo leva um projeto de Power BI?",
    resposta:
      "Depende do escopo, mas um primeiro dashboard útil costuma sair em poucas semanas. Um diagnóstico inicial leva dias e já aponta o caminho: quais fontes conectar, o que medir e onde estão os maiores ganhos. Projetos maiores, com vários sistemas e áreas, avançam por entregas — com um painel funcionando cedo, em vez de tudo só no fim.",
  },
  {
    pergunta: "Funciona com meu ERP ou com minhas planilhas?",
    resposta:
      "Sim. O Power BI se conecta a ERPs, CRMs, bancos SQL, SharePoint, APIs e planilhas de Excel — e é comum combinar várias dessas fontes num modelo único. Onde não há conexão direta, um pipeline em Python trata e padroniza os dados antes de carregar. O ponto de partida é entender onde a informação vive hoje.",
  },
  {
    pergunta: "Onde você atende?",
    resposta:
      "Atendo de São Paulo, remotamente, empresas de todo o Brasil — de capitais como São Paulo, Rio de Janeiro, Belo Horizonte e Curitiba ao interior. O trabalho com Power BI e Power Platform é feito na nuvem, então reuniões, entregas e suporte funcionam à distância sem perda. Faço trabalho presencial pontual em São Paulo quando o projeto pede.",
  },
  {
    pergunta: "Meus relatórios ficam prontos para IA e Copilot?",
    resposta:
      "Ficam, e esse é justamente o ponto. Ferramentas de IA como o Copilot respondem a partir do seu modelo de dados: se as medidas divergem ou os números não batem, a IA repete o erro com mais confiança. Dados reconciliados, métricas consistentes e lógica documentada são a base que torna a IA segura de usar — e é exatamente o que fica pronto no projeto.",
  },
  {
    pergunta: "Como começa um projeto?",
    resposta:
      "Começa por uma conversa de diagnóstico, sem compromisso: você descreve a dor de dados de hoje e eu aponto se e como dá para resolver. A partir daí, o primeiro passo costuma ser um diagnóstico de escopo fixo, que mapeia fontes, indicadores e prioridades antes de construir qualquer dashboard. Você pode agendar essa conversa direto pelo site.",
  },
];
