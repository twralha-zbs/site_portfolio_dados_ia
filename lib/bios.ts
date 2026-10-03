// Fonte única das páginas "link in bio" (/bio/<slug>). Mesma disciplina de
// lib/servicos.ts e lib/cases.ts: páginas só consomem daqui.
//
// Como manter:
// - Adicionar/editar/remover link: mexer no array `links` da bio. A ordem do
//   array é a ordem na tela. Commit + push na main publica sozinho.
// - Nova bio: copiar um bloco inteiro e trocar slug/nome/descricao/links. A
//   rota /bio/<slug> é gerada no build, sem criar página.
// - Contatos gerais (WhatsApp, agenda, LinkedIn...) usam site.links, então uma
//   mudança em lib/site.ts vale para o site e para todas as bios.
// - Links internos ("/algo") ganham UTM automaticamente; o clique de qualquer
//   link vira o evento "Bio Link Click" no Vercel Analytics.
// - Texto visível sem travessão (regra do CLAUDE.md).
import { site } from "@/lib/site";

export type BioLink = {
  rotulo: string;
  href: string;
  // "destaque" = botão principal (no máximo um ou dois por bio).
  variante?: "destaque" | "padrao";
};

export type BioAvatar =
  | { tipo: "logo-twr" }
  | { tipo: "iniciais"; texto: string }
  | { tipo: "imagem"; src: string; alt: string };

export type Bio = {
  slug: string;
  nome: string;
  descricao: string;
  avatar: BioAvatar;
  links: BioLink[];
};

export const bios: Bio[] = [
  {
    slug: "twr-tech",
    nome: "TWR Tech",
    descricao:
      "Atendimento inteligente com IA, seu site otimizado pra aparecer nas buscas e conversas com a IA e organização de dados e processos para PMEs.",
    avatar: { tipo: "logo-twr" },
    links: [
      { rotulo: "Agende uma conversa", href: site.links.agenda, variante: "destaque" },
      { rotulo: "Fale no WhatsApp", href: site.links.whatsappBio },
      { rotulo: "Conheça o NexIAtend", href: "/nexiatend" },
      { rotulo: "MaxIAlcance: Seja encontrado no Google e nas IAs", href: "/maxialcance" },
      { rotulo: "Portfólio de dados", href: "/portfolio" },
      { rotulo: "Blog no Substack", href: site.links.substack },
      { rotulo: "LinkedIn", href: site.links.linkedin },
      { rotulo: "Site da TWR Tech", href: "/" },
    ],
  },
  {
    slug: "nexiatend",
    nome: "NexIAtend",
    descricao:
      "Atendimento Inteligente no seu WhatsApp, com CRM e automações para conquistar seus clientes e não perder nenhuma venda.",
    avatar: { tipo: "logo-twr" },
    links: [
      { rotulo: "Conheça o NexIAtend", href: "/nexiatend", variante: "destaque" },
      { rotulo: "Agende uma demonstração", href: site.links.agenda },
      { rotulo: "Fale no WhatsApp", href: site.links.whatsappBio },
      { rotulo: "Site da TWR Tech", href: "/" },
    ],
  },
  {
    slug: "elas-jogam",
    nome: "ELAS JOGAM",
    descricao: "O guia do esporte feminino brasileiro.",
    avatar: { tipo: "imagem", src: "https://cdn.twralha.com/avatar.png", alt: "Letras E e J maiúsculas em verde limão sobre fundo preto." },
    links: [
      { rotulo: "Agenda da semana", href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTA3MTI1MDAxNTE5ODI0?story_media_id=3993286353303460741_38927771697&stkn=M3M0cmk3bjVzcnEz", variante: "destaque" },
      { rotulo: "Sobre o projeto", href: "/projetos" },
      { rotulo: "Feito pela TWR Tech", href: "/" },
    ],
  },
];

export function buscarBio(slug: string): Bio | undefined {
  return bios.find((bio) => bio.slug === slug);
}

// UTM só em links internos: é o tráfego que o Analytics do próprio site
// consegue atribuir. Em wa.me, LinkedIn etc. o parâmetro não teria leitor.
export function comUtm(href: string, slug: string): string {
  if (!href.startsWith("/")) return href;
  const [caminho, hash] = href.split("#");
  const separador = caminho.includes("?") ? "&" : "?";
  const utm = `utm_source=instagram&utm_medium=bio&utm_campaign=${slug}`;
  return `${caminho}${separador}${utm}${hash ? `#${hash}` : ""}`;
}
