import { listarArtigos } from "@/lib/blog";
import { site } from "@/lib/site";

// RSS 2.0 do blog, gerado no build com os artigos publicados.
export const dynamic = "force-static";

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Meio-dia em São Paulo, para a data não "voltar" um dia em leitores de RSS.
const dataRss = (iso: string) => new Date(`${iso}T12:00:00-03:00`).toUTCString();

export function GET() {
  const artigos = listarArtigos();
  const urlBlog = `${site.urlProducao}/blog`;

  const itens = artigos
    .map((artigo) => {
      const url = `${urlBlog}/${artigo.slug}`;
      return `    <item>
      <title>${escapar(artigo.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapar(artigo.descricao)}</description>
      <category>${escapar(artigo.tema)}</category>
      <pubDate>${dataRss(artigo.publicado)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog da ${escapar(site.marca)}</title>
    <link>${urlBlog}</link>
    <description>Atendimento, dados e presença no Google, para quem toca um negócio.</description>
    <language>pt-BR</language>
    <atom:link href="${urlBlog}/feed.xml" rel="self" type="application/rss+xml" />
${artigos.length > 0 ? `    <lastBuildDate>${dataRss(artigos[0].atualizado)}</lastBuildDate>\n` : ""}${itens}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
