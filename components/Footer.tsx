import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-linha">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <p className="font-display text-xl font-extrabold">{site.marca}</p>
            <p className="mt-1 text-sm text-apagado">{site.nome}</p>
            <p className="mt-1 text-sm text-apagado">{site.localizacao}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex gap-8">
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/portfolio" className="text-suave hover:text-texto">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-suave hover:text-texto">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-suave hover:text-texto">
                  Contato
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-suave hover:text-texto"
                >
                  LinkedIn {"↗︎"}
                </a>
              </li>
              <li>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-suave hover:text-texto"
                >
                  GitHub {"↗︎"}
                </a>
              </li>
              <li>
                <a
                  href={site.links.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-suave hover:text-texto"
                >
                  Substack {"↗︎"}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="border-t border-linha pt-6 text-xs leading-relaxed text-apagado">
          Os estudos de caso deste site são demonstrativos: empresas fictícias com
          dados sintéticos, sempre identificados como tal. © {new Date().getFullYear()}{" "}
          {site.nome}.
        </p>
      </div>
    </footer>
  );
}
