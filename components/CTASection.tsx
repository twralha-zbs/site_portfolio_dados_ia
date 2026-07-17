import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  titulo: string;
  texto?: string;
};

// Bloco de conversão reutilizável (Home, cases e páginas internas): fundo azul
// profundo, CTA primário para a agenda e secundário para o formulário.
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
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={site.links.agenda}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sobre-azul px-6 py-3 font-bold text-azul-profundo transition-[filter] hover:brightness-95"
          >
            Agende uma conversa
          </a>
          <Link
            href="/contato"
            className="rounded-full border border-azul-linha px-6 py-3 font-semibold text-sobre-azul transition-colors hover:bg-azul"
          >
            Enviar mensagem
          </Link>
        </div>
      </div>
    </section>
  );
}
