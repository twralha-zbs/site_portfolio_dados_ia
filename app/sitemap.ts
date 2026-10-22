import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Rotas públicas do site com a data da última mudança de CONTEÚDO da página
// (texto, preço, contato). Ajuste visual, refatoração e metadados não contam:
// uma data inventada seria sinal falso de frescor para buscadores e IAs.
// Atualizar a data da rota ao fechar a sessão que mudou o texto dela.
// As páginas /bio/<slug> ficam de fora: são links de bio de redes sociais, não
// conteúdo para busca.
const rotas: { rota: string; atualizadoEm: string }[] = [
  { rota: "", atualizadoEm: "2026-10-21" },
  { rota: "/nexiatend", atualizadoEm: "2026-10-21" },
  { rota: "/maxialcance", atualizadoEm: "2026-10-21" },
  { rota: "/organizacao-de-dados", atualizadoEm: "2026-10-21" },
  { rota: "/portfolio", atualizadoEm: "2026-09-15" },
  { rota: "/projetos", atualizadoEm: "2026-09-15" },
  { rota: "/sobre", atualizadoEm: "2026-09-15" },
  { rota: "/contato", atualizadoEm: "2026-10-03" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.map(({ rota, atualizadoEm }) => ({
    url: `${site.urlProducao}${rota}`,
    lastModified: atualizadoEm,
  }));
}
