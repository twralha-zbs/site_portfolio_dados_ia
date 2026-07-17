import { buscarPostsSubstack } from "@/lib/substack";
import { site } from "@/lib/site";

// Seção "Últimos artigos" da Home. Server component assíncrono: busca o RSS do
// Substack com revalidação horária; sem posts (feed novo, fora do ar ou
// inválido), cai no estado "em breve" sem quebrar a página.
export async function SubstackFeed() {
  const posts = await buscarPostsSubstack(3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Últimos artigos
        </h2>
        <a
          href={site.links.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-acento hover:underline"
        >
          Assine a newsletter {"↗︎"}
        </a>
      </div>

      {posts.length === 0 ? (
        <div className="mt-8 border-t border-linha pt-8">
          <p className="max-w-[60ch] text-suave">
            Os primeiros artigos estão a caminho: bastidores dos estudos de caso,
            tutoriais de Power BI e automação, e opinião sobre dados e IA para
            PMEs. Assine no Substack para receber quando saírem.
          </p>
        </div>
      ) : (
        <ul className="mt-8">
          {posts.map((post) => (
            <li key={post.url} className="border-t border-linha last:border-b">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
              >
                <span className="font-display text-lg font-bold group-hover:text-acento md:text-xl">
                  {post.titulo}
                </span>
                {post.dataFormatada && (
                  <time className="text-sm text-apagado">{post.dataFormatada}</time>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
