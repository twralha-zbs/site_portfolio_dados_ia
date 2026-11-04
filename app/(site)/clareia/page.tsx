import type { Metadata } from "next";
import Link from "next/link";
import { InscricaoClareia } from "@/components/InscricaoClareia";
import { Rotulo } from "@/components/ui/rotulo";
import { paginaMeta } from "@/lib/metadata";

export const metadata: Metadata = paginaMeta(
  "/clareia",
  "ClareIA: menos ruído, mais decisão",
  "ClareIA, a newsletter da TWR Tech: toda quinta, em 5 minutos, uma ideia prática para organizar o atendimento, os dados e a presença da sua empresa.",
);

// O que chega em cada edição, do template em Marketing/Newsletter/README.md.
// Ao mudar o template da newsletter, mudar aqui.
const secoesEdicao = [
  {
    nome: "O tema da semana",
    texto: "Um problema numa cena concreta, a resposta curta e o que fazer já.",
  },
  {
    nome: "Radar",
    texto:
      "A novidade da semana em linguagem de dono: o que mudou, o que muda para a sua empresa e se vale agir agora ou esperar.",
  },
  {
    nome: "Para testar",
    texto: "Uma ferramenta ou recurso que você usa sozinho, com o passo de 1 minuto para começar.",
  },
  {
    nome: "Uma pergunta",
    texto: "Uma pergunta direta para você. Dá para responder o email: o Thiago lê todos.",
  },
];

// Nome, subtítulo e descrição definidos pelo Thiago em 2026-10-28
// (Marketing/Newsletter/README.md). A promessa ainda é rascunho lá.
// O subtítulo fica em Texto, não em Acento: o Acento da tela é do botão de
// inscrição (Regra da Cor Única).
export default function ClareiaPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
      <Rotulo>{"// newsletter da TWR Tech"}</Rotulo>
      <h1 className="font-display mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
        ClareIA
      </h1>
      <p className="font-display mt-4 text-2xl font-bold tracking-tight md:text-3xl">
        Menos ruído, mais decisão.
      </p>
      <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-suave">
        Clareza sobre tecnologia para quem toca um negócio. Toda quinta, em 5
        minutos: uma ideia prática para organizar o atendimento, os dados e a
        presença da sua empresa, e o que a novidade da semana em IA muda (ou
        não) no seu negócio.
      </p>

      <div className="mt-10">
        <InscricaoClareia semTitulo />
      </div>

      <h2 className="font-display mt-16 text-2xl font-extrabold tracking-tight md:text-3xl">
        O que chega toda quinta
      </h2>
      <ol className="mt-6 border-t border-linha">
        {secoesEdicao.map((secao, i) => (
          <li
            key={secao.nome}
            className="grid gap-x-6 gap-y-1 border-b border-linha py-5 md:grid-cols-[3rem_12rem_1fr]"
          >
            <span className="font-mono text-sm text-apagado">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-lg font-bold">{secao.nome}</span>
            <span className="leading-relaxed text-suave">{secao.texto}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-sm leading-relaxed text-apagado">
        Escrita por Thiago Waldowski Ralha, da TWR Tech. Sem spam, e você sai
        quando quiser. Os temas viram artigos completos no{" "}
        <Link href="/blog" className="font-semibold text-suave underline underline-offset-4 hover:text-texto">
          blog
        </Link>
        .
      </p>
    </section>
  );
}
