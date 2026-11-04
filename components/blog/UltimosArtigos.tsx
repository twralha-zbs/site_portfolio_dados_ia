import Link from "next/link";
import { InscricaoClareia } from "@/components/InscricaoClareia";
import { formatarData, listarArtigos } from "@/lib/blog";

// Seção da Home: os 3 artigos mais recentes do blog. Enquanto não houver
// artigo publicado, mostra a inscrição na ClareIA no lugar.
export function UltimosArtigos() {
  const artigos = listarArtigos().slice(0, 3);

  if (artigos.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-8">
        <InscricaoClareia />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Últimos artigos
        </h2>
        <Link href="/blog" className="font-semibold text-acento hover:underline">
          Ver o blog →
        </Link>
      </div>

      <ul className="mt-8">
        {artigos.map((artigo) => (
          <li key={artigo.slug} className="border-t border-linha last:border-b">
            <Link
              href={`/blog/${artigo.slug}`}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
            >
              <span className="font-display text-lg font-bold group-hover:text-acento md:text-xl">
                {artigo.titulo}
              </span>
              <time dateTime={artigo.publicado} className="font-mono text-xs text-apagado md:text-sm">
                {formatarData(artigo.publicado)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
