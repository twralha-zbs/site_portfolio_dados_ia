# CLAUDE.md — instruções do projeto

Site portfólio de consultoria em dados, automação e IA (Power BI, Power
Platform, Python), sustentado por estudos de caso com empresas fictícias e
dados sintéticos. Next.js 15 + Tailwind v4 na raiz; material dos cases
(scripts Python, datasets, specs) em `lab/`, fora do build do site.

**Status: site em produção.** A construção inicial (fases 0–3.5) terminou; o
projeto agora está em manutenção evolutiva — mudanças pontuais conforme a
empresa e a oferta evoluem, não mais uma sequência linear de fases.

**Idioma: tudo em PT-BR** — código-comentários, commits, documentação e
conversa.

## Modo de trabalho

Os pedidos chegam de tempo em tempo, muitas vezes pontuais; ocasionalmente um
pedido maior precisa ser dividido em etapas.

- **Pedido pontual**: executar e fechar com uma entrada datada no MEMORY.md
  (formato "Sessão AAAA-MM-DD — título", já em uso desde 2026-08-10) — não é
  preciso encaixar em nenhuma fase do PLANO_PROJETO.md.
- **Pedido que exige múltiplas etapas**: planejar antes de executar (plan mode
  ou um plano leve), sem tentar forçar o antigo formato de 7 fases — ele
  descreveu a construção inicial, não é o roteiro do trabalho atual.

## Documentos-guia

- **[MEMORY.md](MEMORY.md)** — diário de bordo por sessão: o que foi feito,
  decisões tomadas (com o porquê) e pendências abertas. **Ler no início de
  toda sessão** para saber onde o projeto parou — é a principal fonte de
  continuidade hoje.
- **[PLANO_PROJETO.md](PLANO_PROJETO.md)** — referência histórica da
  construção inicial: stack decidida, especificação do case Distribuidora
  Serra Azul e regras de AEO/GEO (seção 6). Consultar quando um pedido tocar
  esses tópicos ou um dos itens do escopo original ainda pendente (fase 2b —
  montagem do .pbix; fase 4 — página do case; fase 5 — SEO/AEO; fase 6 —
  lançamento) — não é mais leitura obrigatória a cada sessão.
- **[TWR_PERFIL.md](TWR_PERFIL.md)** e **[NEXIATEND_PERFIL.md](NEXIATEND_PERFIL.md)**
  — bases de conhecimento de marca/produto (fora do build, mesmo espírito do
  `lab/`). Consultar para manter consistência de posicionamento e copy em
  pedidos que tocam texto do site ou materiais comerciais.

## Regra de encerramento de sessão

Ao final de cada sessão de trabalho:
- **atualizar o MEMORY.md** com uma entrada datada (o que foi feito, decisões tomadas com o porquê, pendências abertas)
- verificar se algum Dev server (localhost) foi aberto na sessão. se algum foi aberto, encerre
- fazer commit e push do trabalho da sessão

## Infraestrutura

- Repo GitHub: `twralha-zbs/site_portfolio_dados_ia` (branch `main`).
- Vercel: projeto `twralha-zbs-projects/site-portfolio-dados-ia`; produção em
  https://twralha.com (domínio próprio via Cloudflare → Vercel; a URL
  `.vercel.app` continua existindo mas não é mais a canônica).
- Deploy automático: push na `main` publica em produção (integração
  Git → Vercel conectada).

## Comandos

| Ação | Comando |
|---|---|
| Dev server | `npm run dev` (http://localhost:3000) |
| Build de produção | `npm run build` |
| Lint | `npm run lint` |
| Regenerar dataset do case | `python lab/serra-azul/gerar_dados.py` |
| Resumo executivo com IA | `python lab/serra-azul/resumo_ia.py` (grava `resumo_exemplo.md`) |
| CSV de alerta de ruptura | `python lab/serra-azul/automacao/gerar_alerta_ruptura.py` |

Regenerar o dataset exige as versões pinadas em
`lab/serra-azul/requirements.txt` (seed 42 → saída byte-idêntica; o script se
autovalida com asserts). Os CSVs gerados são commitados no repo.

## Convenções

- `lab/` é excluída do deploy via `.vercelignore` — nada do site pode importar
  de lá.
- Valores reais de contato, marca ou links (placeholders como
  `[URL_PUBLISH_TO_WEB]`) só entram no código quando o **usuário** fornecer o
  dado — nunca inventar um valor real para preencher um placeholder.
- Todo material de estudo de caso exibe o selo "estudo de caso demonstrativo —
  empresa fictícia com dados sintéticos"; resultados simulados são sempre
  rotulados como simulação.
- A montagem do .pbix e o fluxo Power Automate são executados manualmente pelo
  usuário — as specs produzidas aqui precisam ser completas o bastante para
  isso.
- A camada de IA do case usa a **API do Gemini** (`google-genai`, variável
  `GEMINI_API_KEY`), não a da Anthropic — decisão do usuário (Fase 2). O
  `resumo_ia.py` tem fallback offline e nunca deve exigir a chave para rodar
  sem erro. **Nunca gravar a chave em arquivo ou commit.**
