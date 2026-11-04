import type { Metadata } from "next";
import { Rotulo } from "@/components/ui/rotulo";
import { paginaMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = paginaMeta(
  "/contato",
  "Contato",
  "Fale com a TWR Tech pelo WhatsApp: você responde 3 perguntas rápidas e recebe o próximo passo para o seu caso. Também no LinkedIn e no Instagram.",
);

// O WhatsApp é a porta única de entrada (Helena): a mensagem pronta do link
// dispara o Flow que pergunta a dor e registra a origem. Não há formulário nem
// agenda pública; quando faz sentido conversar, o link para marcar a conversa
// é enviado pelo próprio WhatsApp.
const etapas = [
  {
    titulo: "Você manda a mensagem pronta",
    texto: "O botão abre o WhatsApp com a mensagem escrita. É só enviar.",
  },
  {
    titulo: "Responde 3 perguntas rápidas",
    texto: "Ali mesmo no WhatsApp: o que está travando hoje, no atendimento, nos dados ou em ser encontrado no Google.",
  },
  {
    titulo: "Recebe o próximo passo",
    texto: "Um material gratuito feito para o seu problema e, se fizer sentido, o link para marcar uma conversa de 30 minutos com o Thiago.",
  },
];

const perfis = [
  { rotulo: "LinkedIn", detalhe: "linkedin.com/in/twralha", url: site.links.linkedin },
  { rotulo: "Instagram", detalhe: "@twrtech", url: site.links.instagram },
];

export default function Contato() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
      <Rotulo>{"// contato"}</Rotulo>
      <h1 className="font-display mt-4 max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
        Fale com a TWR Tech pelo WhatsApp.
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-suave">
        Atendimento, dados e presença no Google: conte o que está travando a
        sua empresa e receba uma resposta honesta sobre o que dá para resolver.
      </p>
      <a
        href={site.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-9 inline-block rounded-full bg-acento px-7 py-3.5 text-lg font-bold text-acento-contraste transition-[filter] hover:brightness-110"
      >
        Fale no WhatsApp
      </a>

      <div className="mt-20 grid gap-14 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
            Como funciona
          </h2>
          <ol className="mt-6 border-t border-linha">
            {etapas.map((etapa, i) => (
              <li
                key={etapa.titulo}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-linha py-5"
              >
                <span className="font-mono text-sm text-apagado md:pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-lg font-bold">{etapa.titulo}</p>
                  <p className="mt-1 leading-relaxed text-suave">{etapa.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
            Acompanhe a TWR Tech
          </h2>
          <ul className="mt-6">
            {perfis.map((perfil) => (
              <li key={perfil.rotulo} className="border-t border-linha last:border-b">
                <a
                  href={perfil.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="font-display text-xl font-bold group-hover:text-acento">
                    {perfil.rotulo} {"↗︎"}
                  </span>
                  <span className="text-sm text-apagado">{perfil.detalhe}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-apagado">
            {site.localizacao}. A TWR Tech atende empresas de qualquer lugar
            do Brasil e do mundo.
          </p>
        </aside>
      </div>
    </section>
  );
}
