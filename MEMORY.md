# MEMORY.md — diário de bordo do projeto

Registro do que já foi feito, decisões tomadas e pendências, por fase do
[PLANO_PROJETO.md](PLANO_PROJETO.md). **Atualizar ao final de cada sessão de
trabalho** (regra registrada no [CLAUDE.md](CLAUDE.md)).

## Status das fases

| Fase | Entregável | Status |
|---|---|---|
| 0 — Fundação | Repo + Next.js + Vercel | ✅ concluída (2026-07-15) |
| 1 — Dataset sintético | `lab/serra-azul/` | ✅ concluída (2026-07-16) |
| 2 — Spec Power BI + IA + automação | `especificacao_powerbi.md`, `resumo_ia.py`, doc Power Automate | ⬜ próxima |
| 2b — Montagem do .pbix (manual, usuário) | `.pbix` + Publish to web + screenshots | ⬜ |
| 3 — Site core | Layout, Home, Sobre, Contato | ⬜ |
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

## Próximo passo

**Fase 2** — `lab/serra-azul/especificacao_powerbi.md` (modelo estrela, ≥ 15 medidas DAX completas, layout das 4 páginas: Visão Executiva, Vendas & Clientes, Estoque & Ruptura, Metas & Vendedores), `resumo_ia.py` funcional contra os CSVs e documentação do fluxo Power Automate (gatilho, condição, ação). Critérios binários na seção 7 do PLANO_PROJETO.md.
