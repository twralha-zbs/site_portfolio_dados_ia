// Dados estruturados (JSON-LD) compartilhados. Organization e Person ficam no
// layout raiz e as demais páginas referenciam as entidades por @id, em vez de
// repetir o objeto (PLANO_PROJETO.md §6.2). Tudo vem de lib/site.ts.
import { site } from "@/lib/site";
import type { ItemFaq } from "@/lib/faq";

export const idOrganizacao = `${site.urlProducao}/#organizacao`;
export const idPessoa = `${site.urlProducao}/#thiago`;

const sameAs = [site.links.linkedin, site.links.github];
// O Instagram @twrtech é perfil da empresa: só na Organization.
const sameAsOrganizacao = [...sameAs, site.links.instagram];

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
  sameAs: sameAsOrganizacao,
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

// Trilha de navegação. `itens` em ordem, com rota relativa ("/blog").
export function breadcrumb(itens: { nome: string; rota: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: `${site.urlProducao}${item.rota}`,
    })),
  };
}

type DadosPost = {
  titulo: string;
  descricao: string;
  slug: string;
  publicado: string;
  atualizado: string;
};

const urlPost = (slug: string) => `${site.urlProducao}/blog/${slug}`;

// Artigo do blog. Autor e publisher referenciam Person e Organization do
// layout raiz por @id, sem duplicar os objetos.
export function blogPosting(post: DadosPost) {
  const url = urlPost(post.slug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.descricao,
    datePublished: post.publicado,
    dateModified: post.atualizado,
    author: { "@id": idPessoa },
    publisher: { "@id": idOrganizacao },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${url}/imagem-og`,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.urlProducao}/blog#blog` },
  };
}

// Listagem /blog.
export function blogLista(posts: DadosPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.urlProducao}/blog#blog`,
    name: `Blog da ${site.marca}`,
    url: `${site.urlProducao}/blog`,
    inLanguage: "pt-BR",
    author: { "@id": idPessoa },
    publisher: { "@id": idOrganizacao },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.titulo,
      description: post.descricao,
      url: urlPost(post.slug),
      datePublished: post.publicado,
      dateModified: post.atualizado,
      author: { "@id": idPessoa },
    })),
  };
}
