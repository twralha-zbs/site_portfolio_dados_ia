// Dados estruturados (JSON-LD) compartilhados. Organization e Person ficam no
// layout raiz e as demais páginas referenciam as entidades por @id, em vez de
// repetir o objeto (PLANO_PROJETO.md §6.2). Tudo vem de lib/site.ts.
import { site } from "@/lib/site";
import type { ItemFaq } from "@/lib/faq";

const idOrganizacao = `${site.urlProducao}/#organizacao`;
const idPessoa = `${site.urlProducao}/#thiago`;

const sameAs = [site.links.linkedin, site.links.github, site.links.substack];

export const organizacao = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": idOrganizacao,
  name: site.marca,
  legalName: site.razaoSocial,
  url: site.urlProducao,
  logo: `${site.urlProducao}/icon-512.png`,
  email: site.email,
  founder: { "@id": idPessoa },
  areaServed: { "@type": "Country", name: "Brasil" },
  sameAs,
};

export const pessoa = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": idPessoa,
  name: site.nome,
  jobTitle: "Fundador da TWR Tech",
  url: `${site.urlProducao}/sobre`,
  image: `${site.urlProducao}/thiago-ralha.jpg`,
  worksFor: { "@id": idOrganizacao },
  alumniOf: "Escola Politécnica da USP",
  knowsAbout: [
    "Power BI",
    "Power Platform",
    "Python",
    "Automação de processos",
    "IA aplicada a negócios",
    "Atendimento no WhatsApp",
  ],
  sameAs,
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.urlProducao}/#site`,
  name: site.marca,
  url: site.urlProducao,
  inLanguage: "pt-BR",
  publisher: { "@id": idOrganizacao },
};

// Question.name e Answer.text saem das mesmas strings que a FaqSection exibe.
export function faqPage(itens: ItemFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}
