import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { InscricaoClareia } from "@/components/InscricaoClareia";
import { CtaWhatsappBlog } from "@/components/blog/CtaWhatsappBlog";
import {
  ListaArtigos,
  ListaArtigosFiltrada,
  type CardArtigo,
} from "@/components/blog/ListaArtigos";
import { Rotulo } from "@/components/ui/rotulo";
import { formatarData, listarArtigos, temas } from "@/lib/blog";
import { paginaMeta } from "@/lib/metadata";
import { blogLista, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  ...paginaMeta(
    "/blog",
    "Blog sobre atendimento, dados e Google",
    "Artigos para quem toca um negócio: atendimento no WhatsApp, dados e processos, e como ser encontrado no Google e nas IAs. Respostas diretas, sem jargão.",
  ),
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
};

export default function BlogPage() {
  const artigos = listarArtigos();
  const cards: CardArtigo[] = artigos.map((artigo) => ({
    slug: artigo.slug,
    titulo: artigo.titulo,
    descricao: artigo.descricao,
    tema: artigo.tema,
    temaSlug: artigo.temaSlug,
    publicado: artigo.publicado,
    dataFormatada: formatarData(artigo.publicado),
  }));

  return (
    <>
      <JsonLd
        dados={[
          blogLista(artigos),
          breadcrumb([
            { nome: "Início", rota: "/" },
            { nome: "Blog", rota: "/blog" },
          ]),
        ]}
      />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:px-8 md:pt-24">
        <Rotulo>{"// blog"}</Rotulo>
        <h1 className="font-display mt-4 max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          Atendimento, dados e presença no Google, sem enrolação
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-suave">
          Respostas diretas para as perguntas de quem toca um negócio. Um
          artigo novo por semana, escrito por Thiago Waldowski Ralha.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
        {cards.length === 0 ? (
          <div className="max-w-3xl">
            <p className="text-lg text-suave">
              O primeiro artigo sai em breve. Assine a ClareIA para saber
              quando ele chegar.
            </p>
            <div className="mt-8">
              <InscricaoClareia />
            </div>
          </div>
        ) : (
          <Suspense fallback={<ListaArtigos artigos={cards} temas={temas} />}>
            <ListaArtigosFiltrada artigos={cards} temas={temas} />
          </Suspense>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8 md:pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <CtaWhatsappBlog />
          {cards.length > 0 && <InscricaoClareia />}
        </div>
      </section>
    </>
  );
}
