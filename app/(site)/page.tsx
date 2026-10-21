import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { SubstackFeed } from "@/components/SubstackFeed";
import { FaqSection } from "@/components/FaqSection";
import { ProdutoBloco } from "@/components/ProdutoBloco";
import { VisualDados, VisualPresenca } from "@/components/VisuaisProduto";
import { VisualNexiatend } from "@/components/VisualNexiatend";
import { Hero } from "@/components/ui/hero";
import { Rotulo } from "@/components/ui/rotulo";
import { imagemOg } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { faqHome } from "@/lib/faq";
import { faqPage } from "@/lib/schema";
import { site } from "@/lib/site";
import { produtos } from "@/lib/servicos";
import { casesDemonstrativos } from "@/lib/cases";
import fotoThiago from "@/public/thiago-ralha.jpg";

const descricao = `${site.headline}. ${site.subheadline}`;

// Sem `title`: a Home usa o title.default do layout (o template "%s · TWR Tech"
// duplicaria a marca).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: site.titulo,
    description: descricao,
    images: imagemOg,
  },
};

// Visual de cada produto, pelo slug de lib/servicos.ts.
const visuais: Record<string, React.ReactNode> = {
  nexiatend: <VisualNexiatend />,
  maxialcance: <VisualPresenca />,
  "organizacao-de-dados": <VisualDados />,
};

export default function Home() {
  return (
    <>
      <JsonLd dados={faqPage(faqHome)} />
      <Hero
        titulo={
          <>
            Conversas, presença e dados da sua empresa{" "}
            <span className="text-acento">organizados.</span>
          </>
        }
        subtitulo={site.subheadline}
        ctas={{
          primario: { rotulo: "Conhecer os produtos", href: "#produtos" },
          secundario: { rotulo: "Fale conosco", href: "/contato" },
        }}
      >
        <nav aria-label="Atalhos por dor" className="mx-auto max-w-4xl text-left">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
            {produtos.map((produto, i) => (
              <li key={produto.slug} className="border-t border-linha pt-4">
                <a
                  href={`#${produto.slug}`}
                  className="group block py-1"
                >
                  <span className="font-mono text-xs text-apagado">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-display text-lg font-extrabold tracking-tight">
                    {produto.atalho}
                  </span>
                  <span className="mt-1 block text-sm text-suave group-hover:text-texto">
                    {produto.nome} {"→"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Hero>

      <section
        id="produtos"
        className="mx-auto max-w-6xl scroll-mt-20 space-y-20 px-6 py-16 md:space-y-28 md:px-8 md:py-24"
      >
        <h2 className="sr-only">Produtos da TWR Tech</h2>
        {produtos.map((produto, i) => (
          <ProdutoBloco
            key={produto.slug}
            produto={produto}
            visual={visuais[produto.slug]}
            invertido={i % 2 === 1}
          />
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4 md:px-8">
        <div className="grid items-center gap-6 border-y border-linha py-8 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
          <Image
            src={fotoThiago}
            alt="Retrato de Thiago Waldowski Ralha"
            className="h-20 w-20 rounded-full border border-linha object-cover"
            sizes="80px"
          />
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight">
              {site.nome}, fundador da TWR Tech
            </p>
            <p className="mt-1 max-w-[58ch] text-sm leading-relaxed text-suave">
              Engenheiro pela Poli-USP, ajuda empresas a estruturar a operação
              com dados, automação e IA. Os três produtos partem da mesma ideia:
              tirar a informação da empresa do improviso.
            </p>
          </div>
          <Link
            href="/sobre"
            className="font-semibold underline decoration-linha decoration-2 underline-offset-4 transition-colors hover:decoration-acento"
          >
            Conheça a TWR Tech {"→"}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
        <Rotulo>{"// estudos de caso"}</Rotulo>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Três casos, do diagnóstico ao dashboard.
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          Estudos de caso demonstrativos com dados sintéticos, construídos com
          o mesmo rigor de um projeto real.
        </p>

        <ul className="mt-11 grid grid-cols-1 gap-4 border-t border-linha pt-10 md:grid-cols-3">
          {casesDemonstrativos.map((item) => (
            <li
              key={item.slug}
              className="rounded-2xl border border-linha bg-painel p-6"
            >
              <p className="inline-block rounded-full border border-linha px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-apagado">
                Estudo de caso demonstrativo
              </p>
              <h3 className="font-display mt-4 text-xl font-extrabold tracking-tight">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {item.resumo}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/portfolio"
          className="mt-8 inline-block py-1 text-lg font-bold underline decoration-linha decoration-2 underline-offset-4 transition-colors hover:decoration-acento"
        >
          Ver o portfólio completo →
        </Link>
      </section>

      <FaqSection itens={faqHome} />

      <SubstackFeed />

      <CTASection
        titulo="Sua operação tem uma dor parecida?"
        texto="Uma conversa de 30 minutos costuma bastar para saber se a TWR Tech pode ajudar."
      />
    </>
  );
}
