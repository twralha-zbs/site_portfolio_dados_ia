import { cn } from "@/lib/utils";

// Rótulo mono no estilo das artes do Instagram ("// 01 · atendimento"), usado
// acima dos títulos de seção no lugar das legendas em caixa alta.
export function Rotulo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-xs text-apagado md:text-sm", className)}>
      {children}
    </p>
  );
}
