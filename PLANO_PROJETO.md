# Plano: Site Portfólio + Estudo de Caso Piloto — Consultor de Dados, Automação e IA

## Contexto

Consultor especializado em Power Platform, Python e IA aplicada precisa de um site portfólio com dois objetivos: atrair clientes freelance/consultoria e construir autoridade no nicho de dados/automação/IA para negócios. Sem clientes reais no lançamento, o portfólio se sustenta em estudos de caso com empresas fictícias e dados sintéticos realistas. O blog fica no Substack; o site é vitrine e hub de conversão. Este plano fecha todas as decisões técnicas e define fases com critérios binários de "pronto", para execução por um agente implementador e avaliação por um agente independente.

**Decisões do usuário:** idioma PT-BR; marca usa placeholder `[SEU_NOME]` (substituir antes da execução da Fase 3).

---

## 1. Resumo executivo

Site portfólio em Next.js (App Router) + Tailwind CSS, hospedado na Vercel, com conteúdo de estudos de caso em arquivos MDX versionados no próprio repositório (sem CMS externo). O MVP é composto pelo site core (Home, Portfólio, Sobre, Contato) mais **um** estudo de caso completo: a fictícia **Distribuidora Serra Azul** (atacado de bebidas), com dataset sintético gerado em Python, dashboard Power BI publicado via "Publish to web" e embutido em iframe responsivo, automação Power Automate documentada e camada de IA (resumo executivo automático via LLM). Blog no Substack, integrado por links e por uma seção "Últimos artigos" alimentada pelo feed RSS. Captação de leads via formulário Formspree + CTA persistente. O site é otimizado desde o MVP para ser encontrado e citado por buscadores de IA (AEO/GEO): `robots.txt` liberando bots de retrieval, `llms.txt`, schema JSON-LD (Organization, Person, Article, FAQPage) e estrutura answer-first no texto dos cases — práticas fundamentadas na wiki AEO/GEO do usuário (seção 6). Execução em 7 fases, cada uma com definition of done verificável de forma binária.

---

## 2. Stack de tecnologias

| Componente | Escolha | Justificativa |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | SSG/ISR nativo, SEO forte, padrão de mercado, deploy trivial na Vercel. |
| Estilização | **Tailwind CSS v4** | Velocidade de desenvolvimento, consistência sem design system próprio, zero CSS runtime. |
| Hospedagem | **Vercel (plano Hobby)** | Grátis, CI/CD automático via GitHub, preview deployments, domínio custom. |
| Conteúdo dos cases | **MDX em `content/cases/*.mdx`** com frontmatter, renderizado via `next-mdx-remote/rsc` | Sem custo, versionado em git, sem dependência de CMS externo; volume de conteúdo (poucos cases) não justifica CMS. |
| Embed Power BI | **"Publish to web"** (iframe público) dentro de componente `<PowerBIEmbed>` | Grátis e sem autenticação — viável porque os dados são 100% fictícios (sem risco LGPD). Power BI Embedded pago é sofisticação desnecessária. |
| Responsividade do iframe | Container com `aspect-ratio: 16/10`, `width: 100%`, `loading="lazy"`, e em telas < 768px exibir screenshot estático + botão "Abrir relatório em tela cheia" (link externo) | Publish to web não é responsivo de verdade em mobile; o fallback preserva a experiência e a performance. |
| Formulário de contato | **Formspree (free tier)** | Sem backend próprio, proteção anti-spam, e-mail direto; 50 envios/mês é suficiente para o início. |
| Analytics | **Vercel Analytics** | Ativação em 1 linha, grátis, sem banner de cookies (cookieless). |
| Fontes | `next/font` (Google Fonts self-hosted) | Zero layout shift, sem request externo. |
| Blog | **Substack (externo)** — links no nav/footer + seção RSS na Home | Requisito do projeto; o site não hospeda blog. |
| AEO/GEO — dados estruturados | **JSON-LD via `<script type="application/ld+json">`** nos layouts/páginas (Organization, Person, Article, FAQPage, BreadcrumbList) | Google e Microsoft confirmaram (mar/2025) uso de schema em IA generativa; páginas com schema válido são 2–4x mais citadas em AI Overviews. |
| AEO/GEO — crawl | **`app/robots.ts`** permitindo todos os bots (incl. bots de IA) + **`public/llms.txt`** | Objetivo do site é máxima visibilidade e autoridade — bloquear bots de treinamento não faz sentido para um portfólio público. llms.txt custa ~zero e serve a agentes de IA que naveguem o site. |
| Geração de dados | **Python 3.12 + pandas + numpy + Faker** | Controle total do realismo (sazonalidade, tendências, padrões plantados). |
| Repositório | **1 repo GitHub**: Next.js na raiz + pasta `lab/serra-azul/` (scripts Python, CSVs, specs) fora do build do site | Simplicidade para dev solo; a pasta `lab/` é excluída via `.vercelignore`. |

### Estrutura de pastas/rotas

```
site_thi/
├── app/
│   ├── layout.tsx              # nav + footer globais
│   ├── page.tsx                # Home
│   ├── portfolio/page.tsx      # grid de cases
│   ├── portfolio/[slug]/page.tsx  # página do case (MDX)
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── sitemap.ts / robots.ts  # sitemap com lastmod; robots liberando bots de IA
├── components/                 # Header, Footer, PowerBIEmbed, CTASection,
│                               # CaseCard, MetricBeforeAfter, SubstackFeed, JsonLd, FaqSection
├── content/cases/serra-azul.mdx
├── lib/                        # mdx.ts (loader), substack.ts (RSS fetch c/ revalidate 3600 + fallback estático),
│                               # schema.ts (builders de JSON-LD: Organization, Person, Article, FAQPage)
├── public/                     # og-images, screenshots do dashboard, llms.txt
└── lab/serra-azul/             # gerar_dados.py, data/*.csv, especificacao_powerbi.md,
                                # resumo_ia.py, automacao/ (doc do fluxo Power Automate)
```

---

## 3. Estudo de caso piloto — Distribuidora Serra Azul

### 3.1 Empresa fictícia

- **Nome:** Distribuidora Serra Azul Ltda.
- **Ramo:** Atacado/distribuição de bebidas (cervejas, refrigerantes, águas, energéticos) para pontos de venda (bares, mercados, restaurantes).
- **Porte:** Médio — ~R$ 4 mi/mês de faturamento, 1.200 clientes PDV ativos, 250 SKUs, 35 funcionários, 12 vendedores externos, 1 CD.
- **Dor de negócio:** Decisões de compra e reposição no "feeling" do comprador. Consequências: **ruptura de estoque nos SKUs mais vendidos (~8% dos pedidos com item faltante)**, capital parado em itens de baixo giro, e um relatório gerencial mensal montado à mão em Excel que leva 3 dias e chega desatualizado. A diretoria não enxerga clientes esfriando até que parem de comprar.

> **Disclaimer obrigatório no site:** todo case exibe selo visível "Estudo de caso demonstrativo — empresa fictícia com dados sintéticos". Isso protege a credibilidade em vez de reduzi-la.

### 3.2 Base de dados sintética (gerada por `gerar_dados.py`)

Período coberto: **jan/2024 a jun/2026 (30 meses — 2024 completo, permitindo comparação de ano fechado)**. Seed fixa (`random_state=42`) para reprodutibilidade.

| Tabela | Colunas principais | Volume |
|---|---|---|
| `clientes.csv` | id, nome_fantasia, tipo_pdv, cidade/UF, data_cadastro, vendedor_id | 1.200 |
| `produtos.csv` | sku, descricao, categoria, marca, preco_tabela, custo, fornecedor | 250 |
| `vendedores.csv` | id, nome, regiao, data_admissao | 12 |
| `pedidos.csv` | id, cliente_id, vendedor_id, data, status | ~55.000 |
| `itens_pedido.csv` | pedido_id, sku, qtd, preco_unit, desconto, flag_ruptura | ~207.000 |
| `estoque_movimentos.csv` | data, sku, tipo (entrada/saida/ajuste), qtd, saldo | ~93.000 |
| `metas.csv` | vendedor_id, mes, meta_valor | 360 |

**Padrões plantados nos dados** (para o dashboard "descobrir"): sazonalidade forte no verão e em datas festivas; curva ABC realista (20% dos SKUs = 78% da receita); rupturas concentradas nos top-50 SKUs; ~90 clientes com padrão de churn (queda progressiva de frequência nos últimos 4 meses); 2 vendedores consistentemente abaixo da meta.

### 3.3 Arco narrativo do case (estrutura do texto no site)

1. **O problema** — a dor descrita acima, com números ("3 dias para fechar o relatório", "8% de pedidos com ruptura").
2. **O diagnóstico** — entendimento do processo, mapeamento das fontes de dados (ERP fictício exportando CSVs).
3. **A solução em 4 camadas** — (a) **Python**: pipeline de tratamento e modelagem dos dados; (b) **Power BI**: dashboard com 4 páginas — *Visão Executiva*, *Vendas & Clientes*, *Estoque & Ruptura*, *Metas & Vendedores*; (c) **Power Automate**: alerta diário de risco de ruptura por e-mail/Teams para o comprador; (d) **IA**: script que gera resumo executivo semanal em linguagem natural a partir dos KPIs (via API do Gemini, com fallback offline por template quando não há `GEMINI_API_KEY`), enviado junto ao alerta.
4. **O resultado (simulado e rotulado como tal)** — tabela antes/depois: relatório gerencial de 3 dias → 20 min; ruptura nos top-50 SKUs de 8,4% → 2,1% (projeção); capital parado −18%; 87 clientes em risco de churn identificados e priorizados para os vendedores.
5. **CTA** — "Sua operação tem uma dor parecida? Vamos conversar."

### 3.4 Entregáveis técnicos do case e sua documentação

| Entregável | Onde vive | Como é documentado |
|---|---|---|
| `gerar_dados.py` + 7 CSVs | `lab/serra-azul/` | Docstring + README com dicionário de dados |
| `especificacao_powerbi.md` | `lab/serra-azul/` | Modelo estrela, lista de medidas DAX, layout das 4 páginas |
| Relatório `.pbix` + link Publish to web | Power BI Service (**montagem manual pelo usuário**, seguindo a especificação) | Screenshots por página em `public/` |
| Fluxo Power Automate | Tenant do usuário (**manual**) | Diagrama + screenshots + descrição passo a passo no MDX |
| `resumo_ia.py` | `lab/serra-azul/` | Código comentado + exemplo de saída real incluído no case |

---

## 4. Arquitetura do site

### Páginas

| Rota | Propósito |
|---|---|
| `/` (Home) | Posicionamento + prova + conversão |
| `/portfolio` | Grid de estudos de caso (1 no MVP, preparado para N) |
| `/portfolio/serra-azul` | Case completo (MDX) |
| `/sobre` | História, stack, credenciais, foto |
| `/contato` | Formulário Formspree + LinkedIn + link para agenda |
| Substack | Link externo no nav ("Blog ↗") e footer; seção RSS na Home |

### Wireframe textual — Home

```
[Header: logo [SEU_NOME] | Portfólio | Sobre | Blog ↗ | (botão) Agende uma conversa]
[Hero: headline "Transformo dados dispersos em decisões" + subheadline
 (dashboards, automações e IA para operações que não podem esperar)
 + CTA primário "Ver estudos de caso" + CTA secundário "Fale comigo"]
[Faixa de serviços: 3 cards — Dashboards Power BI | Automações Power Platform | IA aplicada]
[Case em destaque: card grande da Serra Azul com screenshot do dashboard + métrica de impacto]
[Últimos artigos: 3 posts via RSS do Substack + "Assine a newsletter ↗"]
[CTA final: bloco de conversão com formulário curto ou botão p/ /contato]
[Footer: links, LinkedIn, GitHub, Substack, disclaimer geral]
```

### Wireframe textual — Página do estudo de caso

```
[Hero: nome do case + selo "empresa fictícia / dados sintéticos" + resumo de 2 linhas
 + linha de metadados: setor · ferramentas · duração simulada]
[Barra de resultados: 3-4 métricas antes/depois em destaque (componente MetricBeforeAfter)]
[Seção 1: O problema]  [Seção 2: O diagnóstico]
[Seção 3: A solução — subseções por ferramenta, com trechos de código e diagrama do fluxo]
[Dashboard interativo: <PowerBIEmbed> em card com título e instrução de uso;
 mobile → screenshot + botão "Abrir em tela cheia"]
[Seção 4: Resultados detalhados + limitações (transparência sobre simulação)]
[FAQ do case: 5–8 perguntas autocontidas (ex: "Quanto tempo leva um projeto assim?",
 "Funciona com meu ERP?", "Quanto custa um dashboard Power BI?") — visível + FAQPage schema]
[CTA: "Sua operação tem uma dor parecida?" + botão p/ /contato]
[Rodapé do case: "Atualizado em DD/MM/AAAA" + link p/ post derivado no Substack + "próximo case" (placeholder)]
```

### Estratégia de captação de leads

- Botão "Agende uma conversa" fixo no header (todas as páginas).
- CTA contextual ao final de todo case e da Home.
- Formulário em `/contato` com campos: nome, e-mail, empresa (opcional), "qual é a sua dor de dados hoje?" (textarea) — a pergunta aberta já qualifica o lead.
- Links diretos: LinkedIn e WhatsApp (placeholder `[SEU_WHATSAPP]`).

---

## 5. Conteúdo e posicionamento

- **Mensagem central:** "Transformo dados dispersos em decisões — dashboards, automações e IA para operações que não podem esperar."
- **Tom de voz:** consultor sênior, direto, orientado a resultado de negócio. Fala de dor e impacto antes de ferramenta; código e stack aparecem como prova, não como protagonista. Primeira pessoa, sem jargão vazio, sem promessa inflada (os resultados simulados são sempre rotulados).
- **Divisão editorial site × Substack:**
  - **Site (evergreen, conversão):** estudos de caso completos, páginas Sobre/Contato, apresentação de serviços.
  - **Substack (recorrente, autoridade):** bastidores de cada case ("como gerei um dataset realista de distribuidora"), tutoriais, opinião sobre dados/IA para PMEs.
  - **Regra de ligação:** cada case publicado gera 1–2 posts derivados no Substack; cada post derivado linka de volta para o case no site. A Home puxa os 3 últimos posts via RSS.

---

## 6. Otimização para buscadores de IA (AEO/GEO)

Fundamentado na wiki do usuário em `C:\Users\ZBS\Documents\llm-wiki\aeo_geo\wiki\` (páginas: `llms-txt`, `robots-txt`, `schema-markup`, `answer-first`, `conteudo-citavel`, `checklist-otimizacao-conteudo-ia`). Objetivo: o site ser elegível, compreensível e citável por ChatGPT Search, Perplexity, Google AI Overviews e Claude.

### 6.1 Camada técnica (portões de entrada)

- **Renderização server-side:** o App Router do Next.js já entrega HTML completo no servidor — requisito de crawlability atendido por arquitetura. Regra: nenhum conteúdo essencial do case pode existir apenas dentro do iframe do Power BI ou atrás de JS client-side; todo o texto, métricas e tabelas ficam em HTML renderizado.
- **`app/robots.ts` (Template "máxima visibilidade"):** `User-agent: * / Allow: /` + referência ao sitemap. Decisão consciente de **não** bloquear bots de treinamento (GPTBot, CCBot, ClaudeBot): para um consultor construindo autoridade, entrar no corpus dos modelos é benefício, não risco — não há conteúdo proprietário a proteger. Bots de retrieval (ChatGPT-User, OAI-SearchBot, PerplexityBot, Claude-SearchBot, Bingbot) ficam liberados, o que garante presença nas respostas em tempo real.
- **`public/llms.txt`:** Markdown < 10KB com H1 (nome do site) + blockquote de resumo (quem é o consultor, o que faz) + seções H2 com listas `- [Título](url): descrição` para cases, Sobre e Contato. Expectativa calibrada: a evidência disponível (SE Ranking, 300k domínios) mostra que llms.txt **não** aumenta citações em respostas de IA — o valor real é navegação por agentes de IA e o custo é próximo de zero. Implementar como item de higiene, não como estratégia.
- **`app/sitemap.ts` com `lastmod` real** por rota (data do último update do MDX), e data "Atualizado em" visível no rodapé de cada case — freshness é sinal usado por RAG.

### 6.2 Camada de dados estruturados (JSON-LD via `lib/schema.ts` + componente `JsonLd`)

Prioridade para prestador de serviços (conforme wiki: Organization → FAQPage → HowTo → Review; ajustada com o achado Person > Article):

| Schema | Onde | Conteúdo-chave |
|---|---|---|
| **Organization** | Layout global | Nome, url, logo, `sameAs` → LinkedIn, GitHub, Substack (entity linking — fundação de tudo) |
| **Person** | Layout global + `/sobre` | Nome, `jobTitle`, `knowsAbout` (Power BI, Power Automate, Python, IA), `sameAs` — 7x mais presente em páginas citadas por IA que Article; sinal direto de E-E-A-T |
| **Article** | Cada case | `author` (→ Person), `datePublished`, `dateModified`, `headline` |
| **FAQPage** | Seção FAQ da Home (`lib/faq.ts`) e de cada case | 5–8 perguntas; `Question.name` e `Answer.text` **idênticos** ao texto visível (regra técnica obrigatória); respostas de 40–300 palavras. A Home já expõe o FAQ desde a Fase 3.5 lendo `lib/faq.ts` — a Fase 5 apenas liga o JSON-LD à mesma fonte |
| **BreadcrumbList** | Páginas de case | Home → Portfólio → Case |

Validação: todo JSON-LD deve passar sem erros no **validator.schema.org** e no **Rich Results Test** do Google.

### 6.3 Camada de conteúdo (regras de escrita answer-first para o MDX dos cases)

Regras aplicadas na redação do case (Fase 4) — cada uma é verificável no texto final:

1. **Answer capsule:** todo H2 abre com parágrafo-resposta direto de no máximo 80 palavras, autossuficiente (sem "como vimos...", sem anáforas). 78% das citações de IA vêm de pares H2 + primeiro parágrafo.
2. **Headers como perguntas reais** quando fizer sentido: "Como reduzir ruptura de estoque numa distribuidora?", "O que é um pipeline de dados em Python?" — casam com as queries que clientes-alvo fazem à IA.
3. **Dados com fonte nos primeiros 30% da página:** a barra de métricas antes/depois fica logo após o hero (statistics addition: +30–40% de visibilidade); dado quantitativo a cada ~300 palavras.
4. **Seções de 120–180 palavras**, uma ideia por seção (+70% de citações no ChatGPT).
5. **Comparações sempre em tabela HTML real** (antes/depois, ferramentas) — nunca em imagem nem texto corrido (+112% de citações).
6. **Tom factual, zero linguagem promocional** ("solução inovadora que transforma..." = −26% de citações; "ruptura caiu de 8,4% para 2,1% na simulação" = citável). Isso converge com o tom de voz já definido na seção 5.
7. **Comprimento:** case com no mínimo 1.200 palavras de texto corrido (páginas < 1.000 palavras têm citação inferior em todas as verticais).
8. **Conclusão só para CTA** — nenhum dado novo nos últimos 10% da página (últimos 10% = 2–4% das citações).
9. **Multimodal:** screenshots do dashboard com `alt` descritivo e legenda explicativa.
10. **Freshness:** revisão do case a cada ~3 meses com atualização real do `dateModified` (2x mais chance de citação) — entra como rotina pós-lançamento.

### 6.4 O que fica explicitamente fora do MVP (e por quê)

- **Monitoramento de visibilidade em IA** (share of voice, prompts monitorados): relevante só depois de o site ter tráfego e mais de um case; rotina pós-lançamento manual (perguntar a ChatGPT/Perplexity/Claude "consultor de Power BI e automação no Brasil" mensalmente e registrar se/como o site aparece).
- **Consenso offsite:** ~96% das citações de IA vêm de fontes de terceiros, não do site próprio — a alavanca de longo prazo é o Substack, LinkedIn e menções externas, já cobertos pela estratégia editorial da seção 5. O site fornece a âncora de entidade (schema + sameAs) para esse consenso apontar.

---

## 7. Plano de execução por fases

Regra geral: cada fase termina com commit + deploy (quando aplicável). Placeholders `[SEU_NOME]`, `[SEU_LINKEDIN]`, `[SEU_WHATSAPP]`, `[URL_SUBSTACK]`, `[URL_PUBLISH_TO_WEB]` são substituídos pelo usuário quando indicados.

| Fase | Entregável | Critério de "pronto" (verificação binária) |
|---|---|---|
| **0 — Fundação** | Repo GitHub + Next.js 15 + TS + Tailwind v4 + deploy Vercel de página placeholder; `.vercelignore` excluindo `lab/`; Vercel Analytics instalado | ① URL de produção Vercel responde HTTP 200; ② `npm run build` conclui sem erro; ③ repo contém README com instruções de run local |
| **1 — Dataset sintético** | `lab/serra-azul/gerar_dados.py` + 7 CSVs + README com dicionário de dados | ① Script roda sem erro com `python gerar_dados.py`; ② gera exatamente os 7 CSVs da seção 3.2; ③ `pedidos.csv` ≥ 35.000 linhas e `itens_pedido.csv` ≥ 150.000 linhas; ④ datas cobrem jan/2024–jun/2026; ⑤ zero nulos em colunas de chave (validado por bloco `assert` no fim do próprio script); ⑥ duas execuções produzem arquivos idênticos (seed fixa) |
| **2 — Especificação Power BI + IA + automação** | `especificacao_powerbi.md` (modelo estrela, ≥ 15 medidas DAX escritas, layout das 4 páginas); `resumo_ia.py` funcional; doc do fluxo Power Automate (passo a passo + diagrama) | ① Spec lista as 4 páginas nomeadas na seção 3.3 com os visuais de cada uma; ② todas as medidas DAX têm código completo (não pseudocódigo); ③ `resumo_ia.py` roda contra os CSVs e imprime um resumo em PT-BR sem erro; ④ doc da automação tem gatilho, condição e ação definidos |
| **2b — Montagem do .pbix** *(manual, usuário)* | `.pbix` seguindo a spec, publicado via Publish to web; screenshots das 4 páginas salvos em `public/` | ① `[URL_PUBLISH_TO_WEB]` carrega em navegador anônimo; ② as 4 páginas existem com os nomes da spec; ③ 4 screenshots PNG presentes em `public/` |
| **3 — Site core** | Layout global (Header/Footer), Home, `/sobre`, `/contato` com Formspree, componentes `CTASection` e `SubstackFeed` (com fallback estático se o RSS falhar) | ① Rotas `/`, `/sobre`, `/contato` respondem 200 em produção; ② envio de teste no formulário chega ao e-mail configurado; ③ build passa sem warnings de tipo; ④ Lighthouse mobile (produção): Performance ≥ 85 e SEO ≥ 90 na Home; ⑤ nenhuma página exibe texto lorem ipsum |
| **4 — Página do case** | Pipeline MDX (`lib/mdx.ts`), `content/cases/serra-azul.mdx` com o texto completo do arco narrativo seguindo as regras answer-first da seção 6.3, componentes `PowerBIEmbed`, `MetricBeforeAfter` e `FaqSection`, `/portfolio` e `/portfolio/serra-azul` | ① `/portfolio/serra-azul` responde 200 e contém todas as seções do wireframe (hero, métricas, problema, diagnóstico, solução, dashboard, resultados, FAQ, CTA); ② iframe carrega a `[URL_PUBLISH_TO_WEB]` em desktop; ③ em viewport 375px o iframe é substituído por screenshot + botão externo; ④ selo de "empresa fictícia" visível no hero; ⑤ `/portfolio` lista o case com link funcional; ⑥ texto do case tem ≥ 1.200 palavras; ⑦ todo H2 abre com parágrafo de ≤ 80 palavras; ⑧ FAQ com 5–8 perguntas, respostas de ≤ 3 frases; ⑨ barra de métricas antes/depois posicionada antes da seção "O problema"; ⑩ tabelas em HTML real (zero tabelas como imagem) |
| **5 — SEO/AEO, integração e polish** | Metatags OG + títulos únicos por rota, `sitemap.ts` com `lastmod`, `robots.ts` (template máxima visibilidade), `public/llms.txt`, JSON-LD via `lib/schema.ts` + `JsonLd` (Organization, Person, Article, FAQPage, BreadcrumbList conforme seção 6.2), og-image do case, data "Atualizado em" visível no case, links Substack no nav/footer, revisão de copy | ① `sitemap.xml` e `robots.txt` respondem 200, e o robots.txt contém `User-agent: *` + `Allow: /` + linha `Sitemap:`; ② `/llms.txt` responde 200, começa com H1 + blockquote, tem < 10KB e todos os links retornam 200; ③ HTML renderizado do layout contém JSON-LD Organization e Person; o do case contém Article, FAQPage e BreadcrumbList; ④ todos os blocos JSON-LD passam sem erros no validator.schema.org; ⑤ `Question.name`/`Answer.text` do FAQPage são idênticos ao texto visível da seção FAQ; ⑥ toda rota tem `<title>` único e `og:image`; ⑦ link do Substack presente no header e footer de todas as páginas; ⑧ Vercel Analytics registra pageviews; ⑨ data "Atualizado em DD/MM/AAAA" visível na página do case e igual ao `dateModified` do Article schema |
| **6 — Lançamento** | Domínio custom apontado, placeholders substituídos, checklist final | ① Site responde 200 no domínio custom com HTTPS; ② busca por `[SEU_` no código-fonte retorna zero resultados; ③ formulário testado no domínio final; ④ case aberto e navegado de ponta a ponta em mobile e desktop sem erro no console |

Dependências: 1 → 2 → 2b; 0 → 3 → 4 (a fase 4 precisa da 2b apenas para o iframe final — pode ser desenvolvida com URL placeholder e trocada na fase 6); 5 e 6 por último.

---

## 8. Riscos e pontos de atenção

- **Publish to web é público e sem controle de acesso** — aceitável somente porque os dados são sintéticos. Nunca reutilizar esse método com dados de cliente real; documentar isso no case como decisão consciente (vira ponto de autoridade).
- **Iframe do Power BI em mobile** — Publish to web não é responsivo; o fallback por screenshot (Fase 4, critério ③) é obrigatório, não opcional.
- **Dependência de trabalho manual (Fases 2b e Power Automate)** — o agente implementador não tem acesso ao Power BI Desktop nem ao tenant; a spec da Fase 2 precisa ser completa o bastante para o usuário executar sozinho. O site pode ir ao ar com URL placeholder no iframe se a 2b atrasar.
- **Realismo dos dados** — dados "lisos demais" quebram a credibilidade; os padrões plantados (seção 3.2) e ruído aleatório controlado são requisito, não enfeite.
- **Honestidade dos resultados simulados** — rotular tudo como simulação é inegociável; um leitor técnico que perceba números inventados sem rótulo destrói exatamente a autoridade que o site quer construir.
- **Limites de free tier** — Formspree (50 envios/mês) e Vercel Hobby são suficientes para o início; migrar apenas quando houver volume (sinal positivo).
- **Feed RSS do Substack pode falhar/mudar** — o componente `SubstackFeed` tem fallback estático (critério da Fase 3); a Home nunca quebra por causa do feed.
- **Expectativa sobre llms.txt** — a evidência disponível não mostra ganho de citações em respostas de IA; ele entra por custo ~zero e utilidade para agentes, não como aposta de visibilidade. O que move citação é schema + conteúdo answer-first + autoridade offsite.
- **AEO onsite não basta** — ~96% das citações de IA vêm de fontes de terceiros; sem a rotina editorial no Substack/LinkedIn (seção 5), o schema e o llms.txt são âncora sem corrente. O site prepara a entidade; o consenso offsite é trabalho contínuo pós-lançamento.
- **Schema mal implementado ≈ schema ausente** — o experimento controlado da wiki mostra que JSON-LD com erros não gera citação em AI Overviews; por isso a validação no validator.schema.org é critério binário da Fase 5, não sugestão.
- **Escala futura** — a estrutura `content/cases/*.mdx` + `/portfolio/[slug]` já suporta N cases sem refatoração; o segundo case só deve começar após o piloto validar o formato (tráfego + pelo menos 1 lead ou feedback qualitativo).
