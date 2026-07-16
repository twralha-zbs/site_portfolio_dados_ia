# CLAUDE.md — instruções do projeto

Site portfólio de consultoria em dados, automação e IA (Power BI, Power
Platform, Python), sustentado por estudos de caso com empresas fictícias e
dados sintéticos. Next.js 15 + Tailwind v4 na raiz; material dos cases
(scripts Python, datasets, specs) em `lab/`, fora do build do site.

**Idioma: tudo em PT-BR** — código-comentários, commits, documentação e
conversa.

## Documentos-guia (ler antes de trabalhar)

- **[PLANO_PROJETO.md](PLANO_PROJETO.md)** — plano-mestre e fonte da verdade do
  escopo: stack decidida, case da Distribuidora Serra Azul, 7 fases de execução
  com critérios binários de "pronto" (seção 7) e regras de AEO/GEO (seção 6).
- **[MEMORY.md](MEMORY.md)** — diário de bordo: fases concluídas, decisões
  tomadas e pendências. **Ler no início de toda sessão** para saber onde o
  projeto parou.

## Regra de encerramento de sessão

Ao final de cada sessão de trabalho, **atualizar o MEMORY.md** com o que foi
feito, as decisões tomadas (com o porquê) e as pendências abertas — e commitar
junto com o trabalho da sessão.

## Infraestrutura

- Repo GitHub: `twralha-zbs/site_portfolio_dados_ia` (branch `main`).
- Vercel: projeto `twralha-zbs-projects/site-portfolio-dados-ia`; produção em
  https://site-portfolio-dados-ia.vercel.app.
- Deploy automático: push na `main` publica em produção (integração
  Git → Vercel conectada).

## Comandos

| Ação | Comando |
|---|---|
| Dev server | `npm run dev` (http://localhost:3000) |
| Build de produção | `npm run build` |
| Lint | `npm run lint` |
| Regenerar dataset do case | `python lab/serra-azul/gerar_dados.py` |

Regenerar o dataset exige as versões pinadas em
`lab/serra-azul/requirements.txt` (seed 42 → saída byte-idêntica; o script se
autovalida com asserts). Os CSVs gerados são commitados no repo.

## Convenções

- `lab/` é excluída do deploy via `.vercelignore` — nada do site pode importar
  de lá.
- Placeholders `[SEU_NOME]`, `[SEU_LINKEDIN]`, `[SEU_WHATSAPP]`,
  `[URL_SUBSTACK]`, `[URL_PUBLISH_TO_WEB]` são substituídos **somente pelo
  usuário** (antes/na Fase 6) — nunca inventar valores reais para eles.
- Todo material de estudo de caso exibe o selo "estudo de caso demonstrativo —
  empresa fictícia com dados sintéticos"; resultados simulados são sempre
  rotulados como simulação.
- Fases 2b (montagem do .pbix) e o fluxo Power Automate são executados
  manualmente pelo usuário — as specs produzidas aqui precisam ser completas o
  bastante para isso.
