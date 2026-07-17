"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const rotas = [
  { href: "/portfolio", rotulo: "Portfólio" },
  { href: "/sobre", rotulo: "Sobre" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-linha">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold tracking-tight"
          aria-label={`${site.marca}, página inicial`}
        >
          {site.marca}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {rotas.map((rota) => (
            <Link
              key={rota.href}
              href={rota.href}
              aria-current={pathname === rota.href ? "page" : undefined}
              className={`text-[0.95rem] transition-colors hover:text-texto ${
                pathname === rota.href ? "text-texto" : "text-suave"
              }`}
            >
              {rota.rotulo}
            </Link>
          ))}
          <a
            href={site.links.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.95rem] text-suave transition-colors hover:text-texto"
          >
            Blog {"↗︎"}
          </a>
          <a
            href={site.links.agenda}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-acento px-5 py-2.5 text-sm font-bold text-acento-contraste transition-[filter] hover:brightness-110"
          >
            Agende uma conversa
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-linha md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto(!aberto)}
        >
          <span aria-hidden="true" className="text-lg">
            {aberto ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal"
          className="border-t border-linha px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {rotas.map((rota) => (
              <li key={rota.href}>
                <Link
                  href={rota.href}
                  className="text-suave hover:text-texto"
                  onClick={() => setAberto(false)}
                >
                  {rota.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.links.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="text-suave hover:text-texto"
              >
                Blog {"↗︎"}
              </a>
            </li>
            <li>
              <a
                href={site.links.agenda}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-acento px-5 py-2.5 text-sm font-bold text-acento-contraste"
              >
                Agende uma conversa
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
