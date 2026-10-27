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
    pergunta: "Qual produto serve para o meu caso?",
    resposta:
      "Depende da dor. O NexIAtend serve para quem atende clientes pelo WhatsApp com mais de uma pessoa. O MaxIAlcance serve para quem vive de indicação e quer ser encontrado no Google e nas IAs. O DataConsult serve para quem tem números que não batem entre ERP e planilhas. Uma conversa de 30 minutos costuma bastar para escolher.",
  },
  {
    pergunta: "Preciso contratar os três?",
    resposta:
      "Não. Cada produto funciona sozinho e tem a sua própria porta de entrada. O caminho mais natural é começar pelo atendimento e, quando ele estiver organizado, avançar para a presença no Google ou para painéis de dados sobre o que o atendimento gera.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "O NexIAtend tem planos a partir de R$ 437 por mês, mais a implantação. No MaxIAlcance, a implantação começa em R$ 3.500, com acompanhamento de R$ 500 por mês. O DataConsult é por projeto, com valor informado depois da conversa ou do diagnóstico. Os três começam sem custo: diagnóstico, avaliação ou conversa.",
  },
  {
    pergunta: "Como começa um projeto?",
    resposta:
      "Começa de graça: um diagnóstico de atendimento no NexIAtend, uma avaliação da presença no MaxIAlcance ou uma conversa de 30 minutos no DataConsult. Você descreve a dor, a TWR Tech aponta se e como dá para resolver, e só depois vem a proposta. Você pode agendar direto pelo site.",
  },
  {
    pergunta: "Onde vocês atendem?",
    resposta:
      "A TWR Tech atende de São Paulo, remotamente, empresas de todo o Brasil, de capitais como São Paulo, Rio de Janeiro, Belo Horizonte e Curitiba ao interior. Implantação, reuniões, entregas e suporte funcionam à distância, e há visita presencial pontual em São Paulo e no ABC paulista quando o projeto pede.",
  },
  {
    pergunta: "O que a TWR Tech não faz?",
    resposta:
      "Não promete resultado, como posição garantida no Google ou número de vendas. Também não opera o atendimento da sua empresa: implanta, treina e dá suporte, e a sua equipe atende. E os estudos de caso do portfólio são demonstrativos, com empresas fictícias e dados sintéticos.",
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
      "Os planos começam em R$ 437 por mês para até 3 pessoas atendendo em um canal. O plano Vendas custa R$ 717, o Equipe R$ 1.207 e o IA R$ 2.197. A implantação é paga uma vez, a partir de R$ 767, e pode ser parcelada em até 3x no contrato de 12 meses, que tem 1 mês de mensalidade grátis. As mensagens cobradas pela Meta são pagas direto à Meta.",
  },
  {
    pergunta: "Preciso trocar o número ou parar de usar o WhatsApp no celular?",
    resposta:
      "Não. A conexão pela WhatsApp Business Platform (API) pode manter o número atual e o aplicativo no celular funcionando junto com a central. A TWR Tech faz essa conexão na implantação. Para isso, a empresa precisa de CNPJ, de uma conta da Meta com cartão e de um site com o CNPJ no rodapé.",
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
      "No contrato mensal, não há fidelidade nem multa, e a implantação é paga à vista. No contrato de 12 meses, há 1 mês de mensalidade grátis e a implantação pode ser parcelada em até 3x. Nos dois casos dá para mudar de plano quando a operação crescer.",
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
      "A implantação começa em R$ 3.500. O valor final depende do número de serviços, das regiões atendidas e de ser preciso criar o site ou só otimizar o que já existe. O acompanhamento mensal custa R$ 500 e é recomendado por 6 a 12 meses. A avaliação inicial é gratuita.",
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

// FAQ da página /organizacao-de-dados (DataConsult). As mesmas strings alimentam
// o JSON-LD FAQPage da página, então o texto visível e o estruturado nunca
// divergem.
export const faqDataconsult: ItemFaq[] = [
  {
    pergunta: "O que é o DataConsult?",
    resposta:
      "O DataConsult é a consultoria da TWR Tech para organizar os dados e os processos de uma empresa. A TWR Tech mapeia as fontes, os processos e os fluxos de dados, propõe o que melhorar e constrói as ferramentas que organizam e automatizam a operação: pipelines em Python, painéis em Power BI, rotinas em Power Automate e, quando faz sentido, IA aplicada.",
  },
  {
    pergunta: "Como começa um projeto?",
    resposta:
      "Começa por uma conversa de 30 minutos, em que você descreve a dor de hoje e a TWR Tech aponta se e como dá para resolver. Se fizer sentido, o passo seguinte é um diagnóstico de escopo fixo, que costuma levar poucos dias e termina num plano do que construir primeiro. Só depois disso vem a proposta do projeto.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "Não há tabela de preços, porque cada projeto é dimensionado pelo problema: número de fontes, de áreas e de rotinas envolvidas. O valor é informado depois da conversa ou do diagnóstico, por projeto, com o escopo escrito. Nada é cobrado pela conversa inicial.",
  },
  {
    pergunta: "Funciona com o meu ERP e as minhas planilhas?",
    resposta:
      "Sim. O trabalho parte de onde a informação vive hoje: ERP, CRM, bancos SQL, APIs e planilhas de Excel. Onde não há conexão direta, um pipeline em Python trata e padroniza os dados antes de carregar. As licenças das ferramentas Microsoft, quando necessárias, são informadas na proposta.",
  },
  {
    pergunta: "Quem mantém tudo depois que o projeto termina?",
    resposta:
      "A sua equipe. A TWR Tech implanta, documenta e ensina a usar, com ferramentas padrão de mercado (Power BI, Power Automate e Python), sem sistema proprietário que prenda a empresa a um fornecedor. Se quiser acompanhamento depois, ele é combinado à parte.",
  },
  {
    pergunta: "Para que tipo de empresa serve?",
    resposta:
      "Para pequenas e médias empresas com dados espalhados entre ERP, planilhas e sistemas que não conversam, e números que mudam de uma área para outra: atacado e distribuição, varejo, indústria e serviços. Se o fechamento do mês vira discussão sobre qual número está certo, o DataConsult se aplica.",
  },
];
