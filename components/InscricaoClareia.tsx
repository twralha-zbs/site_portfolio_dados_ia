import Link from "next/link";
import { FormularioClareia } from "@/components/FormularioClareia";

type Props = {
  // Na página /clareia o título já é o h1: o bloco mostra só o formulário.
  semTitulo?: boolean;
};

// Inscrição na ClareIA, o mesmo componente em /clareia, no fim dos artigos, no
// /blog e na Home (um por página). Componente de servidor: só ele sabe se as
// variáveis da API do Beehiiv existem, e só esse booleano chega ao navegador.
// As páginas são estáticas, então o valor é fixado no build: cadastrou as
// variáveis na Vercel, precisa de um redeploy. Sem elas, mostra "em breve".
export function InscricaoClareia({ semTitulo = false }: Props) {
  const ativa = Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID);

  if (semTitulo && !ativa) {
    // Na /clareia (único lugar com semTitulo), com inscrições fechadas: só a
    // frase, sem caixa em volta de uma linha.
    return (
      <p className="font-mono text-sm text-apagado">
        {"// as inscrições abrem em breve"}
      </p>
    );
  }

  return (
    // relative: o honeypot do formulário fica posicionado fora da tela.
    <div className="relative rounded-2xl border border-linha bg-painel p-6 md:p-8">
      {!semTitulo && (
        <>
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
            ClareIA, a newsletter da TWR Tech
          </h2>
          <p className="mt-2 text-suave">Menos ruído, mais decisão. Toda quinta, por email.</p>
        </>
      )}

      {ativa ? (
        <FormularioClareia className={semTitulo ? "" : "mt-5"} />
      ) : (
        <p className="mt-5 text-suave">
          As inscrições abrem em breve.{" "}
          <Link href="/clareia" className="font-semibold text-acento hover:underline">
            Conheça a ClareIA
          </Link>
        </p>
      )}
    </div>
  );
}
