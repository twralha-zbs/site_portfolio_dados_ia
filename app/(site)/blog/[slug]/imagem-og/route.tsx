import { ImageResponse } from "next/og";
import { buscarArtigo, listarArtigos } from "@/lib/blog";
import { site } from "@/lib/site";

const size = { width: 1200, height: 630 };

// Gerada no build, uma por artigo. Route handler (e não opengraph-image.tsx)
// para a URL ser estável, /blog/<slug>/imagem-og: a convenção de arquivo põe
// um hash no caminho em rota dinâmica, e o JSON-LD precisa da URL exata.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return listarArtigos().map((artigo) => ({ slug: artigo.slug }));
}

// Imagem de compartilhamento de cada artigo: tema e título no mesmo visual de
// app/opengraph-image.tsx (Fundo, Texto, Suave e Acento do DESIGN.md).
export async function GET(
  _requisicao: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  const titulo = artigo?.titulo ?? `Blog da ${site.marca}`;
  const tamanhoTitulo = titulo.length > 45 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15171B",
          padding: 72,
          color: "#E5E8EC",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#52AFE7" }}>
          {artigo ? `Blog · ${artigo.tema}` : "Blog"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: tamanhoTitulo,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
          }}
        >
          {titulo}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#A0A5AB" }}>
          {`${site.marca} · ${site.nome}`}
        </div>
      </div>
    ),
    size,
  );
}
