// Fonte única das ofertas de serviço. Home e (na oferta de entrada) a página
// /atendimento-whatsapp consomem daqui — mesma disciplina de lib/faq.ts.

import { site } from "@/lib/site";

export type Oferta = {
  titulo: string;
  formato: string;
  descricao: string;
  ctaRotulo: string;
  href: string;
  externo: boolean;
  destaque?: boolean;
};

export const ofertaEntrada: Oferta = {
  titulo: "Atendimento, CRM e IA no WhatsApp",
  formato: "Porta de entrada · plataforma white label sob a marca TWR",
  descricao:
    "Central de atendimento, funil de vendas em CRM, automação e agentes de IA num único ambiente conectado ao WhatsApp. Eu implanto, configuro e opero para você.",
  ctaRotulo: "Conhecer a plataforma",
  href: "/atendimento-whatsapp",
  externo: false,
  destaque: true,
};

export const ofertas: Oferta[] = [
  {
    titulo: "Diagnóstico de Dados & BI",
    formato: "Oferta de entrada · escopo fixo · valor sob consulta",
    descricao:
      "Um raio-x das suas fontes, indicadores e prioridades, com um plano do que construir primeiro. Poucos dias, e você já sai sabendo o caminho.",
    ctaRotulo: "Agendar diagnóstico",
    href: site.links.agenda,
    externo: true,
  },
  {
    titulo: "Construção de dashboards & relatórios",
    formato: "Por projeto · valor sob consulta",
    descricao:
      "Do dado disperso a um painel Power BI que a diretoria abre e confia: modelagem de dados, DAX e design pensado para leitura executiva.",
    ctaRotulo: "Conversar sobre um projeto",
    href: "/contato",
    externo: false,
  },
  {
    titulo: "Automação de fluxos",
    formato: "Por projeto · valor sob consulta",
    descricao:
      "Power Automate e Python eliminando o trabalho repetitivo entre sistemas, planilhas e e-mail. Rotinas e alertas que rodam sozinhos.",
    ctaRotulo: "Conversar sobre um projeto",
    href: "/contato",
    externo: false,
  },
  {
    titulo: "IA aplicada a negócios",
    formato: "Por projeto · valor sob consulta",
    descricao:
      "Resumos executivos, alertas e análises em linguagem natural, gerados em cima dos seus dados reais e prontos para a decisão.",
    ctaRotulo: "Conversar sobre um projeto",
    href: "/contato",
    externo: false,
  },
];
