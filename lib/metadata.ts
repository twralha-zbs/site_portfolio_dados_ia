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
