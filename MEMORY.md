# MEMORY.md — diário de bordo do projeto

Registro do que já foi feito, decisões tomadas e pendências, por fase do
[PLANO_PROJETO.md](PLANO_PROJETO.md). **Atualizar ao final de cada sessão de
trabalho** (regra registrada no [CLAUDE.md](CLAUDE.md)).

## Status das fases

| Fase | Entregável | Status |
|---|---|---|
| 0 — Fundação | Repo + Next.js + Vercel | ✅ concluída (2026-07-15) |
| 1 — Dataset sintético | `lab/serra-azul/` | ✅ concluída (2026-07-16) |
| 2 — Spec Power BI + IA + automação | `especificacao_powerbi.md`, `resumo_ia.py`, doc Power Automate | ✅ concluída (2026-07-16) |
| 2b — Montagem do .pbix (manual, usuário) | `.pbix` + Publish to web + screenshots | ⬜ próxima |
| 3 — Site core | Layout, Home, Sobre, Contato | ✅ concluída (2026-07-17) |
| 3.5 — Melhorias pós-referências | Home: ofertas, método, FAQ, manifesto | ✅ concluída (2026-07-21) |
| 4 — Página do case | MDX + componentes + /portfolio | ⬜ |
| 5 — SEO/AEO e polish | schema, llms.txt, sitemap, OG | ⬜ |
| 6 — Lançamento | domínio + placeholders + checklist | ⬜ |

---

## Fase 0 — Fundação (2026-07-15)

Commits `ac21481` → `c2d9771`.

- Scaffold Next.js 15 (App Router) + TypeScript + Tailwind v4, página placeholder em PT-BR.
- Repo GitHub público: `twralha-zbs/site_portfolio_dados_ia` (branch `main`).
- Projeto Vercel `twralha-zbs-projects/site-portfolio-dados-ia`; produção em https://site-portfolio-dados-ia.vercel.app.
- `.vercelignore` excluindo `lab/` do deploy; Vercel Analytics instalado; README com instruções de run local.
- A integração Git → Vercel falhou na primeira tentativa (app da Vercel não instalado na conta GitHub), mas **foi conectada pelo usuário em seguida**: deploy automático por push na `main` funciona normalmente.

## Fase 1 — Dataset sintético da Serra Azul (2026-07-16)

Commit `b99e14b`.

- `lab/serra-azul/gerar_dados.py` gera os 7 CSVs em `lab/serra-azul/data/` (commitados no repo — o Power BI consome direto, sem rodar Python). `README.md` local traz o dicionário de dados completo; `requirements.txt` pina pandas 2.3.0, numpy 2.3.1 e Faker 40.31.0.
- Volumes finais: 54.807 pedidos, 207.212 itens, 92.882 movimentos de estoque, 1.200 clientes, 250 SKUs, 12 vendedores, 360 metas. Receita média R$ 4,04 mi/mês.
- Padrões plantados e verificados por asserts no próprio script: sazonalidade de verão (dez ~R$ 5,4–5,9 mi vs abr–mai ~R$ 3,2 mi), top-50 SKUs = 74,1% da receita, ruptura em 8,1% dos pedidos (95% nos top-50), 90 clientes em churn (138 → 53 pedidos/mês em mar–jun/26), **vendedores 3 e 9** abaixo da meta em 27–28 dos 30 meses.
- Reprodutibilidade verificada: duas execuções produziram os 7 arquivos com hashes SHA-256 idênticos (seed 42 + versões pinadas).

**Decisões desta fase:**

- **Período ampliado para jan/2024–jun/2026 (30 meses)** — decisão do usuário, divergindo dos 24 meses do plano original; 2024 fechado permite comparação de ano completo (2024 vs 2025) no dashboard. PLANO_PROJETO.md já atualizado (seção 3.2 e critérios da Fase 1).
- Meta dos vendedores calculada sobre o **histórico do próprio vendedor** (potencial da carteira × perfil sazonal da empresa × folga de 8%), não sobre a média regional — carteiras têm tamanhos diferentes e a média regional deixava vendedores normais estruturalmente abaixo da meta. Para os vendedores fracos, a meta usa o potencial corrigido da carteira (por isso ficam abaixo).
- Atributos internos do gerador (frequência de compra, flag de churn) **não são gravados nos CSVs** — o churn deve ser descoberto pelo comportamento, não lido de uma coluna.
- Estoque: `qtd` assinada (entrada +, saída −, ajuste −), saídas espelham as vendas dia × SKU, reposição subdimensionada de propósito nos top-50 durante o verão (explica as rupturas), saldo nunca negativo.

## Fase 2 — Spec Power BI + IA + automação (2026-07-16)

- **`lab/serra-azul/especificacao_powerbi.md`**: ETL Power Query (locale en-US
  nos decimais, merge `itens_pedido`+`pedidos` → `fVendas`, carga de `pedidos`
  desabilitada), modelo estrela com `dCalendario` DAX e 9 relacionamentos,
  **22 medidas DAX completas** em 6 pastas, layout das 4 páginas (visuais,
  campos, formatação condicional, tema de cores) e checklist de montagem com
  valores de validação (Receita ≈ R$ 121 mi, ruptura ≈ 8%, top-50 ≈ 74%,
  churn ≈ 98) — ponte para a Fase 2b.
- **`lab/serra-azul/resumo_ia.py`**: calcula KPIs do mês mais recente da base
  (receita vs. mês anterior e YoY, ruptura, top-5 SKUs, churn, vendedores vs.
  meta) e gera resumo executivo em PT-BR. Testado nos dois modos: **API do
  Gemini** (saída real gravada em `resumo_exemplo.md`) e **offline** (template
  determinístico, exit 0 sem chave). `google-genai==2.11.0` pinado no
  `requirements.txt`.
- **`lab/serra-azul/automacao/`**: `fluxo_ruptura.md` (gatilho recorrência
  07:00, fonte CSV no OneDrive, condição ≥ 1 SKU em risco, ação e-mail
  Outlook + Teams opcional, diagrama mermaid, passo a passo, variante semanal
  com o resumo IA, checklist de teste) e `gerar_alerta_ruptura.py` que produz
  o `alerta_ruptura.csv` (exemplo commitado com 8 SKUs, gerado com
  `--data-referencia 2026-02-10`).

**Decisões desta fase:**

- **API do Gemini no lugar da Anthropic** (decisão do usuário: possui
  `GEMINI_API_KEY`, não possui chave Anthropic), com fallback offline para o
  script rodar sem erro em qualquer máquina. PLANO_PROJETO.md (seção 3.3)
  atualizado.
- **Fluxo Power Automate lê CSV no OneDrive/SharePoint** (decisão do usuário),
  não consulta o dataset Power BI — evita dependência de licença Pro e de a
  Fase 2b estar concluída.
- **Regra de churn compara com o mesmo trimestre do ano anterior** (≥ 6
  pedidos antes, ≤ 50% agora): a comparação com o trimestre imediatamente
  anterior confundia sazonalidade com churn (349 falsos positivos vs. ~90
  plantados); a regra YoY encontra 98. Mesma lógica na medida DAX e no
  `resumo_ia.py`.
- **CSV de alerta de exemplo gerado no pico do verão (10/02/2026)**: na última
  data da base (jun/2026, baixa temporada) nenhum SKU fica com cobertura < 7
  dias e o arquivo sairia vazio; a data de pico produz 8 SKUs reais para
  testar o ramo "Sim" do fluxo.

## Fase 3 — Site core (2026-07-17)

- **Dados reais aplicados** (fornecidos pelo usuário): Thiago Waldowski Ralha
  (grafia correta; o currículo-fonte tem o typo "Waldowksi"), marca **TWR**,
  LinkedIn/GitHub `twralha`, WhatsApp +55 11 98483-6740, Formspree `xjgnyzqk`,
  agenda https://cal.com/twralha, Substack https://twralha.substack.com (URL
  canônica, sem parâmetros de tracking). Tudo centralizado em **`lib/site.ts`**;
  dos placeholders do projeto resta somente `[URL_PUBLISH_TO_WEB]` (Fase 2b).
- **Design**: 3 variantes produzidas sob a skill `impeccable` (PRODUCT.md criado
  na raiz com registro *brand*); usuário escolheu a **V3 "Prisma"** — grafite
  escuro + blocos de azul comprometido, Bricolage Grotesque (display) + Onest
  (texto), botões pílula. Tokens OKLCH em `app/globals.css` (`@theme`),
  contrastes AA verificados; foco visível e `prefers-reduced-motion` no global.
- **Entregue**: Header (menu mobile acessível, CTA → Cal.com), Footer com
  disclaimer geral, `CTASection`, `SubstackFeed` + `lib/substack.ts` (RSS com
  `revalidate: 3600`, parse sem dependências, fallback "em breve" — o feed
  existe mas ainda tem 0 posts), Home completa (hero, faixa de serviços,
  case Serra Azul com métricas antes/depois, artigos, CTA), `/sobre`
  (narrativa em 1ª pessoa a partir do currículo base + projetos reais
  verificáveis + foto em `public/thiago-ralha.jpg`), `/contato`
  (`ContactForm` client com estados + canais diretos), `/portfolio`
  provisório (evita 404; grid real é da Fase 4).
- **Verificação**: lint e build limpos (8 rotas estáticas); QA visual via
  navegador headless em 1280px e 375px; console sem erros (só o 404 do script
  do Vercel Analytics, esperado fora da Vercel); **envio de teste do formulário
  retornou 200 do Formspree** com estado "Mensagem enviada" na UI; zero
  placeholders/lorem no código do site.

**Decisões desta fase:**

- Headline do hero é a da variante aprovada ("Dados dispersos, decisões
  claras.") e não a frase literal do plano-mestre; a mensagem original segue
  em `site.headline` para metadata.
- Setas "↗" com variation selector U+FE0E (senão o Windows renderiza emoji).
- `PRODUCT.md`/`DESIGN.md` (skill impeccable) vivem na raiz; DESIGN.md ainda
  não gerado (rodar `/impeccable document` quando quiser).
- SEO local para capitais do Brasil: registrado para a **Fase 5** (pedido do
  usuário em 2026-07-17).

## Fase 3.5 — Melhorias pós-referências (2026-07-21)

Origem: usuário adicionou `referencias.md` com dois sites (duncanboyne.co.uk —
consultor de Power BI, concorrente direto; luccabuilds.com — dev indie "build
in public"). Analisados ao vivo (texto + screenshots). Extraídas boas práticas
**estruturais/de conversão**, sem redesign — o Prisma foi mantido. Do Lucca
pegamos estrutura, não a estética terminal/verde (público-alvo diferente).

Entregue na Home ([app/page.tsx](app/page.tsx)):

- **Ofertas produtizadas** (substituem os 3 cards genéricos): 4 ofertas nomeadas
  com escopo e CTA próprio por card — *Diagnóstico de Dados & BI* (oferta de
  entrada → Cal.com), *Construção de dashboards & relatórios*, *Automação de
  fluxos*, *IA aplicada* (→ /contato). Bloco azul, cards em grid 2×2.
- **Seção de método** `components/ProcessoTrabalho.tsx`: fluxo de 5 passos
  (diagnóstico → pipeline Python → modelo & dashboard Power BI → automação →
  IA), setas → no desktop e ↓ no mobile. **Reutilizável no case (Fase 4)**.
- **FAQ answer-first** `components/FaqSection.tsx` + `lib/faq.ts` (6 perguntas,
  respostas ≤ 80 palavras, `<details>` nativo sem JS). `lib/faq.ts` é fonte
  única a ser reaproveitada pelo JSON-LD FAQPage na Fase 5.
- **"O problema" + "Para quem é"**: reframe ("Você não tem falta de relatórios.
  Tem falta de relatórios em que dá pra confiar.") + 4 cards de verticais
  (atacado/distribuição, varejo, indústria, serviços).
- **Citação-manifesto do fundador** com a foto: "Minha missão é tornar seu
  negócio mais eficiente com IA, análise de dados e automação de processos."

Funil final da Home: hero → problema/para quem é → ofertas → método → case →
manifesto → FAQ → artigos → CTA.

**Decisões desta fase:**

- **Ofertas SEM preço** ("valor sob consulta"): decisão do usuário — produtiza e
  nomeia as ofertas (padrão Boyne), mas sem publicar valores.
- **Não copiar** os contadores de clientes reais do Boyne ("19+ projetos"): os
  números do site têm que ser verificáveis; a base do case é sintética e rotulada.
- **FAQ com `<details>` nativo** (server component, sem JS): acessível e o texto
  fica no HTML mesmo fechado (requisito de AEO).

**Verificação:** `npm run lint` e `npm run build` limpos (8 rotas estáticas);
QA visual no dev server em 1280px e 375px sem quebra; console sem erros; 6 itens
de FAQ e o manifesto presentes no DOM renderizado.

**Pendência para a Fase 5:** ligar o JSON-LD `FAQPage` da Home lendo `lib/faq.ts`
(mesma fonte do texto visível).

## Sessão 2026-08-10 — domínio, hero, favicon, atendimento WhatsApp/CRM e portfólio

Sessão fora do plano de fases original (PLANO_PROJETO.md), a partir de um plano
próprio (`vamos-repensar-algumas-coisas-shiny-lagoon.md`). Seis mudanças, três
delas estruturais.

- **Domínio próprio**: `twralha.com` (Cloudflare → Vercel) virou a
  `urlProducao` única em `lib/site.ts`, propagada a `metadataBase` e todo OG/
  canonical. `CLAUDE.md` atualizado; a URL antiga `.vercel.app` segue existindo,
  mas deixou de ser a canônica.
- **Hero**: "Dados dispersos, decisões claras." → "De dados dispersos a
  decisões claras.", explicitando a transformação. `site.headline` alinhado
  (divergência herdada da Fase 3 corrigida).
- **Favicon**: `app/favicon.ico` (padrão do Next) deletado; `app/icon.svg`
  criado com quadrado arredondado azul + "T" geométrico nos tokens OKLCH do
  projeto. `app/icon.png` e `app/apple-icon.png` ficam pendentes — o usuário
  gera a arte a partir do prompt no plano e os arquivos entram depois sem
  conflito com o SVG.
- **Novo serviço — Atendimento, CRM e IA no WhatsApp**: plataforma white
  label contratada pelo usuário, oferecida sob a marca TWR como **porta de
  entrada em PMEs** (dor imediata de atendimento, depois expande para dados/
  BI/IA). Conteúdo extraído de
  `C:\Users\ZBS\Documents\projetos_claude\twr_crm\Proposta_de_Valor_Helena_CRM.md`.
  Nova rota `/atendimento-whatsapp` (hero, problema, números do WhatsApp com
  fontes citadas, 8 módulos, tabela de planos por porte sem preço, seção
  "cunha" ligando de volta a dados/portfolio, FAQ própria, CTA). Card largo no
  topo do bloco azul da Home; link no Footer; **sem item no menu** (D1: não
  diluir o posicionamento de consultor de dados na primeira leitura).
- **`lib/servicos.ts`** (novo) extrai as 4 ofertas antigas de `app/page.tsx`
  e adiciona `ofertaEntrada` (WhatsApp/CRM) — fonte única, mesmo padrão de
  `lib/faq.ts`.
- **`lib/cases.ts`** (novo): `casesDemonstrativos` (Serra Azul, rede de
  colégios em simulados, força de vendas — todos sintéticos) e
  `projetosProprios` (ELAS JOGAM). Consumido pela Home (grade compacta,
  aponta para `/portfolio`) e por `/portfolio` (dois blocos separados por
  `border-t`, sem rota `/portfolio/[slug]` ainda — isso é Fase 4).
- **ELAS JOGAM**: perfil de esporte feminino brasileiro (`@elasjogambr`)
  descrito a partir de `C:\Users\ZBS\elas-jogam\README.md` e
  `marca/identidade.md`; sem `href` no card (perfil ainda não está no ar).
- **`lib/faq.ts`**: resposta de "O que faz um consultor de dados e BI?" ganhou
  uma frase citando o atendimento/CRM como porta de entrada; novo array
  `faqWhatsapp` (6 perguntas) para a página nova.

**Decisões desta sessão (D1–D8, ver o plano para o texto completo):** página
própria para o WhatsApp + card na Home · nome descritivo assinado TWR (sem
virar nome de produto por ora) · case de força de vendas sintético · Elas
Jogam em bloco "Projeto próprio" separado · favicon monograma "T" · grade
compacta dos 4 projetos na Home · card largo do CRM no topo do bloco de
ofertas · planos por porte sem preço.

**Risco registrado, não resolvido**: as estatísticas do WhatsApp (Opinion Box/
Hazlo/CNN Brasil) vêm do material comercial do fornecedor da plataforma — sem
verificação na fonte primária. Entraram com atribuição visível; se o usuário
preferir, a seção pode virar qualitativa.

**Pendência para a Fase 5**: a página nova herda JSON-LD `FAQPage`, `Service`
schema e entrada no `sitemap.xml` — ainda não implementados (Fase 5 como um
todo segue pendente).

## Sessão 2026-08-24 — naming do produto de atendimento no WhatsApp/CRM

Sessão fora do plano de fases, a partir do TWR_PERFIL.md (seção
"Atendimento, CRM e IA no WhatsApp"). Objetivo: definir marca própria para a
plataforma white label licenciada pelo usuário, hoje descrita no site sem
nome de produto próprio.

- Esclarecido antes do brainstorm: não é revenda white label para terceiros,
  é marca própria da TWR sobre uma plataforma licenciada, vendida direto aos
  clientes finais.
- Brainstorm em rodadas (agnóstico de canal, referenciando WhatsApp,
  referenciando TWR) até o usuário propor **"Conecta Central"**.
- Verificação de mercado: sem concorrente relevante usando o nome no espaço
  de CRM/atendimento via WhatsApp no Brasil (único achado próximo, "Central
  Conecta" provedora de internet na Bahia, ordem invertida e mercado
  diferente). Domínio conectacentral.com.br confirmado disponível pelo
  usuário.
- **Nome definido: ConectaCentral** (grafia oficial em uma palavra, estilo
  CamelCase; "Conecta Central" com espaço aceitável em texto corrido).
- **Tagline principal**: "De conversas dispersas a atendimento organizado."
  (eco proposital do posicionamento da TWR, "De dados dispersos a decisões
  claras.").
- **Tagline secundária**: "Conecte com seus clientes. Centralize seu
  atendimento."
- **Selo de origem**: "by TWR Tech", assinatura discreta (rodapé/seção
  "sobre"), mantendo o produto como marca independente na comunicação
  principal com o cliente.
- Tudo registrado em **[CONECTACENTRAL_PERFIL.md](CONECTACENTRAL_PERFIL.md)**
  (novo, raiz do projeto, mesmo papel do TWR_PERFIL.md: fora do build,
  material de apoio).

**Decisões desta sessão:**

- Nome descritivo (conectar + centralizar) escolhido deliberadamente pela
  clareza imediata para o público de PME pouco digitalizada, mesmo sabendo
  que termos descritivos têm proteção de marca mais limitada no INPI.
- Nome não referencia WhatsApp nem IA de propósito: mantém a marca agnóstica
  de canal (a plataforma já cobre Instagram Direct e pode crescer) e deixa a
  IA a cargo do posicionamento, não do nome.

**Pendências:**

- Nenhuma alteração de código nesta sessão, só o documento de decisões.
  Aplicar o nome/tagline no site (`/atendimento-whatsapp`, Home) e em
  materiais comerciais é trabalho futuro, ainda não agendado em nenhuma fase.
- Registrar o domínio conectacentral.com.br, avaliar registro de marca no
  INPI e definir identidade visual (logotipo, paleta).

## Sessão 2026-08-24 (cont.) — CNPJ, marca TWR Tech e aplicação do ConectaCentral

Motivada pela aquisição futura de um número de WhatsApp comercial via API
oficial da Meta, que exige verificação de negócio: site ativo com SSL
(já atendido, `twralha.com`) e **CNPJ + Razão Social visíveis no rodapé**.
Dados vieram de `C:\Users\ZBS\Documents\ConsultoriaTWR\Documentos\contatos_condicoes.md`.

- **`lib/site.ts`**: `marca` passou de `"TWR"` para `"TWR Tech"` (nome
  fantasia formal) — propaga sozinho para o logo do header, `aria-label` e o
  template de título (`%s · TWR Tech`) em todas as páginas. Campos novos
  `razaoSocial` ("THIAGO WALDOWSKI RALHA CONSULTORIA EM TECNOLOGIA DA
  INFORMACAO LTDA") e `cnpj` ("68.666.679/0001-96").
- **`components/Footer.tsx`**: linha discreta com razão social + CNPJ
  abaixo do disclaimer de estudos de caso demonstrativos, confirmada no HTML
  estático via `curl` (renderiza server-side, sem depender de JS).
- **Naming ConectaCentral aplicado** (fechando a pendência da sessão
  anterior, mesma data): `lib/servicos.ts` (`ofertaEntrada` — título,
  formato com selo "by TWR Tech", descrição com a tagline, CTA), e
  `app/atendimento-whatsapp/page.tsx` (metadata, H1 "ConectaCentral", selo
  "by TWR Tech" no hero, tagline "De conversas dispersas a atendimento
  organizado.", primeira menção de nome nas seções "O problema" e
  "Organizado o atendimento...", CTA final). Link do footer "Atendimento
  WhatsApp" → "ConectaCentral". FAQ (`lib/faq.ts`) e o restante do corpo da
  página ficaram genéricos ("a plataforma"), por escopo combinado com o
  usuário.
- **Fora de escopo, deliberado**: rota continua `/atendimento-whatsapp` (sem
  renomear para `/conectacentral`); sem identidade visual própria do
  ConectaCentral ainda.

**Verificação**: `npm run lint` e `npm run build` limpos (9 rotas
estáticas); dev server + `curl` confirmaram CNPJ/razão social no HTML da
Home, `<title>` com "TWR Tech" e "ConectaCentral", selo "by TWR Tech" e CTA
"Conhecer o ConectaCentral" no card da Home.

## Sessão 2026-08-24 (cont. 3) — correção de posicionamento: TWR Tech não opera o ConectaCentral pelo cliente

O card do ConectaCentral na Home e a página `/atendimento-whatsapp` diziam
"Eu implanto, configuro e opero para você" (hero, meta description e card
da Home — 3 ocorrências da mesma frase, achadas por busca no repo, não só
as 2 que o usuário tinha citado). Isso está errado: a TWR Tech não opera a
plataforma no dia a dia pelo cliente.

- **Frase removida** nos 3 lugares (`lib/servicos.ts` — `ofertaEntrada.descricao`;
  `app/atendimento-whatsapp/page.tsx` — `metadata.description` e parágrafo do
  hero), sem substituir por uma versão "corrigida" equivalente — decisão do
  usuário.
- **Novo item de FAQ** em `lib/faq.ts` (`faqWhatsapp`), "O que está incluso
  ao contratar o ConectaCentral?", posicionado depois de "Minha equipe
  precisa entender de tecnologia para usar?": explica que a contratação
  inclui implantação completa, treinamento da equipe e suporte contínuo —
  mas a operação diária (atender clientes, conduzir o funil) é da equipe do
  cliente, não da TWR Tech.

**Decisão de posicionamento por trás da correção:** TWR Tech **implanta,
treina e dá suporte** — não opera a plataforma pelo cliente. Vale para
qualquer copy futura do ConectaCentral (materiais comerciais, novas páginas,
proposta comercial): não descrever a TWR Tech como operadora do dia a dia.

**Verificação**: `npm run lint` e `npm run build` limpos (9 rotas estáticas);
`curl` no dev server confirmou o texto novo no HTML de `/` e
`/atendimento-whatsapp` (hero, card e FAQ), e grep por "opero/opera para
você" não retorna mais nenhum resultado no código.

## Sessão 2026-09-13 — revisão do CLAUDE.md para o estágio de manutenção evolutiva

Pedido do usuário: o `CLAUDE.md` foi escrito na Fase 0 ("construir o site do
zero" seguindo o `PLANO_PROJETO.md`), mas o projeto já mudou de estágio desde
2026-08-10 (sessões pontuais fora do plano de fases). Revisão feita em plan
mode; usuário conferiu o plano e ainda ajustou o resultado.

- **Abertura do arquivo**: novo parágrafo de status ("site em produção",
  manutenção evolutiva) substituindo o tom de "construção".
- **Nova seção "Modo de trabalho"**: pedido pontual → executa e fecha com
  entrada datada no MEMORY.md; pedido em várias etapas → planeja antes
  (plan mode/plano leve), sem forçar o formato de 7 fases do
  `PLANO_PROJETO.md`.
- **"Documentos-guia" reenquadrado**: `PLANO_PROJETO.md` deixa de ser leitura
  obrigatória a cada sessão e vira referência histórica/técnica (consultar
  para os itens do escopo original ainda pendentes — fases 2b, 4, 5, 6 — e
  para as regras de AEO/GEO da seção 6). Adicionados pointers para
  `TWR_PERFIL.md` e `CONECTACENTRAL_PERFIL.md` (bases de marca/produto que já
  existiam mas não estavam referenciadas no CLAUDE.md).
- **Regra de placeholders generalizada**: em vez de listar os tokens de
  2026-07 (a maioria já resolvida), a regra agora é durável — nenhum valor
  real de contato/marca/link entra no código sem o usuário fornecer o dado.
- **Regra de encerramento de sessão ampliada pelo usuário** (ajuste feito
  depois da minha proposta, direto no arquivo): além de atualizar o
  MEMORY.md, passa a incluir **verificar se algum dev server (localhost) ficou
  aberto na sessão e encerrá-lo**, e **fazer commit e push** (antes só
  commitava) — daqui pra frente as sessões neste projeto terminam com push
  automático, não só commit local.

**Decisão desta sessão:** o `PLANO_PROJETO.md` não foi descartado nem
reescrito — continua valendo como spec técnica para os itens ainda pendentes
do escopo original; só deixou de ser o roteiro que toda sessão precisa ler.

## Sessão 2026-09-13 (cont.) — rename ConectaCentral → NexIAtend

Pedido do usuário: trocar o nome do ConectaCentral por um nome tecnológico
que deixasse explícito o uso de IA/agentes de IA no atendimento — o naming
anterior tratava "IA" só no posicionamento, não no nome em si. Feito em plan
mode, com pesquisa de mercado antes de decidir.

- **Pesquisa de concorrentes** (mercado BR de atendimento/CRM via WhatsApp
  com IA): Zenvia, Take Blip, Octadesk, Digisac, Huggy, Umbler Talk, Kommo,
  JivoChat, Zaia — preço, perfil de cliente e proposta de valor de cada um
  registrados em `NEXIATEND_PERFIL.md`. Leitura: o NexIAtend compete melhor
  na faixa de PME que quer atendimento organizado com implantação
  acompanhada por um consultor, diferencial que as ferramentas self-service
  (Zaia e correlatos) não oferecem.
- **Candidatos testados e descartados por colisão de nome**: "AtendeIA"/
  "ConectaIA" (padrão saturado por concorrentes diretos: AtendeIA,
  Atendente.AI, AtendimentoIA, Atendaz, um app "ConectaIA"), "NexIA"
  (colisão direta com pelo menos 3 empresas brasileiras no mesmo nome e
  mercado) e "ConectAI" (padrão "Conecta/Connect + AI" ainda mais saturado,
  incluindo um concorrente quase idêntico em posicionamento —
  conectaai.app). Detalhes completos em `NEXIATEND_PERFIL.md`.
- **Nome escolhido: NexIAtend** — proposto pelo usuário, sem colisão
  encontrada em busca na web. Combina nexo (conexão lógica, eco do conceito
  de marca original) + next (IA como próximo passo da evolução do
  atendimento) + IA explícita + tend (atendimento).
- **Rename aplicado**: `app/atendimento-whatsapp/page.tsx` (metadata, H1,
  tagline, texto corrido, CTA), `lib/servicos.ts` (card da Home),
  `components/Footer.tsx`, `lib/faq.ts` (pergunta de FAQ), `CLAUDE.md`
  (pointer de documento). Tagline principal trocada de "De conversas
  dispersas a atendimento organizado." para "O nexo entre atendimento e
  IA." (a anterior dependia do jogo de palavras Conecta/Central).
- **Documento de perfil**: `CONECTACENTRAL_PERFIL.md` foi removido e
  recriado como `NEXIATEND_PERFIL.md`, com o nome atualizado, a pesquisa de
  concorrentes e o histórico completo da decisão de rename (nomes testados,
  por que cada um foi descartado).
- **Fora de escopo, deliberado**: rota continua `/atendimento-whatsapp`
  (sem renomear para `/nexiatend`); identidade visual não revisitada.

**Pendências abertas**: verificar disponibilidade do domínio
`nexiatend.com.br` (não é possível confirmar via busca — fica com o
usuário); avaliar registro de marca no INPI; definir tagline secundária
(a anterior, "Conecte com seus clientes. Centralize seu atendimento.", não
se aplica mais).

**Verificação**: `npm run build` limpo; grep por "ConectaCentral"/"Conecta
Central" no repo não retorna nenhuma ocorrência fora de `NEXIATEND_PERFIL.md`
(histórico do rename, intencional) e das entradas antigas deste próprio
`MEMORY.md` (log, não reescrito).

## Sessão 2026-09-15 — DESIGN.md e implementação da identidade visual TWR Tech

Pedido do usuário: rodar `/impeccable teach`, revisar o projeto e, a partir
daí, gerar o `DESIGN.md` do site incorporando o guia de marca que ele havia
colocado em `twr_brand/` (ativos e `twr-tech-brand-guide_2.md`, gerados fora
desta sessão) e implementar os elementos no site.

- **PRODUCT.md já existia e ficou confirmado como atual** — bate com o código
  em produção, nenhuma reescrita necessária.
- **`DESIGN.md` criado** (formato Stitch: frontmatter YAML + 6 seções fixas),
  extraindo os tokens reais do `globals.css` (variante "Prisma": fundo
  quase-preto, azul comprometido, Bricolage Grotesque + Onest) e incorporando
  o guia de marca do usuário. Norte Criativo cunhado para o sistema: **"A
  Cabine de Instrumentos"** — cockpit técnico, uma cor de ação por tela (regra
  do Acento único), zero `box-shadow`, profundidade só por camadas tonais.
  Sidecar `.impeccable/design.json` gerado junto (tonal ramps, componentes
  HTML/CSS, narrativa).
- **Conversão hex→OKLCH validada**: os hex documentados no guia de marca
  batem quase exatamente com os valores OKLCH já implementados no
  `globals.css` (diferença ≤0,3%) — boa confirmação cruzada de que o guia foi
  extraído corretamente do código real.
- **Gap identificado e documentado** (não corrigido): o guia de marca descreve
  botões com radius de `0.5rem`, mas o código usa pílula total (`rounded-full`)
  em 100% dos CTAs — o `DESIGN.md` registra a realidade do código como regra
  vigente, não o texto do guia.
- **Implementação no site** (escopo escolhido pelo usuário via pergunta
  estruturada — os 4 itens do guia foram aceitos):
  - `app/icon.svg`: favicon trocado do quadrado genérico ("duas barras
    cruzadas", lido como placeholder de framework) pelo símbolo "T" novo do
    usuário (tile Acento/Azul Profundo).
  - `app/apple-icon.png`: `twr_brand/icon-192.png` copiado como está —
    usuário optou por não gerar um PNG de 180×180 dedicado.
  - `app/manifest.ts` (novo): gera `/manifest.webmanifest` via convenção de
    metadata do Next.js, referenciando `public/icon-192.png` e
    `public/icon-512.png` (copiados de `twr_brand/`).
  - `app/globals.css`: tokens `--color-sucesso` / `--color-alerta`
    adicionados ao `@theme` (OKLCH calculado a partir do hex do guia,
    desaturado na mesma temperatura fria da paleta azul — evita efeito
    "semáforo" de BI genérico) e `--font-mono` apontando para JetBrains Mono.
  - `app/layout.tsx`: carrega JetBrains Mono via `next/font/google`.
- **Fora de escopo por ora, documentado como pendência**: nenhum componente
  usa `font-mono` ainda — o site não tem nenhum KPI/número hoje (a página do
  case, Fase 4, ainda não existe). Aplicar a fonte monoespaçada assim que essa
  página for construída.

**Verificação**: `npm run build` limpo (Turbopack), `app/icon.svg`,
`app/apple-icon.png` e `/manifest.webmanifest` testados via HTTP em dev server
(conteúdo confirmado, servidor encerrado em seguida).

## Sessão 2026-09-15 — Planejamento da reestruturação do site em torno de produtos (TWR Tech)

Pedido do usuário: o site nasceu como portfólio de consultor independente, mas
a estratégia real da empresa pivotou — TWR Tech agora é uma empresa de
produtos (NexIAtend, um produto de SEO/AEO/GEO ainda sem nome, e consultoria
de dados/processos como terceiro produto), com a consultoria deixando de ser
"a oferta" pra virar um produto entre três. Pediu pra reestruturar o site
pra refletir isso, mantendo os estudos de caso (não mais o centro) e criando
uma seção "Projetos" separada pro Elas Jogam. Sessão só de planejamento —
nenhum código de produção foi alterado, só documentos.

**Pipeline rodado**: `/office-hours` (modo Startup) → `/plan-eng-review` →
`/plan-design-review`, encadeados numa sessão só.

### `/office-hours`

- **Diagnóstico** (usuário já tem clientes pagantes em ambos NexIAtend e
  SEO/AEO/GEO, rota inteligente pulou Q1-Q3): Q4 revelou pricing já fechado
  (implantação variável + fee mensal recorrente pra ambos); Q5 revelou que a
  entrega de ambos é hoje 100% operada pelo usuário, não self-serve (cliente
  do NexIAtend só conversa, cliente do SEO/AEO/GEO só aprova entregáveis) —
  "nada surpreendente até agora" foi honesto, não inflado; Q6 (future-fit),
  depois de empurrado além de "aposta em tendência geral de IA", virou tese
  específica: AEO/GEO como corrida de posicionamento antes da busca migrar
  pra IA, e WhatsApp+IA como padrão mínimo de atendimento no Brasil.
- **EUREKA registrado**: o pivô pra "produto" não precisa esperar self-serve
  — NexIAtend e SEO/AEO/GEO já são *productized services* (preço fixo,
  processo repetível) mesmo com entrega manual hoje. Self-serve é o próximo
  degrau da escada, não pré-requisito pra reestruturar o site.
- **Premissas confirmadas**: (1) copy nunca em primeira pessoa pra falar de
  entrega, sempre atribuído à TWR Tech; (2) Elas Jogam sai de
  `projetosProprios` (hoje misturado no portfólio) e ganha rota `/projetos`
  própria; (3) consultoria de dados vira terceiro produto mantendo escopo
  aberto como descrito pelo usuário (não reduzida a SKU fixo — confirmado
  mesmo depois de um subagente desafiar essa decisão).
- **Segunda opinião** (subagente Claude, modo Startup): achado mais forte foi
  "nada surpreendente" na Q5 — sinal de que o empacotamento está à frente da
  evidência de uso direto; sugeriu a arquitetura de rotas que virou a base da
  Approach C.
- **Abordagem escolhida**: C (Faseado) — Fase 1 reestrutura home/nav/portfólio
  agora sem esperar naming dos 2 produtos sem nome; Fase 2 (páginas completas)
  fica pra quando houver naming.
- **Mockup** gerado com os tokens reais do `DESIGN.md` (não wireframe cinza
  genérico) via `gstack-render.ts` — decisão registrada como aprendizado, útil
  quando o projeto já tem design system maduro. Iterado 3x com feedback do
  usuário: (1) header+footer ganharam o símbolo da marca
  (`twr_brand/logo-mark.svg`, novo componente `LogoMark`); (2) disclaimer de
  entrega acompanhada e citação do fundador reescritos sem primeira pessoa,
  atribuídos à TWR Tech; (3) regra nova, sem travessão/em dash em nenhum texto
  visível do site — **registrada em `CLAUDE.md` → Convenções**.

### `/plan-eng-review`

- Step 0 achou 8 arquivos tocados (gatilho de complexidade) e, investigando o
  código, achou que a Premissa 1 (nunca primeira pessoa) só tinha sido
  operacionalizada nos Success Criteria pra home — sobrava primeira pessoa em
  `/portfolio`, `/sobre`, `/contato`, `/atendimento-whatsapp`. Usuário decidiu
  incluir tudo na Fase 1.
- Decisões: reaproveitar tipo `Case` existente pra `/projetos` (não criar tipo
  `Projeto` dedicado ainda — virou TODO P3); extrair `LogoMark.tsx`
  compartilhado em vez de duplicar SVG em `Header.tsx`/`Footer.tsx`.
- **Voto externo** (subagente Claude, Codex não instalado) achou 4 problemas
  reais que a revisão nativa perdeu: (1) o levantamento de primeira pessoa não
  era sitewide de verdade — faltavam `lib/faq.ts` (7 respostas), `lib/cases.ts`,
  `ProcessoTrabalho.tsx`, `ContactForm.tsx`, mais 4 dentro do próprio
  `app/**/*.tsx` que o regex perdeu por conjugação verbal; (2) o H1 da home é
  string hardcoded, independente de `site.headline` — editar `lib/site.ts` não
  ia mudar o H1; (3) `Footer.tsx` tem nav própria hardcoded, sem "Projetos"
  depois da Premissa 2; (4) observação de que a Fase 1 corrige a assimetria só
  visualmente, a substância (evidência de produto real) só chega na Fase 2.
  Todos os achados 1-3 foram aceitos e viraram parte do escopo.
- **TODO candidata revertida**: rename de `/atendimento-whatsapp` →
  `/nexiatend` com redirect 301, originalmente adiado por risco de SEO, foi
  puxado de volta pra Fase 1 depois do usuário confirmar blast radius pequeno
  (só `Footer.tsx` e `lib/servicos.ts` referenciam a rota em código).
- Escopo final da Fase 1: **18 arquivos**. `TODOS.md` criado (não existia)
  com 2 itens P3: split de tipo `Projeto` dedicado (gatilho: segundo projeto
  próprio) e setup de framework de testes (projeto não tem nenhum hoje).
- Revisão limpa: 0 pendências, 0 gaps críticos, 11 achados nativos + 4 aceitos
  do voto externo, todos resolvidos.

### `/plan-design-review`

- Nota inicial 6/10 — faltava tratamento mobile (mockup só existia em
  1280px) e estados de interação dos elementos novos.
- Mobile verificado renderizando o mesmo HTML em 375px (em vez de gerar
  variantes estéticas novas pelo `$D` — decisão registrada como aprendizado:
  pra validar responsividade de um mockup já aprovado, re-renderizar é mais
  preciso que gerar imagem nova). Achou 2 problemas reais na primeira versão
  mobile: grade de 3 produtos e grade de 2 cases não empilhavam (ficavam
  espremidas em 3/2 colunas até em tela de celular) — corrigido com
  `grid-cols-1 sm:grid-cols-3`/`sm:grid-cols-2`, mesmo padrão já usado em
  `app/page.tsx`.
- 7 passadas completas, 6 decisões aplicadas: diagrama ASCII de navegação,
  tabela de estados de interação (site estático, maioria N/A legítimo),
  storyboard de jornada (achou que 2 dos 3 CTAs de produto terminam em
  `/contato` genérico — copy do CTA já mitiga, confirmado que basta),
  tabela de tokens formais do `DESIGN.md`, `LogoMark` do footer também como
  link pra `/` (consistência com o header), layout de `/projetos` espelhando
  o card já usado em `/portfolio`.
- Revisão limpa: 8/10, 0 pendências. Nenhum gap fundamental de produto (não
  justificou `/plan-ceo-review`) nem necessidade de exploração visual nova
  (não justificou `/design-shotgun`).

**Artefatos gerados**:
- `docs/designs/reestruturacao-produtos-twr-tech.md` — design doc completo,
  Status: APPROVED, com as duas revisões incorporadas.
- `docs/designs/reestruturacao-produtos-twr-tech/sketch.png` (desktop) e
  `sketch-mobile.png` (375px) — mockups aprovados.
- `TODOS.md` — novo, 2 itens P3.
- `CLAUDE.md` — regra nova de "sem em dash no site" + seção de skill routing
  do gstack.

**Verificação**: nenhuma — sessão só de planejamento, nenhum `npm run build`
rodado (nada de código de produção mudou).

## Sessão 2026-09-15 (cont. 2) — Implementação da Fase 1: site em torno de produtos

Execução completa das ~18 tasks (T1-T18) de
`docs/designs/reestruturacao-produtos-twr-tech.md`, aprovado na sessão
anterior no mesmo dia. Sem repetir o planejamento, só implementação + QA.

- **`lib/site.ts`**: `headline` → "Atendimento, presença e dados prontos pra
  escalar", `subheadline` → texto dos 3 produtos, `titulo` → "NexIAtend,
  SEO/AEO/GEO e Consultoria de Dados | TWR Tech" (campo que era morto —
  `app/layout.tsx` agora lê `site.titulo` em vez de string hardcoded).
- **`lib/servicos.ts` refeito**: `ofertaEntrada` + `ofertas[]` (4 itens
  assimétricos) viraram um único `produtos[]` com 3 entradas simétricas
  (NexIAtend, SEO AEO & GEO, Organização de Dados & Processos), os 2 últimos
  apontando para `/contato` (sem rota própria nesta fase).
- **`components/LogoMark.tsx`** (novo): símbolo da marca (`twr_brand/logo-mark.svg`
  embutido inline, `aria-hidden`), usado em `Header.tsx` (ao lado do wordmark)
  e `Footer.tsx` (ao lado do bloco de nome, também como link pra `/`).
- **`app/page.tsx` reescrito**: H1 direto no JSX trocado ("De dados dispersos"
  → "Atendimento, presença e dados prontos pra escalar", já que editar
  `lib/site.ts` não propagava pra ele), disclaimer de entrega acompanhada no
  hero, seção de produtos com `id="produtos"` e os 3 cards simétricos, seção
  de portfólio só com `casesDemonstrativos` (Elas Jogam saiu), citação do
  fundador reescrita em voz de empresa, CTA final idem.
- **Nav do Header**: `Produtos` (âncora `/#produtos`), `Portfólio`, `Projetos`,
  `Sobre`. **Nav do Footer**: ganhou `Projetos`; link do NexIAtend atualizado
  pra `/nexiatend`.
- **Rota `/projetos` (nova)**: card do Elas Jogam movido de `projetosProprios`
  (antes misturado em `/portfolio`), layout espelha o card de `/portfolio`
  (mesmo tipo `Case`, sem tipo novo). `/portfolio` perdeu o bloco "Projeto
  próprio" e teve a metadata corrigida (não cita mais Elas Jogam).
- **Rename de rota `/atendimento-whatsapp` → `/nexiatend`**: `git mv` do
  diretório, `next.config.ts` ganhou `redirects()` (301/308 permanente),
  referências em `Footer.tsx` e `lib/servicos.ts` atualizadas.
- **Primeira pessoa → voz de empresa, sitewide** (17 ocorrências, seguindo o
  levantamento ampliado da sessão de planejamento): `app/page.tsx` (H1, "Fale
  comigo"→"Fale conosco", "Como eu posso ajudar"→"Como ajudamos", CTA final),
  `lib/faq.ts` (5 respostas, `faqHome` e `faqWhatsapp`), `lib/cases.ts`
  (contexto do case Serra Azul), `components/ProcessoTrabalho.tsx` (H2),
  `components/ContactForm.tsx` (mensagem de sucesso **e** de erro, "me chame"
  achado nesta implementação, fora do levantamento original), `app/portfolio/page.tsx`,
  `app/sobre/page.tsx`, `app/contato/page.tsx` (2 trechos), `app/nexiatend/page.tsx`
  (CTA final, "Conto como funciona" → "A TWR Tech explica"). Em todos os casos
  os em dash que apareciam junto do texto reescrito também foram removidos
  (regra do `CLAUDE.md`); em dashes fora do escopo desta revisão (títulos e
  textos não tocados, ex. `lib/cases.ts` outros títulos, `app/nexiatend/page.tsx`
  corpo não tocado) foram deixados como estavam — não é limpeza retroativa
  sitewide, só o texto reescrito nesta fase.

**Verificação**: `npm run lint` e `npm run build` limpos (11 rotas estáticas,
incluindo `/nexiatend` e `/projetos`, sem `/atendimento-whatsapp` como página).
QA visual real no navegador (gstack `/browse`, driver headless `$B` já que
Aside não roda em Windows): redirect 301 confirmado (`/atendimento-whatsapp`
→ `/nexiatend`, 308 no Next dev, equivalente HTTP moderno de permanente),
zero console errors em `/`, `/nexiatend` e `/projetos`, menu mobile em 375px
abre com os 4 itens de nav, âncora `/#produtos` rola corretamente (seção no
topo do viewport após o clique), grade de 3 produtos e de 2 cases empilham em
coluna única no mobile (screenshots capturados), card do NexIAtend navega
para `/nexiatend`, `/projetos` mostra o card do Elas Jogam. Dev server aberto
na sessão foi encerrado ao final.

**Não verificado nesta sessão**: Lighthouse mobile (Success Criteria #3 do
design doc pedia manter os scores atuais) — não rodei a auditoria formal;
risco avaliado como baixo (nenhuma rota existente mudou de URL fora do
redirect já testado, build limpo, sem novos scripts/imagens pesados). Vale
rodar antes do próximo deploy se quiser confirmar.

## Próximo passo

Fase 1 da reestruturação em torno de produtos está implementada e verificada,
falta só o commit/push desta sessão (regra de encerramento do `CLAUDE.md`).

Pendências à parte (não bloqueiam a Fase 1, já registradas antes): nome de
trabalho pro produto de SEO/AEO/GEO e pra consultoria de dados (Assignment do
`/office-hours`, prazo de 2 semanas a partir de 2026-09-15); domínio
`nexiatend.com.br` e registro de marca no INPI; **Fase 2** (páginas completas
`/seo-aeo-geo` e `/organizacao-de-dados`) depende do naming acima, ver
`docs/designs/reestruturacao-produtos-twr-tech.md` (Open Questions e The
Assignment).
