import { textosCta, type Cta } from "@/lib/blog";
import { site } from "@/lib/site";

type Props = {
  // Sem `cta` (listagem /blog), o botão usa o texto genérico.
  cta?: Cta;
  slug?: string;
};

// Bloco de CTA único do blog. O texto do botão varia pelo `cta` do artigo, o
// link NUNCA varia: é a origem "blog" da porta única, cuja mensagem pronta é
// o gatilho do chatbot. O clique é medido por components/RastreioWhatsapp.tsx,
// que lê data-slug e data-cta.
export function CtaWhatsappBlog({ cta, slug }: Props) {
  return (
    <section className="rounded-2xl bg-azul-profundo p-6 text-sobre-azul md:p-8">
      <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
        Quer olhar para o seu caso?
      </h2>
      <p className="mt-3 max-w-[52ch] text-sobre-azul-suave">
        Você responde 3 perguntas rápidas no WhatsApp e recebe, de graça, um
        material feito para o seu problema.
      </p>
      <a
        href={site.links.whatsappBlog}
        target="_blank"
        rel="noopener noreferrer"
        data-slug={slug}
        data-cta={cta}
        className="mt-6 inline-block rounded-full bg-sobre-azul px-6 py-3 text-center font-bold text-azul-profundo transition-[filter] hover:brightness-95"
      >
        {cta ? textosCta[cta] : "Falar com o Thiago no WhatsApp"}
      </a>
    </section>
  );
}
