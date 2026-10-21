import { Rotulo } from "@/components/ui/rotulo";
import { cn } from "@/lib/utils";

export type Recurso = {
  titulo: string;
  descricao: string;
};

type Props = {
  id?: string;
  rotulo: string;
  titulo: React.ReactNode;
  texto: string;
  // Recursos numerados (01, 02...) abaixo do texto
  recursos?: Recurso[];
  // Conteúdo extra entre o texto e os recursos
  children?: React.ReactNode;
  visual: React.ReactNode;
  // Visual à esquerda no desktop
  invertido?: boolean;
};

// Grupo de recursos da landing do NexIAtend, na estrutura da aldacrm.com:
// rótulo mono, título, texto curto, recursos numerados e um print ao lado.
export function GrupoRecursos({
  id,
  rotulo,
  titulo,
  texto,
  recursos,
  children,
  visual,
  invertido,
}: Props) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:px-8 md:py-20"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={cn(invertido && "lg:order-last")}>
          <Rotulo>{rotulo}</Rotulo>
          <h2 className="font-display mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
            {titulo}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-suave">{texto}</p>
          {children}
          {recursos && (
            <ol className="mt-8 space-y-5">
              {recursos.map((recurso, i) => (
                <li key={recurso.titulo} className="flex gap-4 border-t border-linha pt-5">
                  <span className="font-mono text-sm font-bold text-apagado">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      {recurso.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-suave">
                      {recurso.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="lg:sticky lg:top-24">{visual}</div>
      </div>
    </section>
  );
}
