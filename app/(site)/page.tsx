import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { SubstackFeed } from "@/components/SubstackFeed";
import { FaqSection } from "@/components/FaqSection";
import { ProdutoBloco } from "@/components/ProdutoBloco";
import { VisualDados, VisualPresenca } from "@/components/VisuaisProduto";
import { Hero } from "@/components/ui/hero";
import { PrintProduto } from "@/components/ui/print-produto";
import { Rotulo } from "@/components/ui/rotulo";
import { faqHome } from "@/lib/faq";
import { site } from "@/lib/site";
import { produtos } from "@/lib/servicos";
import { casesDemonstrativos } from "@/lib/cases";
import centralAtendimento from "@/public/nexiatend/central_atendimento.webp";

// Visual de cada produto, na ordem de lib/servicos.ts (NexIAtend,
// MaxIAlcance, consultoria).
const visuais: Record<string, React.ReactNode> = {
  nexiatend: (
    <PrintProduto
      src={centralAtendimento}
      alt="Central de atendimento do NexIAtend: lista de conversas à esquerda e a conversa aberta, com a origem do cliente, à direita"
      sizes="(min-width: 768px) 560px, 100vw"
      legenda="// central de atendimento"
    />
  ),
  maxialcance: <VisualPresenca />,
  "organizacao-de-dados": <VisualDados />,
};

export default function Home() {
  return (
    <>
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
      />

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

      <section className="mx-auto max-w-6xl border-t border-linha px-6 py-20 md:px-8 md:py-24">
        <Rotulo>{"// estudos de caso"}</Rotulo>
        <h2 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Três casos, do diagnóstico ao dashboard.
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg text-suave">
          Estudos de caso demonstrativos com dados sintéticos, construídos com
          o mesmo rigor de um projeto real.
        </p>

        <ul className="mt-11 grid grid-cols-1 gap-4 border-t border-linha pt-10 sm:grid-cols-2">
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
          className="mt-8 inline-block text-lg font-bold text-acento hover:underline"
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
