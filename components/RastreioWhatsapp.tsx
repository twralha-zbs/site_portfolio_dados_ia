"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { origemDoLink } from "@/lib/whatsapp";

// Mede TODO clique em link de WhatsApp (https://wa.me/...) do site, das bios e
// do blog, sem precisar trocar cada <a>: um ouvinte só no documento. Evento
// "WhatsApp Click" com a origem da porta única (lida da frase pronta do
// link), a página e, quando o link tiver, data-slug e data-cta (artigos).
export function RastreioWhatsapp() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;
      const link = alvo.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!link) return;
      track("WhatsApp Click", {
        origem: origemDoLink(link.href),
        pagina: window.location.pathname,
        slug: link.dataset.slug ?? null,
        cta: link.dataset.cta ?? null,
      });
    }
    document.addEventListener("click", aoClicar, { capture: true });
    return () => document.removeEventListener("click", aoClicar, { capture: true });
  }, []);

  return null;
}
