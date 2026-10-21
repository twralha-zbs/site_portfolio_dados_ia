import Link from "next/link";
import { Check } from "lucide-react";
import { Rotulo } from "@/components/ui/rotulo";
import type { Produto } from "@/lib/servicos";
import { cn } from "@/lib/utils";

type Props = {
  produto: Produto;
  visual: React.ReactNode;
  // Visual à esquerda no desktop (alterna o lado entre os blocos)
  invertido?: boolean;
};

// Bloco de produto da Home: a dor do cliente como título, o produto como
// resposta, três benefícios e o CTA, ao lado de um visual.
export function ProdutoBloco({ produto, visual, invertido }: Props) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <div className={cn(invertido && "md:order-last")}>
        <Rotulo>{produto.rotulo}</Rotulo>
        <h3 className="font-display mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
          {produto.dor}
        </h3>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-bold">
          {produto.nome}
          {produto.selo && (
            <span className="font-mono text-xs font-medium uppercase tracking-[0.13em] text-apagado">
              {produto.selo}
            </span>
          )}
        </p>
        <p className="mt-2 max-w-[48ch] text-suave">{produto.descricao}</p>
        <ul className="mt-6 space-y-3">
          {produto.beneficios.map((beneficio) => (
            <li key={beneficio} className="flex gap-3 text-sm text-suave">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acento" />
              {beneficio}
            </li>
          ))}
        </ul>
        <p className="mt-6 inline-block rounded-full border border-linha bg-painel px-4 py-1.5 font-mono text-xs text-suave">
          {produto.modeloPreco}
        </p>
        <div className="mt-6">
          <Link
            href={produto.href}
            className="text-lg font-bold text-acento hover:underline"
          >
            {produto.ctaRotulo} {"→"}
          </Link>
        </div>
      </div>
      <div>{visual}</div>
    </article>
  );
}
