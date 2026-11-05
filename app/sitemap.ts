import type { MetadataRoute } from "next";
import { listarArtigos } from "@/lib/blog";
import { site } from "@/lib/site";

// Rotas públicas do site com a data da última mudança de CONTEÚDO da página
// (texto, preço, contato). Ajuste visual, refatoração e metadados não contam:
// uma data inventada seria sinal falso de frescor para buscadores e IAs.
// Atualizar a data da rota ao fechar a sessão que mudou o texto dela.
// As páginas /bio/<slug> ficam de fora: são links de bio de redes sociais, não
// conteúdo para busca.
const rotas: { rota: string; atualizadoEm: string }[] = [
  { rota: "", atualizadoEm: "2026-11-05" },
  { rota: "/nexiatend", atualizadoEm: "2026-11-04" },
  { rota: "/maxialcance", atualizadoEm: "2026-11-04" },
  { rota: "/organizacao-de-dados", atualizadoEm: "2026-11-04" },
  { rota: "/portfolio", atualizadoEm: "2026-11-04" },
  { rota: "/projetos", atualizadoEm: "2026-11-04" },
  { rota: "/sobre", atualizadoEm: "2026-11-04" },
  { rota: "/contato", atualizadoEm: "2026-11-04" },
  { rota: "/blog", atualizadoEm: "2026-11-04" },
  { rota: "/clareia", atualizadoEm: "2026-11-05" },
  { rota: "/privacidade", atualizadoEm: "2026-11-05" },
];

// Artigos do blog entram sozinhos, com a data `atualizado` do frontmatter;
// os de data futura ficam de fora (listarArtigos já filtra).
export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = rotas.map(({ rota, atualizadoEm }) => ({
    url: `${site.urlProducao}${rota}`,
    lastModified: atualizadoEm,
  }));
  const artigos = listarArtigos().map((artigo) => ({
    url: `${site.urlProducao}/blog/${artigo.slug}`,
    lastModified: artigo.atualizado,
  }));
  return [...paginas, ...artigos];
}
