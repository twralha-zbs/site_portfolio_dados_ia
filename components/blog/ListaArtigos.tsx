"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Dados do item, já serializáveis (vêm do server component /blog).
export type CardArtigo = {
  slug: string;
  titulo: string;
  descricao: string;
  tema: string;
  temaSlug: string;
  publicado: string;
  dataFormatada: string;
};

type Tema = { rotulo: string; slug: string };

type Props = {
  artigos: CardArtigo[];
  temas: readonly Tema[];
};

// Filtro: pílula com no mínimo 44px de altura (alvo de toque no celular).
const estiloChip =
  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors";

// Lista editorial com divisores de 1px, o mesmo padrão da FAQ e dos "Últimos
// artigos" da Home (DESIGN.md: sem cards para listas). Sem filtro, é o HTML
// estático da página (fallback do Suspense), lido por buscadores e por quem
// está sem JavaScript.
export function ListaArtigos({
  artigos,
  temas,
  temaAtivo = null,
}: Props & { temaAtivo?: string | null }) {
  const visiveis = temaAtivo
    ? artigos.filter((artigo) => artigo.temaSlug === temaAtivo)
    : artigos;
  const rotuloAtivo = temas.find((tema) => tema.slug === temaAtivo)?.rotulo;

  return (
    <>
      <nav aria-label="Filtrar por tema" className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          scroll={false}
          aria-current={temaAtivo === null ? "true" : undefined}
          className={`${estiloChip} ${
            temaAtivo === null
              ? "border-texto text-texto"
              : "border-linha text-suave hover:text-texto"
          }`}
        >
          Todos
        </Link>
        {temas.map((tema) => (
          <Link
            key={tema.slug}
            href={`/blog?tema=${tema.slug}`}
            scroll={false}
            aria-current={temaAtivo === tema.slug ? "true" : undefined}
            className={`${estiloChip} ${
              temaAtivo === tema.slug
                ? "border-texto text-texto"
                : "border-linha text-suave hover:text-texto"
            }`}
          >
            {tema.rotulo}
          </Link>
        ))}
      </nav>

      <p aria-live="polite" className="mt-8 font-mono text-xs text-apagado md:text-sm">
        {visiveis.length === 1 ? "1 artigo" : `${visiveis.length} artigos`}
        {rotuloAtivo ? ` em ${rotuloAtivo}` : ""}
      </p>

      {visiveis.length === 0 ? (
        <p className="mt-4 text-suave">
          Ainda não há artigo neste tema.{" "}
          <Link href="/blog" scroll={false} className="font-semibold text-acento hover:underline">
            Ver todos os artigos
          </Link>
        </p>
      ) : (
        <ul className="mt-4 border-t border-linha">
          {visiveis.map((artigo) => (
            <li key={artigo.slug} className="border-b border-linha">
              <Link
                href={`/blog/${artigo.slug}`}
                className="group grid gap-x-10 gap-y-2 py-7 md:grid-cols-[11rem_1fr]"
              >
                <p className="font-mono text-xs leading-relaxed text-apagado md:pt-1.5 md:text-sm">
                  <time dateTime={artigo.publicado}>{artigo.dataFormatada}</time>
                  <span className="block">{artigo.tema}</span>
                </p>
                <div>
                  <h2 className="font-display text-xl font-extrabold leading-tight tracking-tight transition-colors group-hover:text-acento md:text-2xl">
                    {artigo.titulo}
                  </h2>
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-suave">
                    {artigo.descricao}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// Lê ?tema= da URL e filtra no navegador (a página é estática).
export function ListaArtigosFiltrada(props: Props) {
  const parametro = useSearchParams().get("tema");
  const temaAtivo = props.temas.some((tema) => tema.slug === parametro)
    ? parametro
    : null;
  return <ListaArtigos {...props} temaAtivo={temaAtivo} />;
}
