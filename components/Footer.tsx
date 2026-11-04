import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/LogoMark";

type ItemRodape = { rotulo: string; href: string; externo?: boolean };

// Três colunas: produtos; conteúdo e navegação; perfis externos e institucional.
// Cada coluna tem a largura do próprio conteúdo e o espaço entre elas é fixo
// (colunas de largura igual deixavam vãos desiguais entre os textos). No
// celular, "Organização de dados" quebra em duas linhas: a 1ª coluna fica com
// a largura da palavra maior (min-content) para o espaço não sobrar à direita.
const colunas: ItemRodape[][] = [
  [
    { rotulo: "NexIAtend", href: "/nexiatend" },
    { rotulo: "MaxIAlcance", href: "/maxialcance" },
    { rotulo: "Organização de dados", href: "/organizacao-de-dados" },
  ],
  [
    { rotulo: "Blog", href: "/blog" },
    { rotulo: "ClareIA", href: "/clareia" },
    { rotulo: "Portfólio", href: "/portfolio" },
    { rotulo: "Projetos", href: "/projetos" },
    { rotulo: "Contato", href: "/contato" },
  ],
  [
    { rotulo: "Instagram", href: site.links.instagram, externo: true },
    { rotulo: "LinkedIn", href: site.links.linkedin, externo: true },
    { rotulo: "GitHub", href: site.links.github, externo: true },
    { rotulo: "Sobre", href: "/sobre" },
    { rotulo: "Privacidade", href: "/privacidade" },
  ],
];

export function Footer() {
  return (
    <footer className="border-t border-linha">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${site.marca}, página inicial`}
            >
              <LogoMark className="h-8 w-8" />
              <p className="font-display text-xl font-extrabold">{site.marca}</p>
            </Link>
            <p className="mt-1 text-sm text-apagado">{site.nome}</p>
            <p className="mt-1 text-sm text-apagado">{site.localizacao}</p>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="grid grid-cols-[min-content_auto_auto] justify-start gap-x-8 text-sm sm:grid-cols-[repeat(3,auto)] sm:gap-x-14"
          >
            {colunas.map((coluna, i) => (
              <ul key={i} className="flex flex-col gap-2">
                {coluna.map((item) => (
                  <li key={item.href} className="sm:whitespace-nowrap">
                    {item.externo ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-suave hover:text-texto"
                      >
                        {item.rotulo} {"↗︎"}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-suave hover:text-texto">
                        {item.rotulo}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="border-t border-linha pt-6 text-xs leading-relaxed text-apagado">
          <p>
            Os estudos de caso deste site são demonstrativos: empresas fictícias com
            dados sintéticos, sempre identificados como tal. © {new Date().getFullYear()}{" "}
            {site.nome}.
          </p>
          <p className="mt-2">
            {site.razaoSocial} · CNPJ {site.cnpj}
          </p>
        </div>
      </div>
    </footer>
  );
}
