import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/FaqSection";
import { InscricaoClareia } from "@/components/InscricaoClareia";
import { JsonLd } from "@/components/JsonLd";
import { CtaWhatsappBlog } from "@/components/blog/CtaWhatsappBlog";
import {
  artigosRelacionados,
  buscarArtigo,
  formatarData,
  listarArtigos,
  produtosLinkaveis,
} from "@/lib/blog";
import { artigoMeta } from "@/lib/metadata";
import { blogPosting, breadcrumb, faqPage } from "@/lib/schema";
import fotoThiago from "@/public/thiago-ralha.jpg";

type Params = { params: Promise<{ slug: string }> };

// Só os artigos publicados existem; qualquer outro slug é 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return listarArtigos().map((artigo) => ({ slug: artigo.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  return artigo ? artigoMeta(artigo) : {};
}

export default async function ArtigoPage({ params }: Params) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) notFound();

  const relacionados = artigosRelacionados(artigo);
  const foiAtualizado = artigo.atualizado !== artigo.publicado;

  const dadosEstruturados: object[] = [
    blogPosting(artigo),
    breadcrumb([
      { nome: "Início", rota: "/" },
      { nome: "Blog", rota: "/blog" },
      { nome: artigo.titulo, rota: `/blog/${artigo.slug}` },
    ]),
  ];
  if (artigo.faq.length > 0) dadosEstruturados.push(faqPage(artigo.faq));

  return (
    <article className="mx-auto max-w-3xl px-6 pb-20 pt-12 md:px-8 md:pt-20">
      <JsonLd dados={dadosEstruturados} />

      <header>
        <Link
          href={`/blog?tema=${artigo.temaSlug}`}
          className="-my-3 inline-flex min-h-11 items-center font-mono text-xs text-acento hover:underline md:text-sm"
        >
          {artigo.tema}
        </Link>
        <h1 className="font-display mt-4 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight md:text-5xl">
          {artigo.titulo}
        </h1>
        <p className="mt-5 text-sm text-apagado">
          Por <span className="text-suave">Thiago Waldowski Ralha</span>
          <span className="font-mono text-xs md:text-[0.8rem]">
            {" "}·{" "}
          <time dateTime={artigo.publicado}>{formatarData(artigo.publicado)}</time>
          {foiAtualizado && (
            <>
              {" "}
              · atualizado em{" "}
              <time dateTime={artigo.atualizado}>{formatarData(artigo.atualizado)}</time>
            </>
          )}{" "}
          · {artigo.minutosLeitura} min de leitura
          </span>
        </p>
      </header>

      <div
        className="prosa mt-10"
        dangerouslySetInnerHTML={{ __html: artigo.html }}
      />

      {artigo.faq.length > 0 && (
        <FaqSection itens={artigo.faq} className="mt-14" />
      )}

      <div className="mt-14 flex flex-col gap-6">
        <CtaWhatsappBlog cta={artigo.cta} slug={artigo.slug} />
        <InscricaoClareia />
      </div>

      <footer className="mt-14 border-t border-linha pt-10">
        <div className="flex items-start gap-4">
          <Image
            src={fotoThiago}
            alt="Thiago Waldowski Ralha"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="font-display text-lg font-bold">Thiago Waldowski Ralha</p>
            <p className="mt-1 text-sm leading-relaxed text-suave">
              Fundador da TWR Tech, engenheiro pela Poli-USP. Há mais de 7 anos
              ajuda empresas a organizar a operação para enxergar os processos e
              ter controle do negócio.
            </p>
            <Link href="/sobre" className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-acento hover:underline">
              Sobre o Thiago →
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-apagado">Conheça também</p>
        <Link
          href={artigo.produtoLinkado}
          className="mt-1 inline-block py-1 font-display text-lg font-bold underline decoration-linha decoration-2 underline-offset-4 transition-colors hover:decoration-acento"
        >
          {produtosLinkaveis[artigo.produtoLinkado]} →
        </Link>

        {relacionados.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Leia também</h2>
            <ul className="mt-4">
              {relacionados.map((outro) => (
                <li key={outro.slug} className="border-t border-linha last:border-b">
                  <Link
                    href={`/blog/${outro.slug}`}
                    className="group block py-4"
                  >
                    <span className="font-display text-lg font-bold group-hover:text-acento">
                      {outro.titulo}
                    </span>
                    <span className="mt-1 block text-sm text-suave">{outro.descricao}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </footer>
    </article>
  );
}
