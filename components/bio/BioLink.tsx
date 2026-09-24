"use client";

import { track } from "@vercel/analytics";
import type { BioLink as BioLinkDados } from "@/lib/bios";

type Props = BioLinkDados & {
  bio: string;
  indice: number;
};

const variantes = {
  destaque: "bg-acento text-acento-contraste font-bold",
  padrao: "border border-linha bg-painel text-texto font-medium",
} as const;

// Único trecho com JS da página de bio: dispara o evento de clique. A
// animação de entrada é CSS (.bio-entrada em globals.css), escalonada pelo
// índice, então o link é clicável desde o primeiro paint.
export function BioLink({ rotulo, href, variante = "padrao", bio, indice }: Props) {
  const externo = !href.startsWith("/");

  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track("Bio Link Click", { bio, rotulo, url: href })}
      style={{ animationDelay: `${indice * 60}ms` }}
      className={`bio-entrada flex min-h-14 w-full items-center justify-center rounded-2xl px-5 py-3 text-center text-[0.95rem] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98] ${variantes[variante]}`}
    >
      {rotulo}
    </a>
  );
}
