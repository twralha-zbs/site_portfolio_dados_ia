import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";
import { BioLink } from "@/components/bio/BioLink";
import { bios, buscarBio, comUtm, type BioAvatar } from "@/lib/bios";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return bios.map((bio) => ({ slug: bio.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bio = buscarBio(slug);
  if (!bio) return {};

  return {
    // absolute: o template do layout raiz ("%s · TWR Tech") duplicaria a
    // marca na bio da própria TWR Tech.
    title: {
      absolute: bio.nome === site.marca ? site.marca : `${bio.nome} · ${site.marca}`,
    },
    description: bio.descricao,
    alternates: { canonical: `/bio/${bio.slug}` },
    // Página fina de links: não deve competir com as páginas reais na busca.
    robots: { index: false, follow: true },
    openGraph: {
      title: bio.nome,
      description: bio.descricao,
      url: `/bio/${bio.slug}`,
    },
  };
}

function Avatar({ avatar }: { avatar: BioAvatar }) {
  const moldura =
    "flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-linha bg-painel";

  if (avatar.tipo === "imagem") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={avatar.src} alt={avatar.alt} className={`${moldura} object-cover`} />
    );
  }

  return (
    <div className={moldura} aria-hidden="true">
      {avatar.tipo === "logo-twr" ? (
        <LogoMark className="h-14 w-14" />
      ) : (
        <span className="font-display text-3xl font-extrabold tracking-tight">
          {avatar.texto}
        </span>
      )}
    </div>
  );
}

export default async function BioPage({ params }: Props) {
  const { slug } = await params;
  const bio = buscarBio(slug);
  if (!bio) notFound();

  return (
    <>
      <header className="bio-entrada flex flex-col items-center text-center">
        <Avatar avatar={bio.avatar} />
        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight">
          {bio.nome}
        </h1>
        <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-suave">
          {bio.descricao}
        </p>
      </header>

      <nav aria-label={`Links de ${bio.nome}`} className="mt-8 flex flex-col gap-3">
        {bio.links.map((link, indice) => (
          <BioLink
            key={link.href + link.rotulo}
            {...link}
            href={comUtm(link.href, bio.slug)}
            bio={bio.slug}
            indice={indice + 1}
          />
        ))}
      </nav>

      <footer className="mt-auto pt-12 text-center">
        <a
          href={comUtm("/", bio.slug)}
          className="inline-flex items-center gap-2 text-sm text-apagado transition-colors hover:text-texto"
        >
          <LogoMark className="h-4 w-4" />
          twralha.com
        </a>
      </footer>
    </>
  );
}
