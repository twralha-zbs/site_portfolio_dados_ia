import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { imagemOg } from "@/lib/metadata";
import { organizacao, pessoa, website } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.urlProducao),
  title: {
    default: site.titulo,
    template: `%s · ${site.marca}`,
  },
  description: `${site.headline}. ${site.subheadline}`,
  openGraph: { type: "website", siteName: site.marca, locale: "pt_BR" },
  twitter: { card: "summary_large_image", images: imagemOg },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bricolage.variable} ${onest.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <JsonLd dados={[organizacao, pessoa, website]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
