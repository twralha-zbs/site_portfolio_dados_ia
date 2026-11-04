// Fonte única do blog (/blog). Os artigos são arquivos Markdown em
// content/blog/<slug>.md, com o frontmatter que o pipeline editorial da TWR
// Tech já produz (Marketing/Blog/README.md). Só roda no servidor e no build:
// lê o disco com fs.
//
// Regras:
// - Frontmatter inválido QUEBRA O BUILD (erro com o nome do arquivo e o campo).
// - Artigo com `publicado` no futuro (fuso de São Paulo) não entra: o arquivo
//   pode ficar pronto no repo antes da data. Como o site é estático, ele
//   aparece no primeiro build a partir da data (o push do dia publica).
// - `semana`, `palavra_chave` e `volume` são internos: são validados, mas não
//   saem deste módulo.
// - A seção "## Perguntas frequentes" sai do corpo e vira `faq`: a página
//   renderiza a FAQ e o JSON-LD FAQPage com as MESMAS strings.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { toString } from "mdast-util-to-string";
import type { Root, RootContent } from "mdast";
import type { Root as HastRoot, Element, ElementContent } from "hast";
import type { ItemFaq } from "@/lib/faq";

export const temas = [
  { rotulo: "Atendimento", slug: "atendimento" },
  { rotulo: "Dados e processos", slug: "dados-e-processos" },
  { rotulo: "Ser encontrado", slug: "ser-encontrado" },
  { rotulo: "Bastidor", slug: "bastidor" },
] as const;

export type Tema = (typeof temas)[number]["rotulo"];

// Texto do botão de WhatsApp por `cta`. O link é sempre o mesmo
// (site.links.whatsappBlog): a mensagem pronta é o gatilho do chatbot.
export const textosCta = {
  diagnostico: "Quero o diagnóstico do meu atendimento",
  avaliacao: "Quero a nota de 0 a 100 da minha empresa",
  mapa: "Quero o Mapa de 15 minutos",
} as const;

export type Cta = keyof typeof textosCta;

// Página de produto linkada no rodapé do artigo. Nunca citar o nome interno
// da consultoria de dados no blog: a página é "Organização de dados".
export const produtosLinkaveis = {
  "/nexiatend": "NexIAtend: o atendimento do WhatsApp e do Instagram num lugar só",
  "/maxialcance": "MaxIAlcance: ser encontrado no Google, no Mapa e nas IAs",
  "/organizacao-de-dados": "Organização de dados e processos",
} as const;

export type ProdutoLinkado = keyof typeof produtosLinkaveis;

export type Artigo = {
  titulo: string;
  slug: string;
  descricao: string;
  tema: Tema;
  temaSlug: string;
  publicado: string;
  atualizado: string;
  produtoLinkado: ProdutoLinkado;
  cta: Cta;
  html: string;
  faq: ItemFaq[];
  palavras: number;
  minutosLeitura: number;
};

const LIMITE_TITULO = 60;
const LIMITE_DESCRICAO = 155;
const semanas = ["S1", "S2", "S3", "S4"];
const camposObrigatorios = [
  "titulo",
  "slug",
  "descricao",
  "tema",
  "semana",
  "palavra_chave",
  "volume",
  "publicado",
  "atualizado",
  "produto_linkado",
  "cta",
] as const;

const PASTA_ARTIGOS = path.join(process.cwd(), "content", "blog");
// Artigo de exemplo para verificação local (BLOG_EXEMPLO=1 npm run build).
// Nunca é lido em produção.
const PASTA_EXEMPLO = path.join(process.cwd(), "content", "blog-exemplo");

const TITULO_FAQ = "perguntas frequentes";

// Data de hoje em São Paulo, no formato AAAA-MM-DD (comparável como string).
export function hojeEmSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatarData(iso: string): string {
  return formatoData.format(new Date(`${iso}T00:00:00Z`));
}

// O YAML transforma 2026-11-09 em Date; aceita os dois e devolve a string.
function normalizarData(valor: unknown): string | null {
  if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
    return valor.toISOString().slice(0, 10);
  }
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor.trim())) {
    const iso = valor.trim();
    const data = new Date(`${iso}T00:00:00Z`);
    if (!Number.isNaN(data.getTime()) && data.toISOString().startsWith(iso)) {
      return iso;
    }
  }
  return null;
}

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor.trim() : "";
}

// Envolve cada <table> num <div class="tabela-rolagem">: a tabela rola sozinha
// no celular em vez de alargar a página.
function rehypeTabelaRolagem() {
  function envolver(filhos: ElementContent[]): ElementContent[] {
    return filhos.map((no) => {
      if (no.type !== "element") return no;
      if (no.tagName === "table") {
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: { className: ["tabela-rolagem"] },
          children: [no],
        };
        return wrapper;
      }
      no.children = envolver(no.children);
      return no;
    });
  }
  return (arvore: HastRoot) => {
    arvore.children = arvore.children.map((no) =>
      no.type === "element" ? envolver([no])[0] : no,
    );
  };
}

// Separa a seção "## Perguntas frequentes" do corpo. Cada "###" vira uma
// pergunta; a resposta é o texto puro dos blocos até o próximo "###".
function extrairFaq(arvore: Root): { corpo: RootContent[]; faq: ItemFaq[] } {
  const nos = arvore.children;
  const inicio = nos.findIndex(
    (no) =>
      no.type === "heading" &&
      no.depth === 2 &&
      toString(no).trim().toLowerCase() === TITULO_FAQ,
  );
  if (inicio === -1) return { corpo: nos, faq: [] };

  let fim = nos.findIndex(
    (no, i) => i > inicio && no.type === "heading" && no.depth <= 2,
  );
  if (fim === -1) fim = nos.length;

  const faq: ItemFaq[] = [];
  let atual: { pergunta: string; partes: string[] } | null = null;
  for (const no of nos.slice(inicio + 1, fim)) {
    if (no.type === "heading" && no.depth === 3) {
      if (atual) faq.push({ pergunta: atual.pergunta, resposta: atual.partes.join(" ") });
      atual = { pergunta: toString(no).trim(), partes: [] };
    } else if (atual) {
      const parte = toString(no).replace(/\s+/g, " ").trim();
      if (parte) atual.partes.push(parte);
    }
  }
  if (atual) faq.push({ pergunta: atual.pergunta, resposta: atual.partes.join(" ") });

  return { corpo: [...nos.slice(0, inicio), ...nos.slice(fim)], faq };
}

const processador = unified()
  .use(remarkRehype)
  .use(rehypeTabelaRolagem)
  .use(rehypeStringify);

const parser = unified().use(remarkParse).use(remarkGfm);

function lerArtigo(caminho: string): Artigo {
  const arquivo = path.basename(caminho);
  const bruto = fs.readFileSync(caminho, "utf-8");
  const { data, content } = matter(bruto);
  const erros: string[] = [];

  for (const campo of camposObrigatorios) {
    const valor = data[campo];
    if (valor === undefined || valor === null || valor === "") {
      erros.push(`campo "${campo}" ausente`);
    }
  }

  const titulo = texto(data.titulo);
  const slug = texto(data.slug);
  const descricao = texto(data.descricao);
  const tema = texto(data.tema);
  const cta = texto(data.cta);
  const produtoLinkado = texto(data.produto_linkado);
  const semana = texto(data.semana);
  const publicado = normalizarData(data.publicado);
  const atualizado = normalizarData(data.atualizado);

  if (titulo.length > LIMITE_TITULO) {
    erros.push(`"titulo" tem ${titulo.length} caracteres (máximo ${LIMITE_TITULO})`);
  }
  if (descricao.length > LIMITE_DESCRICAO) {
    erros.push(
      `"descricao" tem ${descricao.length} caracteres (máximo ${LIMITE_DESCRICAO})`,
    );
  }
  const temaValido = temas.find((t) => t.rotulo === tema);
  if (tema && !temaValido) {
    erros.push(`"tema" inválido: "${tema}" (use: ${temas.map((t) => t.rotulo).join(", ")})`);
  }
  if (cta && !(cta in textosCta)) {
    erros.push(`"cta" inválido: "${cta}" (use: ${Object.keys(textosCta).join(", ")})`);
  }
  if (produtoLinkado && !(produtoLinkado in produtosLinkaveis)) {
    erros.push(
      `"produto_linkado" inválido: "${produtoLinkado}" (use: ${Object.keys(produtosLinkaveis).join(", ")})`,
    );
  }
  if (semana && !semanas.includes(semana)) {
    erros.push(`"semana" inválida: "${semana}" (use: ${semanas.join(", ")})`);
  }
  if (data.publicado && !publicado) erros.push(`"publicado" não é uma data AAAA-MM-DD`);
  if (data.atualizado && !atualizado) erros.push(`"atualizado" não é uma data AAAA-MM-DD`);
  if (publicado && atualizado && atualizado < publicado) {
    erros.push(`"atualizado" (${atualizado}) é anterior a "publicado" (${publicado})`);
  }
  if (slug && `${slug}.md` !== arquivo) {
    erros.push(`"slug" (${slug}) diferente do nome do arquivo (${arquivo})`);
  }
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    erros.push(`"slug" só aceita letras minúsculas, números e hífens`);
  }
  if (/—/.test(`${titulo} ${descricao} ${content}`)) {
    erros.push(`texto com travessão (—), proibido no site`);
  }
  if (/dataconsult/i.test(`${titulo} ${descricao} ${content}`)) {
    erros.push(`texto cita "DataConsult", nome interno que não aparece no blog`);
  }

  if (erros.length > 0) {
    throw new Error(
      `Frontmatter inválido em ${path.relative(process.cwd(), caminho)}:\n- ${erros.join("\n- ")}`,
    );
  }

  const arvore = parser.parse(content) as Root;
  const palavras = toString(arvore).split(/\s+/).filter(Boolean).length;
  const { corpo, faq } = extrairFaq(arvore);

  if (faq.length === 0) {
    console.warn(`[blog] ${arquivo}: sem "## Perguntas frequentes" (FAQPage não será gerado).`);
  }
  if (palavras < 800 || palavras > 1500) {
    console.warn(`[blog] ${arquivo}: ${palavras} palavras (o padrão é de 800 a 1.500).`);
  }

  const hast = processador.runSync({ type: "root", children: corpo } as Root);
  const html = processador.stringify(hast as HastRoot);

  return {
    titulo,
    slug,
    descricao,
    tema: tema as Tema,
    temaSlug: temaValido!.slug,
    publicado: publicado!,
    atualizado: atualizado!,
    produtoLinkado: produtoLinkado as ProdutoLinkado,
    cta: cta as Cta,
    html,
    faq,
    palavras,
    minutosLeitura: Math.max(1, Math.round(palavras / 200)),
  };
}

function lerPasta(pasta: string): Artigo[] {
  if (!fs.existsSync(pasta)) return [];
  return fs
    .readdirSync(pasta)
    .filter((nome) => nome.endsWith(".md"))
    .map((nome) => lerArtigo(path.join(pasta, nome)));
}

let cache: Artigo[] | null = null;

// Todos os artigos publicados (data de publicação até hoje), mais recente
// primeiro. Valida TODOS os arquivos, inclusive os de data futura.
export function listarArtigos(): Artigo[] {
  if (cache) return cache;

  const todos = [
    ...lerPasta(PASTA_ARTIGOS),
    ...(process.env.BLOG_EXEMPLO === "1" ? lerPasta(PASTA_EXEMPLO) : []),
  ];

  const slugs = new Set<string>();
  for (const artigo of todos) {
    if (slugs.has(artigo.slug)) {
      throw new Error(`Slug repetido no blog: "${artigo.slug}"`);
    }
    slugs.add(artigo.slug);
  }

  const hoje = hojeEmSaoPaulo();
  cache = todos
    .filter((artigo) => artigo.publicado <= hoje)
    .sort((a, b) =>
      a.publicado === b.publicado
        ? a.titulo.localeCompare(b.titulo, "pt-BR")
        : a.publicado < b.publicado
          ? 1
          : -1,
    );
  return cache;
}

export function buscarArtigo(slug: string): Artigo | undefined {
  return listarArtigos().find((artigo) => artigo.slug === slug);
}

// "Leia também": até 2 artigos do mesmo tema, os mais recentes.
export function artigosRelacionados(artigo: Artigo, limite = 2): Artigo[] {
  return listarArtigos()
    .filter((outro) => outro.tema === artigo.tema && outro.slug !== artigo.slug)
    .slice(0, limite);
}
