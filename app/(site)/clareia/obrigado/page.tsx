import type { Metadata } from "next";
import Link from "next/link";
import { Rotulo } from "@/components/ui/rotulo";
import { paginaMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

// Página de passagem: o Beehiiv manda a pessoa para cá depois que ela clica
// no link de confirmação do email ("Opt in redirect URL"). Sem valor de busca:
// noindex, nofollow e fora do sitemap.ts e do llms.txt.
// Não lê searchParams de propósito: o Beehiiv pode anexar parâmetros na URL e
// nada deles aparece na tela.
// Textos do briefing do Marketing (2026-11-05). O Acento da tela é o botão
// "Ler o blog"; o WhatsApp fica numa linha discreta, sem botão (o header
// esconde a pílula do WhatsApp nesta rota, ver components/Header.tsx). O
// link tem 44px de altura e não quebra: é a saída para conversa no celular.
export const metadata: Metadata = {
  ...paginaMeta(
    "/clareia/obrigado",
    "Inscrição confirmada",
    "Sua inscrição na ClareIA, a newsletter da TWR Tech, está confirmada. A primeira edição chega na próxima quinta de manhã.",
  ),
  robots: { index: false, follow: false },
};

export default function ClareiaObrigadoPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
      <Rotulo>{"// inscrição confirmada"}</Rotulo>
      <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        Pronto, você está na ClareIA.
      </h1>
      <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-suave">
        A primeira edição chega na próxima quinta de manhã, no seu email.
      </p>
      <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-suave">
        Agora dá uma olhada na sua caixa de entrada: te mandei um email de
        boas-vindas com uma pergunta rápida. Responda com 1, 2 ou 3. É das
        respostas que saem os próximos temas.
      </p>
      <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-apagado">
        Não achou? Veja em Promoções ou Spam e salve{" "}
        <span className="font-mono whitespace-nowrap text-suave">clareia@mail.beehiiv.com</span>{" "}
        nos contatos, pra ClareIA não se perder.
      </p>

      <h2 className="font-display mt-14 text-2xl font-extrabold tracking-tight md:text-3xl">
        Enquanto a quinta não chega
      </h2>
      <Link
        href="/blog"
        className="mt-6 inline-block rounded-full bg-acento px-7 py-3.5 text-lg font-bold text-acento-contraste transition-[filter] hover:brightness-110"
      >
        Ler o blog
      </Link>

      <p className="mt-14 border-t border-linha pt-6 text-sm leading-relaxed text-apagado">
        Já tem um problema pra resolver agora?{" "}
        <a
          href={site.links.whatsappClareia}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center whitespace-nowrap font-semibold text-suave underline underline-offset-4 hover:text-texto"
        >
          Me chama no WhatsApp.
        </a>
      </p>
    </section>
  );
}
