import type { Metadata } from "next";

// Imagem de compartilhamento gerada por app/opengraph-image.tsx. O Next só a
// anexa sozinho quando a página não declara openGraph; como todas declaram,
// ela entra aqui de forma explícita.
export const imagemOg = [
  { url: "/opengraph-image", width: 1200, height: 630, alt: "TWR Tech" },
];

// Metadata de página com canonical e Open Graph. O Next substitui o objeto
// openGraph inteiro (não mescla campo a campo com o layout), então cada página
// declara o seu: sem isso, o og:title e o og:url da Home vazariam para todas
// as rotas.
export function paginaMeta(
  rota: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: rota },
    openGraph: { url: rota, title, description, images: imagemOg },
  };
}

// Metadata do artigo do blog. O title é `absolute`: o template "%s · TWR Tech"
// do layout estouraria o limite de 60 caracteres. A imagem OG vem do
// app/(site)/blog/[slug]/imagem-og/route.tsx.
export function artigoMeta(artigo: {
  slug: string;
  titulo: string;
  descricao: string;
  publicado: string;
  atualizado: string;
}): Metadata {
  const rota = `/blog/${artigo.slug}`;
  const imagens = [
    { url: `${rota}/imagem-og`, width: 1200, height: 630, alt: artigo.titulo },
  ];
  return {
    title: { absolute: artigo.titulo },
    description: artigo.descricao,
    alternates: { canonical: rota },
    authors: [{ name: "Thiago Waldowski Ralha", url: "/sobre" }],
    openGraph: {
      type: "article",
      url: rota,
      title: artigo.titulo,
      description: artigo.descricao,
      publishedTime: artigo.publicado,
      modifiedTime: artigo.atualizado,
      authors: ["Thiago Waldowski Ralha"],
      images: imagens,
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.titulo,
      description: artigo.descricao,
      images: imagens,
    },
  };
}
