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
      "Um consultor de dados e BI conecta os sistemas onde a informação está espalhada — ERP, CRM, planilhas — e transforma isso em relatórios confiáveis para decidir: modelagem de dados, dashboards em Power BI, automação e, quando faz sentido, IA para resumir e alertar. Em muitas PMEs a porta de entrada é mais imediata, como organizar o atendimento no WhatsApp, expandindo depois para dados e IA. O foco é a distância entre o dado e quem decide.",
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

export const faqWhatsapp: ItemFaq[] = [
  {
    pergunta: "Preciso trocar o número de WhatsApp da empresa?",
    resposta:
      "Não. A plataforma conecta ao número que você já usa — a linha existente passa a rodar dentro do sistema, sem trocar de contato nem perder o histórico que os clientes já têm salvo. Toda a equipe atende por esse mesmo número dentro da central, em vez de um WhatsApp de celular pessoal, com histórico centralizado e distribuição de conversas.",
  },
  {
    pergunta: "Funciona com Instagram também?",
    resposta:
      "Funciona. Além do WhatsApp, a central de atendimento conecta o Instagram Direct no mesmo ambiente, com o mesmo histórico e distribuição entre atendentes. Você responde os dois canais num único lugar, sem alternar de aplicativo, e mantém o mesmo funil de CRM para leads que chegam por qualquer um deles.",
  },
  {
    pergunta: "Minha equipe precisa entender de tecnologia para usar?",
    resposta:
      "Não precisa. A interface é pensada para quem atende clientes no dia a dia, não para quem programa: central de conversas, funil kanban e disparo de campanhas funcionam como um WhatsApp organizado. Eu cuido da configuração inicial — chatbot, automações e agentes de IA — e faço o onboarding assistido da equipe antes de ir ao ar.",
  },
  {
    pergunta: "Quantos atendentes cabem na plataforma?",
    resposta:
      "Depende do plano: o Essencial atende times de até 3 usuários, o Pro (mais vendido) de 5, o Plus+ de 10 e o Advanced de 20, todos com a opção de adicionar usuários extras como add-on. A diferença entre os planos não é só o número de atendentes — os planos maiores liberam distribuição automática, carteiras de clientes e integrações via API.",
  },
  {
    pergunta: "Tem fidelidade ou multa de cancelamento?",
    resposta:
      "Não. O plano pode ser ajustado a qualquer momento conforme a operação cresce ou diminui, sem multa de cancelamento. Você contrata o porte que faz sentido hoje e muda de plano quando precisar, sem ficar preso a um contrato rígido pensado para uma operação maior do que a sua.",
  },
  {
    pergunta: "Em quanto tempo a plataforma entra no ar?",
    resposta:
      "O onboarding é assistido: eu configuro a central de atendimento, o CRM e as automações iniciais, e a equipe já consegue atender pela plataforma em poucos dias após a contratação. Chatbot, fluxos de automação e agentes de IA entram configurados nesse mesmo processo, sem exigir conhecimento técnico do seu lado.",
  },
];
