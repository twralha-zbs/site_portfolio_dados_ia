"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/LogoMark";

const rotas = [
  { href: "/#produtos", rotulo: "Produtos" },
  { href: "/portfolio", rotulo: "Portfólio" },
  { href: "/projetos", rotulo: "Projetos" },
  { href: "/sobre", rotulo: "Sobre" },
  { href: "/blog", rotulo: "Blog" },
  { href: "/clareia", rotulo: "ClareIA" },
];

// Botão do header: a porta única no WhatsApp. No blog usa a origem "blog"
// (todo CTA do blog usa essa frase pronta); no resto do site, a origem "site".
const linkWhatsapp = (pathname: string) =>
  pathname === "/blog" || pathname.startsWith("/blog/")
    ? site.links.whatsappBlog
    : site.links.whatsapp;

// Rota ativa também nas subpáginas (um artigo marca "Blog").
const ativa = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-linha">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight"
          aria-label={`${site.marca}, página inicial`}
        >
          <LogoMark className="h-7 w-7" />
          {site.marca}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {rotas.map((rota) => (
            <Link
              key={rota.href}
              href={rota.href}
              aria-current={ativa(pathname, rota.href) ? "page" : undefined}
              className={`text-[0.95rem] transition-colors hover:text-texto ${
                ativa(pathname, rota.href) ? "text-texto" : "text-suave"
              }`}
            >
              {rota.rotulo}
            </Link>
          ))}
          <a
            href={linkWhatsapp(pathname)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-acento px-5 py-2.5 text-sm font-bold text-acento-contraste transition-[filter] hover:brightness-110"
          >
            Fale no WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-linha lg:hidden"
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
          className="border-t border-linha px-6 py-4 lg:hidden"
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
                href={linkWhatsapp(pathname)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-acento px-5 py-2.5 text-sm font-bold text-acento-contraste"
              >
                Fale no WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
