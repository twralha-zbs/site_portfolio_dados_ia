import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Rotas públicas do site. As páginas /bio/<slug> ficam de fora: são links de
// bio de redes sociais, não conteúdo para busca.
const rotas = ["", "/nexiatend", "/maxialcance", "/portfolio", "/projetos", "/sobre", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.map((rota) => ({
    url: `${site.urlProducao}${rota}`,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.8,
  }));
}
