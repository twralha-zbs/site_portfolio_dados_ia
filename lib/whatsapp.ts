// Origem do clique de WhatsApp para o Vercel Analytics, lida da própria frase
// pronta do link da porta única ("Oi, Thiago! Vim pelo blog."). Assim a origem
// medida nunca diverge da origem que o chatbot registra.
export type OrigemWhatsapp = "site" | "blog" | "instagram" | "newsletter" | "outro";

const mapa: Record<string, OrigemWhatsapp> = {
  site: "site",
  blog: "blog",
  instagram: "instagram",
  clareia: "newsletter",
};

export function origemDoLink(href: string): OrigemWhatsapp {
  let textoLink = href;
  try {
    textoLink = decodeURIComponent(href);
  } catch {
    // href malformado: segue com o texto cru
  }
  const m = textoLink.match(/Vim pel[oa] ([A-Za-zÀ-ú]+)/i);
  return (m && mapa[m[1].toLowerCase()]) || "outro";
}
