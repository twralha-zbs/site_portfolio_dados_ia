import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com Thiago Waldowski Ralha sobre dashboards Power BI, automação de fluxos e IA aplicada: formulário, WhatsApp, LinkedIn ou agenda direta.",
};

const canaisDiretos = [
  {
    rotulo: "Agendar uma conversa",
    detalhe: "30 minutos, sem compromisso",
    url: site.links.agenda,
  },
  {
    rotulo: "WhatsApp",
    detalhe: "resposta mais rápida",
    url: site.links.whatsapp,
  },
  {
    rotulo: "LinkedIn",
    detalhe: "linkedin.com/in/twralha",
    url: site.links.linkedin,
  },
];

export default function Contato() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
        Contato
      </p>
      <h1 className="font-display mt-5 max-w-[18ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
        Me conte sua dor de dados.
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg text-suave">
        Descreva o problema do seu jeito: relatório que demora, planilha que
        ninguém confia, processo manual que engole horas. Eu respondo com uma
        leitura honesta do que dá para resolver.
      </p>

      <div className="mt-14 grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
        <ContactForm />

        <aside>
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-apagado">
            Canais diretos
          </h2>
          <ul className="mt-5">
            {canaisDiretos.map((canal) => (
              <li key={canal.rotulo} className="border-t border-linha last:border-b">
                <a
                  href={canal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="font-display text-xl font-bold group-hover:text-acento">
                    {canal.rotulo} {"↗︎"}
                  </span>
                  <span className="text-sm text-apagado">{canal.detalhe}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-apagado">
            {site.localizacao}. Atendo empresas de qualquer lugar do Brasil e do
            mundo.
          </p>
        </aside>
      </div>
    </section>
  );
}
