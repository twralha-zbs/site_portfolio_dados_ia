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

## Próximo passo

**Fase 2b (manual, usuário)** — montar o `.pbix` no Power BI Desktop seguindo
a `especificacao_powerbi.md`, publicar via Publish to web e salvar os 4
screenshots em `public/`. Lighthouse mobile validado em produção (2026-07-17):
Performance 98, SEO 100, Acessibilidade 100, Best Practices 100 (LCP 1,8 s,
CLS 0). Pendência única da Fase 3: usuário confirmar que o e-mail de teste do
Formspree chegou em twralha@gmail.com (primeiro envio pode exigir ativação do
form). Depois, **Fase 4** (página do case em MDX).
