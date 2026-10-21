"use client";

import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Check, Minus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { comparativo, planos, type ValorCelula } from "@/lib/nexiatend";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Mostra "R$ 767" para inteiros e "R$ 383,50" para o valor pela metade.
const formatoReais = {
  style: "currency",
  currency: "BRL",
  trailingZeroDisplay: "stripIfInteger",
} as const;
const moeda = new Intl.NumberFormat("pt-BR", formatoReais);

function Celula({ valor }: { valor: ValorCelula }) {
  if (valor === true) {
    return (
      <>
        <Check aria-hidden="true" className="mx-auto h-4 w-4 text-acento" />
        <span className="sr-only">Incluso</span>
      </>
    );
  }
  if (valor === false) {
    return (
      <>
        <Minus aria-hidden="true" className="mx-auto h-4 w-4 text-apagado" />
        <span className="sr-only">Não incluso</span>
      </>
    );
  }
  return <span>{valor}</span>;
}

// Comparador de planos do NexIAtend: a mensalidade é fixa e a implantação
// anima entre o contrato mensal (cheia) e o de 12 meses (pela metade). Dados
// em lib/nexiatend.ts, a mesma fonte do JSON-LD da página.
export function Planos() {
  const [doze, setDoze] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span
          className={cn(
            "text-sm font-semibold transition-colors",
            doze ? "text-apagado" : "text-texto",
          )}
        >
          Mensal, sem fidelidade
        </span>
        <Switch
          checked={doze}
          onCheckedChange={setDoze}
          aria-label="Contrato de 12 meses, com implantação pela metade"
        />
        <span
          className={cn(
            "text-sm font-semibold transition-colors",
            doze ? "text-texto" : "text-apagado",
          )}
        >
          12 meses
        </span>
        <span className="rounded-full border border-linha bg-painel px-3 py-1 font-mono text-xs text-suave">
          implantação pela metade
        </span>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {planos.map((plano) => {
          const implantacao = doze ? plano.implantacao / 2 : plano.implantacao;
          return (
            <li
              key={plano.slug}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                plano.destaque
                  ? "border-azul-linha bg-azul-profundo text-sobre-azul"
                  : "border-linha bg-painel",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-extrabold tracking-tight">
                  {plano.nome}
                </h3>
                {plano.rotulo && (
                  <span className="rounded-full bg-sobre-azul px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.09em] text-azul-profundo">
                    {plano.rotulo}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-1 min-h-[2.5rem] text-sm font-semibold",
                  plano.destaque ? "text-sobre-azul-suave" : "text-suave",
                )}
              >
                {plano.resolve}
              </p>

              <p className="font-mono mt-5 text-3xl font-bold">
                <NumberFlow
                  value={plano.mensalidade}
                  locales="pt-BR"
                  format={formatoReais}
                />
                <span
                  className={cn(
                    "text-base font-medium",
                    plano.destaque ? "text-sobre-azul-suave" : "text-apagado",
                  )}
                >
                  /mês
                </span>
              </p>
              <p
                className={cn(
                  "mt-1 text-xs font-semibold uppercase tracking-[0.09em]",
                  plano.destaque ? "text-sobre-azul-suave" : "text-apagado",
                )}
              >
                {plano.capacidade}
              </p>

              <div
                className={cn(
                  "mt-5 border-t pt-4",
                  plano.destaque ? "border-azul-linha" : "border-linha",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.09em]",
                    plano.destaque ? "text-sobre-azul-suave" : "text-apagado",
                  )}
                >
                  Implantação, pagamento único
                </p>
                <p className="font-mono mt-1 text-xl font-bold">
                  <NumberFlow
                    value={implantacao}
                    locales="pt-BR"
                    format={formatoReais}
                  />
                </p>
                {/* Reserva a altura nos dois modos para o card não pular */}
                <p
                  aria-hidden={!doze}
                  className={cn(
                    "mt-0.5 font-mono text-xs line-through",
                    plano.destaque ? "text-sobre-azul-suave" : "text-apagado",
                    !doze && "invisible",
                  )}
                >
                  {moeda.format(plano.implantacao)}
                </p>
              </div>

              {plano.herda && (
                <p
                  className={cn(
                    "mt-3 text-sm font-semibold",
                    plano.destaque ? "text-sobre-azul" : "text-texto",
                  )}
                >
                  {plano.herda}
                </p>
              )}
              <ul className={cn("flex-1 space-y-2.5 text-sm", plano.herda ? "mt-3" : "mt-4")}>
                {plano.inclui.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plano.destaque ? "text-sobre-azul" : "text-acento",
                      )}
                    />
                    <span
                      className={
                        plano.destaque ? "text-sobre-azul-suave" : "text-suave"
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={site.links.whatsappDiagnostico}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-6 rounded-full px-5 py-2.5 text-center text-sm font-bold transition-[filter,background-color]",
                  plano.destaque
                    ? "bg-sobre-azul text-azul-profundo hover:brightness-95"
                    : "border border-linha hover:bg-fundo",
                )}
              >
                Pedir diagnóstico gratuito
              </a>
            </li>
          );
        })}
      </ul>

      <details className="group mt-6 rounded-2xl border border-linha bg-painel">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-4 font-display text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden">
          Comparar todos os recursos
          <span
            aria-hidden="true"
            className="shrink-0 text-acento transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="overflow-x-auto border-t border-linha">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparação dos recursos incluídos em cada plano do NexIAtend
            </caption>
            <thead>
              <tr className="border-b border-linha">
                <th
                  scope="col"
                  className="sticky left-0 bg-painel px-6 py-3 font-semibold text-apagado"
                >
                  Recurso
                </th>
                {planos.map((plano) => (
                  <th
                    key={plano.slug}
                    scope="col"
                    className="px-4 py-3 text-center font-display font-extrabold"
                  >
                    {plano.nome}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparativo.map((linha) => (
                <tr key={linha.recurso} className="border-b border-linha last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 bg-painel px-6 py-3 font-medium text-suave"
                  >
                    {linha.recurso}
                  </th>
                  {linha.valores.map((valor, i) => (
                    <td
                      key={planos[i].slug}
                      className="px-4 py-3 text-center text-suave"
                    >
                      <Celula valor={valor} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
