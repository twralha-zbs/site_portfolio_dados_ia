import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  // "janela" para telas do computador, "celular" para prints do app
  variante?: "janela" | "celular";
  // Texto mono na barra da janela (ex.: "// central de atendimento")
  legenda?: string;
  priority?: boolean;
  className?: string;
};

// Moldura para os prints claros da plataforma repousarem no fundo escuro: uma
// janela com barra e três pontos, ou um celular. Sem sombra (DESIGN.md):
// separação por borda e camada tonal.
export function PrintProduto({
  src,
  alt,
  sizes,
  variante = "janela",
  legenda,
  priority,
  className,
}: Props) {
  if (variante === "celular") {
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-[17rem] rounded-[2rem] border border-linha bg-painel p-2",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full rounded-[1.5rem]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-linha bg-painel",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-linha px-4 py-3">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-linha" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-linha" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-linha" />
        {legenda && (
          <span className="ml-2 font-mono text-xs text-apagado">{legenda}</span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}
