import { ArrowRight } from "lucide-react";

// Visuais tipográficos dos blocos de produto da Home (MaxIAlcance e
// consultoria). Ilustrações de estrutura, sem números nem resultados.

const moldura =
  "rounded-2xl border border-linha bg-painel p-6 md:p-8";

export function VisualPresenca() {
  const lugares = [
    { nome: "Google", texto: "Página para cada serviço e cidade" },
    { nome: "Mapa", texto: "Perfil completo, fotos e avaliações" },
    { nome: "IAs", texto: "Citado quando perguntam “qual você recomenda?”" },
  ];

  return (
    <div className={moldura} role="img" aria-label="O cliente busca o serviço e a cidade no Google, no mapa e nas IAs">
      <p className="rounded-full border border-linha bg-fundo px-5 py-3 font-mono text-sm text-suave">
        <span className="text-apagado">busca: </span>
        seu serviço em sua cidade
        <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-acento" />
      </p>
      <ul className="mt-6 space-y-3" aria-hidden="true">
        {lugares.map((lugar) => (
          <li
            key={lugar.nome}
            className="flex items-center gap-4 rounded-xl border border-linha bg-fundo px-4 py-3"
          >
            <span className="w-16 shrink-0 font-mono text-sm font-bold text-texto">
              {lugar.nome}
            </span>
            <span className="text-sm text-suave">{lugar.texto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VisualDados() {
  const fontes = ["ERP", "Planilhas", "CRM"];

  return (
    <div
      className={moldura}
      role="img"
      aria-label="ERP, planilhas e CRM reunidos num painel único"
    >
      <div className="flex items-center gap-4 md:gap-6" aria-hidden="true">
        <ul className="flex flex-1 flex-col gap-3">
          {fontes.map((fonte) => (
            <li
              key={fonte}
              className="rounded-xl border border-linha bg-fundo px-4 py-3 font-mono text-sm text-suave"
            >
              {fonte}
            </li>
          ))}
        </ul>
        <ArrowRight className="h-5 w-5 shrink-0 text-apagado" />
        <div className="flex-[1.3] rounded-xl border border-azul-linha bg-azul-profundo p-4">
          <p className="font-mono text-xs text-sobre-azul-suave">painel único</p>
          <div className="mt-4 flex h-24 items-end gap-2">
            {[40, 65, 50, 85, 70].map((altura, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-sobre-azul/80"
                style={{ height: `${altura}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
