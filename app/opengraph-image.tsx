import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.marca}: ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem de compartilhamento padrão (WhatsApp, LinkedIn, Slack). Cores do
// DESIGN.md: Fundo, Texto, Suave e Acento. Fonte do sistema: sem rede no build.
export default function OpengraphImage() {
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
        <div style={{ display: "flex", fontSize: 32, color: "#A0A5AB" }}>
          {site.marca}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
          }}
        >
          <span>Conversas, presença e dados</span>
          <span>
            da sua empresa&nbsp;
            <span style={{ color: "#52AFE7" }}>organizados.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#A0A5AB" }}>
          NexIAtend · MaxIAlcance · DataConsult
        </div>
      </div>
    ),
    size,
  );
}
