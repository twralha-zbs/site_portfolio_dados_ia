import { Fragment } from "react";

type Passo = {
  numero: string;
  titulo: string;
  descricao: string;
};

const passos: Passo[] = [
  {
    numero: "1",
    titulo: "Diagnóstico",
    descricao:
      "Entendo o processo e onde a informação vive hoje: quais decisões travam e por quê.",
  },
  {
    numero: "2",
    titulo: "Pipeline de dados",
    descricao:
      "Trato e padronizo as fontes com Python: dados limpos, íntegros e prontos para modelar.",
  },
  {
    numero: "3",
    titulo: "Modelo & dashboard",
    descricao:
      "Modelo os dados e construo o painel em Power BI com leitura executiva e métricas confiáveis.",
  },
  {
    numero: "4",
    titulo: "Automação",
    descricao:
      "Power Automate elimina o trabalho manual: alertas e rotinas que rodam sozinhos.",
  },
  {
    numero: "5",
    titulo: "IA aplicada",
    descricao:
      "Resumos e alertas em linguagem natural sobre os seus números, prontos para a decisão.",
  },
];

// Seção de método ("Como eu trabalho"): prova visual do fluxo de trabalho, das
// fontes cruas à camada de IA. Reutilizável na página do case (Fase 4), onde é
// a "solução em 4 camadas" do PLANO_PROJETO.md §3.3.
export function ProcessoTrabalho() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
        Como eu trabalho
      </p>
      <h2 className="font-display mt-5 max-w-[18ch] text-3xl font-extrabold tracking-tight md:text-4xl">
        Da fonte crua à decisão, em cinco passos.
      </h2>
      <p className="mt-5 max-w-[56ch] text-suave">
        O mesmo método em todo projeto: começar pela decisão que precisa ser
        tomada e recuar até os dados, não o contrário.
      </p>

      <ol className="mt-10 flex flex-col items-stretch gap-3 md:flex-row">
        {passos.map((passo, i) => (
          <Fragment key={passo.numero}>
            <li className="flex-1 rounded-2xl border border-linha bg-painel p-5">
              <span
                aria-hidden="true"
                className="font-display text-2xl font-extrabold leading-none text-acento"
              >
                {passo.numero}
              </span>
              <h3 className="font-display mt-3 text-lg font-extrabold tracking-tight">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                {passo.descricao}
              </p>
            </li>
            {i < passos.length - 1 && (
              <li
                aria-hidden="true"
                className="flex items-center justify-center text-acento md:px-0.5"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
