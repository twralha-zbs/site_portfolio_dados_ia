import { site } from "@/lib/site";

type Props = {
  titulo: string;
  texto?: string;
};

// Bloco de conversão reutilizável (Home, produtos e páginas internas): fundo
// azul profundo e um único botão, a porta única no WhatsApp (origem "site").
// Não há agenda nem formulário: o link da conversa sai pelo WhatsApp.
export function CTASection({ titulo, texto }: Props) {
  return (
    <section className="bg-azul-profundo text-sobre-azul">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
        <h2 className="font-display max-w-[16ch] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          {titulo}
        </h2>
        {texto && (
          <p className="mt-4 max-w-[44ch] text-sobre-azul-suave">{texto}</p>
        )}
        <div className="mt-9">
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-sobre-azul px-6 py-3 font-bold text-azul-profundo transition-[filter] hover:brightness-95"
          >
            Fale no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
