import { listarArtigos } from "@/lib/blog";
import { site } from "@/lib/site";

// llms.txt (antes em public/): resumo do site para IAs, agora com a lista de
// artigos do blog gerada no build. Higiene, não estratégia (PLANO_PROJETO.md
// §6.1). Texto sem travessão.
export const dynamic = "force-static";

const inicio = `# TWR Tech

> A TWR Tech, de Thiago Waldowski Ralha (engenheiro pela Poli-USP, São Paulo), tem três produtos para a pequena e média empresa: NexIAtend (central de atendimento no WhatsApp e no Instagram), MaxIAlcance (presença no Google e nas IAs) e DataConsult (organização de dados e processos com Power BI, Power Automate, Python e IA aplicada). Atendimento remoto para todo o Brasil. Todo estudo de caso do portfólio é demonstrativo, com empresa fictícia e dados sintéticos.

## Produtos

- [NexIAtend](https://twralha.com/nexiatend): central que reúne as conversas do WhatsApp e do Instagram num lugar só, implantada e treinada pela TWR Tech. Planos a partir de R$ 437 por mês. Começa com diagnóstico gratuito.
- [MaxIAlcance](https://twralha.com/maxialcance): trabalho para a empresa ser encontrada no Google, no Mapa e nas respostas de IAs. Implantação a partir de R$ 3.500 e acompanhamento de R$ 500 por mês. Começa com avaliação gratuita.
- [DataConsult](https://twralha.com/organizacao-de-dados): consultoria que mapeia fontes, processos e fluxos de dados e constrói painéis e automações. Valor por projeto, informado depois da conversa ou do diagnóstico.

## Sobre e contato

- [Sobre](https://twralha.com/sobre): quem é Thiago Waldowski Ralha, formação e projetos reais.
- [Portfólio](https://twralha.com/portfolio): estudos de caso demonstrativos.
- [Projetos](https://twralha.com/projetos): projetos desenvolvidos.
- [Contato](https://twralha.com/contato): WhatsApp, a porta de entrada para diagnóstico, avaliação ou conversa de 30 minutos; também LinkedIn e Instagram.
- [ClareIA](https://twralha.com/clareia): a newsletter da TWR Tech, toda quinta.

`;

const fim = `## Fora daqui

- [LinkedIn](https://linkedin.com/in/twralha)
- [GitHub](https://github.com/twralha)
- [Instagram](https://www.instagram.com/twrtech)
`;

export function GET() {
  const artigos = listarArtigos();
  const blog = [
    "## Blog",
    "",
    `- [Blog](${site.urlProducao}/blog): artigos sobre atendimento, dados e processos e como ser encontrado no Google.`,
    ...artigos.map(
      (artigo) =>
        `- [${artigo.titulo}](${site.urlProducao}/blog/${artigo.slug}): ${artigo.descricao}`,
    ),
    "",
    "",
  ].join("\n");

  return new Response(`${inicio}${blog}${fim}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
