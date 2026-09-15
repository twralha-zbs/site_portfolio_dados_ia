import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.marca} · ${site.nome}`,
    short_name: site.marca,
    description: site.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#15171b",
    theme_color: "#15171b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
