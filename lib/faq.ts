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
      "Um consultor de dados e BI conecta os sistemas onde a informação está espalhada (ERP, CRM, planilhas) e transforma isso em relatórios confiáveis para decidir: modelagem de dados, dashboards em Power BI, automação e, quando faz sentido, IA para resumir e alertar. Em muitas PMEs a porta de entrada é mais imediata, como organizar o atendimento no WhatsApp, expandindo depois para dados e IA. O foco é a distância entre o dado e quem decide.",
  },
  {
    pergunta: "Quanto tempo leva um projeto de Power BI?",
    resposta:
      "Depende do escopo, mas um primeiro dashboard útil costuma sair em poucas semanas. Um diagnóstico inicial leva dias e já aponta o caminho: quais fontes conectar, o que medir e onde estão os maiores ganhos. Projetos maiores, com vários sistemas e áreas, avançam por entregas, com um painel funcionando cedo, em vez de tudo só no fim.",
  },
  {
    pergunta: "Funciona com meu ERP ou com minhas planilhas?",
    resposta:
      "Sim. O Power BI se conecta a ERPs, CRMs, bancos SQL, SharePoint, APIs e planilhas de Excel, e é comum combinar várias dessas fontes num modelo único. Onde não há conexão direta, um pipeline em Python trata e padroniza os dados antes de carregar. O ponto de partida é entender onde a informação vive hoje.",
  },
  {
    pergunta: "Onde você atende?",
    resposta:
      "A TWR Tech atende de São Paulo, remotamente, empresas de todo o Brasil, de capitais como São Paulo, Rio de Janeiro, Belo Horizonte e Curitiba ao interior. O trabalho com Power BI e Power Platform é feito na nuvem, então reuniões, entregas e suporte funcionam à distância sem perda. Trabalho presencial pontual em São Paulo acontece quando o projeto pede.",
  },
  {
    pergunta: "Meus relatórios ficam prontos para IA e Copilot?",
    resposta:
      "Ficam, e esse é justamente o ponto. Ferramentas de IA como o Copilot respondem a partir do seu modelo de dados: se as medidas divergem ou os números não batem, a IA repete o erro com mais confiança. Dados reconciliados, métricas consistentes e lógica documentada são a base que torna a IA segura de usar, e é exatamente o que fica pronto no projeto.",
  },
  {
    pergunta: "Como começa um projeto?",
    resposta:
      "Começa por uma conversa de diagnóstico, sem compromisso: você descreve a dor de dados de hoje e a TWR Tech aponta se e como dá para resolver. A partir daí, o primeiro passo costuma ser um diagnóstico de escopo fixo, que mapeia fontes, indicadores e prioridades antes de construir qualquer dashboard. Você pode agendar essa conversa direto pelo site.",
  },
];

// FAQ da página /nexiatend. As mesmas strings alimentam o JSON-LD FAQPage da
// página, então o texto visível e o estruturado nunca divergem.
export const faqNexiatend: ItemFaq[] = [
  {
    pergunta: "O que é o NexIAtend?",
    resposta:
      "O NexIAtend é a central de atendimento da TWR Tech que reúne as conversas do WhatsApp e do Instagram da empresa num lugar só, com a equipe atendendo pelo mesmo número e o gestor vendo tudo. Conforme o plano, inclui funil de vendas, campanhas, divisão automática de conversas e assistente de IA. A TWR Tech implanta, configura e treina a equipe.",
  },
  {
    pergunta: "Quanto custa o NexIAtend?",
    resposta:
      "Os planos começam em R$ 437 por mês para até 3 pessoas atendendo em um canal. O plano Vendas custa R$ 717, o Equipe R$ 1.207 e o IA R$ 2.197. A implantação é paga uma vez, a partir de R$ 767, e sai pela metade no contrato de 12 meses. As mensagens cobradas pela Meta são pagas direto à Meta.",
  },
  {
    pergunta: "Preciso trocar o número ou parar de usar o WhatsApp no celular?",
    resposta:
      "Não. A conexão oficial do WhatsApp pode manter o número atual e o aplicativo no celular funcionando junto com a central. A TWR Tech faz essa conexão na implantação. Para isso, a empresa precisa de CNPJ, de uma conta da Meta com cartão e de um site com o CNPJ no rodapé.",
  },
  {
    pergunta: "Quem paga as mensagens do WhatsApp?",
    resposta:
      "Responder quem chamou a empresa não tem custo da Meta dentro de 24 horas. A Meta cobra pelas mensagens que a empresa inicia, como campanhas e lembretes, e esse valor é pago pela empresa direto à Meta, no cartão cadastrado, sem intermediação da TWR Tech.",
  },
  {
    pergunta: "O que está incluso e o que fica com a minha equipe?",
    resposta:
      "Incluso: a implantação com escopo escrito por plano (conexão do canal, mensagem automática de boas-vindas, equipe, horário, mensagens aprovadas pela Meta e, conforme o plano, funil e campanhas), o treinamento da equipe e o suporte pelo WhatsApp. O atendimento do dia a dia fica com a sua equipe: a TWR Tech não opera a central.",
  },
  {
    pergunta: "Tem fidelidade ou multa de cancelamento?",
    resposta:
      "No contrato mensal, não há fidelidade nem multa, e a implantação é paga inteira. No contrato de 12 meses, a implantação sai pela metade. Nos dois casos dá para mudar de plano quando a operação crescer.",
  },
  {
    pergunta: "Como funciona o diagnóstico gratuito?",
    resposta:
      "A TWR Tech faz o caminho de um cliente procurando a sua empresa no Google, no site e no Instagram e anota por onde dá para chamar. Você recebe uma página com o que mais pesa hoje e um ajuste simples que pode fazer sozinho. Não exige reunião nem acesso a nada, e é seu, contratando ou não.",
  },
  {
    pergunta: "Para que tipo de negócio o NexIAtend serve?",
    resposta:
      "Para negócios de serviço que vendem pelo WhatsApp e têm de 2 a 20 pessoas falando com clientes: clínicas de estética e terapias, imobiliárias, escolas de idiomas e cursos, produtoras e eventos, entre outros. Se mais de uma pessoa responde clientes, ou se o cliente encontra mais de um número para chamar, o NexIAtend se aplica.",
  },
];

// FAQ da página /maxialcance. As mesmas strings alimentam o JSON-LD FAQPage da
// página, então o texto visível e o estruturado nunca divergem.
export const faqMaxialcance: ItemFaq[] = [
  {
    pergunta: "O que é o MaxIAlcance?",
    resposta:
      "O MaxIAlcance é o serviço da TWR Tech que faz negócios locais serem encontrados por quem procura o serviço na cidade: no Google, no mapa e nas respostas de IAs como ChatGPT e Gemini. Inclui avaliação gratuita, perfil no Google completo, páginas por serviço e por região, site rápido no celular e acompanhamento mensal.",
  },
  {
    pergunta: "Qual a diferença entre SEO, AEO e GEO?",
    resposta:
      "SEO é aparecer nos resultados do Google. AEO é ter o site escolhido como resposta direta, como nas perguntas que o Google mostra em destaque. GEO é ser citado quando alguém pergunta a uma IA, como o ChatGPT, qual negócio ela recomenda. O MaxIAlcance trabalha os três juntos, porque as mesmas informações bem organizadas servem aos três.",
  },
  {
    pergunta: "Quanto custa o MaxIAlcance?",
    resposta:
      "A implantação começa em R$ 3.000. O valor final depende do número de serviços, das regiões atendidas e de ser preciso criar o site ou só otimizar o que já existe. O acompanhamento mensal custa R$ 300 e é recomendado por 6 a 12 meses. A avaliação inicial é gratuita.",
  },
  {
    pergunta: "Em quanto tempo aparecem resultados?",
    resposta:
      "Ajustes no perfil do Google, como categoria, telefone e horário, costumam ter efeito em semanas. Páginas novas e citações em IAs levam alguns meses para amadurecer, por isso o acompanhamento é recomendado por 6 a 12 meses. Nenhuma empresa séria garante posição no Google, e a TWR Tech também não garante.",
  },
  {
    pergunta: "Preciso ter um site para contratar?",
    resposta:
      "Não. Para quem não tem site, a TWR Tech cria um site novo, rápido no celular e já com uma página para cada serviço. Para quem tem site em WordPress, o trabalho é otimizar o que já existe. Nos dois casos, o perfil no Google entra no pacote.",
  },
  {
    pergunta: "Como funciona a avaliação gratuita?",
    resposta:
      "A TWR Tech avalia o perfil no Google, o site e as respostas do Google e do ChatGPT para a busca principal do seu serviço na sua cidade, com 15 critérios objetivos. Você recebe uma nota de 0 a 100 e os pontos que mais pesam, com a evidência de cada um. A avaliação é sua, contratando ou não.",
  },
  {
    pergunta: "Para que tipo de negócio o MaxIAlcance serve?",
    resposta:
      "Para negócios locais de serviço que dependem de indicação: clínicas e consultórios, locação para eventos, escritórios de contabilidade, restaurantes, cafés e docerias, entre outros. Se os seus clientes procuram o seu serviço pelo nome da cidade ou do bairro, o MaxIAlcance se aplica.",
  },
];
