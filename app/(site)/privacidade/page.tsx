import type { Metadata } from "next";
import { Rotulo } from "@/components/ui/rotulo";
import { paginaMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = paginaMeta(
  "/privacidade",
  "Política de privacidade",
  "Quais dados a TWR Tech coleta no site, no WhatsApp e na newsletter ClareIA, para que usa, com quem compartilha e como pedir acesso ou exclusão.",
);

// Texto revisado pelo usuário antes da publicação. Ao mudar um serviço que
// recebe dados (WhatsApp, chat, analytics, newsletter), atualizar aqui e a
// data abaixo.
const atualizadoEm = "5 de novembro de 2026";

const secoes: { titulo: string; paragrafos: React.ReactNode[] }[] = [
  {
    titulo: "Quem cuida dos seus dados",
    paragrafos: [
      <>
        O controlador dos dados é a {site.razaoSocial}, CNPJ {site.cnpj}, que
        atua com o nome {site.marca}. Para qualquer assunto sobre os seus dados,
        escreva para{" "}
        <a href={`mailto:${site.emailEmpresa}`} className="font-semibold text-acento hover:underline">
          {site.emailEmpresa}
        </a>
        .
      </>,
    ],
  },
  {
    titulo: "Que dados coletamos e para quê",
    paragrafos: [
      "WhatsApp e chat do site: o número, o nome do perfil e as mensagens que você enviar, para atender o seu pedido e registrar por onde você chegou (site, blog, Instagram ou newsletter). As conversas ficam na plataforma de atendimento da TWR Tech.",
      "Newsletter ClareIA: o email que você informar, só com o seu consentimento, para enviar a newsletter. O envio é feito pelo Beehiiv, e todo email tem um link para sair da lista. O Beehiiv é uma empresa dos Estados Unidos e guarda os emails lá: é uma transferência internacional de dados (LGPD, art. 33), feita só para essa mesma finalidade.",
      "Estatísticas de uso: o Vercel Analytics conta visitas e cliques (por exemplo, em botões de WhatsApp) de forma agregada, sem cookies e sem identificar você.",
    ],
  },
  {
    titulo: "Com quem compartilhamos",
    paragrafos: [
      "Só com os serviços citados acima, que processam os dados para a TWR Tech prestar o serviço. Não vendemos nem cedemos dados a terceiros para publicidade.",
    ],
  },
  {
    titulo: "Por quanto tempo guardamos",
    paragrafos: [
      "Enquanto houver relação com você (uma conversa em andamento, um contrato ou a inscrição na newsletter) e, depois disso, pelo prazo que a lei exigir. Fora desses casos, os dados são apagados quando você pedir.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      "Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir a confirmação de que tratamos os seus dados, o acesso a eles, a correção, a exclusão, a portabilidade e a revogação do consentimento. Basta escrever para o email acima.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
      <Rotulo>{"// privacidade"}</Rotulo>
      <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
        Política de privacidade
      </h1>
      <p className="mt-4 text-sm text-apagado">Atualizada em {atualizadoEm}.</p>

      <div className="mt-10 flex flex-col gap-10">
        {secoes.map((secao) => (
          <div key={secao.titulo}>
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              {secao.titulo}
            </h2>
            {secao.paragrafos.map((paragrafo, i) => (
              <p key={i} className="mt-3 max-w-[68ch] leading-relaxed text-suave">
                {paragrafo}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
