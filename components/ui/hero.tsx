import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CtaHero = {
  rotulo: string;
  href: string;
  // Link para fora do site (abre em nova aba)
  externo?: boolean;
};

type Props = {
  // Pílula mono acima do título (opcional)
  eyebrow?: string;
  // Nome do produto, dentro do H1 (páginas de produto)
  marca?: string;
  selo?: string;
  titulo: React.ReactNode;
  subtitulo: React.ReactNode;
  ctas: { primario: CtaHero; secundario?: CtaHero };
  // Visual abaixo dos botões (ex.: print do produto)
  children?: React.ReactNode;
  className?: string;
};

const classePrimario =
  "rounded-full bg-acento px-6 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110";
const classeSecundario =
  "rounded-full border border-linha px-6 py-3 font-semibold transition-colors hover:bg-painel";

function Botao({ cta, classe }: { cta: CtaHero; classe: string }) {
  if (cta.externo) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classe}
      >
        {cta.rotulo}
      </a>
    );
  }
  // Âncoras (#produtos) e rotas internas: o Link do Next cobre os dois
  return (
    <Link href={cta.href} className={classe}>
      {cta.rotulo}
    </Link>
  );
}

// Hero compartilhado da Home, /nexiatend e /maxialcance, na linguagem das
// artes do Instagram: grade discreta no topo, arco com brilho azul elétrico na
// base, rótulo mono e título forte. Server component; a entrada usa as
// classes animate-fade-* do globals.css (desligadas em reduced-motion).
export function Hero({
  eyebrow,
  marca,
  selo,
  titulo,
  subtitulo,
  ctas,
  children,
  className,
}: Props) {
  const grade =
    "linear-gradient(to right, var(--color-linha) 1px, transparent 1px), linear-gradient(to bottom, var(--color-linha) 1px, transparent 1px)";
  const mascara =
    "radial-gradient(ellipse 75% 65% at 50% 0%, #000 25%, transparent 100%)";

  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: grade,
          backgroundSize: "56px 56px",
          maskImage: mascara,
          WebkitMaskImage: mascara,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[38rem] left-1/2 -z-10 h-[52rem] w-[150%] max-w-[90rem] -translate-x-1/2 rounded-full border border-eletrico/40 md:-bottom-[44rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-eletrico) 30%, transparent), transparent 75%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 text-center md:px-8 md:pb-24 md:pt-24">
        {eyebrow && (
          <p className="animate-fade-in mx-auto inline-flex items-center gap-1.5 rounded-full border border-linha bg-painel/70 px-4 py-1.5 font-mono text-xs text-suave">
            {eyebrow}
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-acento" />
          </p>
        )}
        <h1
          className={cn(
            "animate-fade-up font-display mx-auto max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl",
            eyebrow && "mt-7",
          )}
        >
          {marca && (
            <span className="mb-4 flex items-center justify-center gap-3 text-2xl tracking-tight text-suave md:text-3xl">
              {marca}
              {selo && (
                <span className="font-mono text-xs font-medium uppercase tracking-[0.13em] text-apagado">
                  {selo}
                </span>
              )}
            </span>
          )}
          {titulo}
        </h1>
        <p
          className="animate-fade-up mx-auto mt-7 max-w-[54ch] text-balance text-lg text-suave"
          style={{ animationDelay: "120ms" }}
        >
          {subtitulo}
        </p>
        <div
          className="animate-fade-up mt-9 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "220ms" }}
        >
          <Botao cta={ctas.primario} classe={classePrimario} />
          {ctas.secundario && (
            <Botao cta={ctas.secundario} classe={classeSecundario} />
          )}
        </div>
        {children && (
          <div
            className="animate-fade-up mt-14 md:mt-16"
            style={{ animationDelay: "320ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
