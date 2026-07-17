import { site } from "./site";

export type PostSubstack = {
  titulo: string;
  url: string;
  dataFormatada: string | null;
};

function extrairTag(bloco: string, tag: string): string {
  const m = bloco.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  return m[1].replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim();
}

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Busca os últimos posts do feed RSS do Substack. Qualquer falha (rede, feed
// fora do ar, XML inesperado) retorna lista vazia: quem consome decide o
// fallback, e a Home nunca quebra por causa do feed.
export async function buscarPostsSubstack(limite = 3): Promise<PostSubstack[]> {
  try {
    const resposta = await fetch(site.links.substackFeed, {
      next: { revalidate: 3600 },
    });
    if (!resposta.ok) return [];
    const xml = await resposta.text();

    return xml
      .split(/<item>/i)
      .slice(1, limite + 1)
      .map((bloco) => {
        const titulo = extrairTag(bloco, "title");
        const url = extrairTag(bloco, "link");
        const pubDate = extrairTag(bloco, "pubDate");
        const data = pubDate ? new Date(pubDate) : null;
        return {
          titulo,
          url,
          dataFormatada:
            data && !Number.isNaN(data.getTime()) ? formatoData.format(data) : null,
        };
      })
      .filter((post) => post.titulo !== "" && post.url.startsWith("http"));
  } catch {
    return [];
  }
}
