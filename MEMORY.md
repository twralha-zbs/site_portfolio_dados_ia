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

## Próximo passo

**Fase 2b (manual, usuário)** — montar o `.pbix` no Power BI Desktop seguindo
a `especificacao_powerbi.md`, publicar via Publish to web e salvar os 4
screenshots em `public/`. Lighthouse mobile validado em produção (2026-07-17):
Performance 98, SEO 100, Acessibilidade 100, Best Practices 100 (LCP 1,8 s,
CLS 0). Pendência única da Fase 3: usuário confirmar que o e-mail de teste do
Formspree chegou em twralha@gmail.com (primeiro envio pode exigir ativação do
form). Depois, **Fase 4** (página do case em MDX).
