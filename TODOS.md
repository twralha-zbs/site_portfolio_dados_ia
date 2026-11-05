# TODOS

## Site

### Fechar o ciclo da ClareIA no Beehiiv (2026-11-05)

**What:** (1) No Beehiiv, definir a "Opt in redirect URL" como `https://twralha.com/clareia/obrigado`. (2) Inscrição de teste do começo ao fim (formulário no site, email de confirmação, clique, página de obrigado, email de boas-vindas). (3) Inscrição feita de `twralha.com/clareia?utm_source=teste` aparecendo no Beehiiv com origem `teste`. (4) Ajustar o design do formulário no editor do Beehiiv para o tema escuro do site: fundo transparente ou Painel `#1B2025`, texto `#E5E8EC`, botão `#52AFE7` com texto `#06131E`, cantos em pílula, sem título próprio (o painel do site já tem). Hoje ele vem num cartão branco dentro do painel escuro.

**Why:** O embed (`components/InscricaoClareia.tsx`, id em `site.clareiaFormId`) e a página de obrigado estão no ar, mas o redirecionamento e o visual do formulário se configuram na conta do Beehiiv, e o teste depende de uma caixa de email real. O navegador headless não serve para esse teste: o Beehiiv tem desafio anti-bot (PerimeterX) que às vezes segura o formulário.

**Context:** Se o design no Beehiiv mudar a altura do formulário, medir de novo e ajustar o `min-h` do `EmbedBeehiiv` (hoje 380px/420px).

**Effort:** S
**Priority:** P1
**Depends on:** Conta do Beehiiv (usuário)

### Separar tipo Projeto dedicado de lib/cases.ts

**What:** Criar um tipo `Projeto` próprio (sem `selo`, com `status` mais adequado como `ativo`/`em-breve`/`encerrado`) em vez de reaproveitar o tipo `Case` (pensado para estudos de caso) na rota `/projetos`.

**Why:** `Case` tem `selo: "demonstrativo" | "projeto-proprio"` e `status: "em-breve" | "publicado"` — vocabulário desenhado para o contexto do portfólio de estudos de caso. Em `/projetos`, isolado, esses campos ficam vestigiais (sempre `"projeto-proprio"`, nunca comparado a nada). Não é um problema hoje (só existe um projeto, Elas Jogam), mas cresce em confusão conforme mais projetos próprios forem adicionados.

**Context:** Decisão 1A do `/plan-eng-review` de 2026-09-15 (durante a reestruturação do site em torno de produtos, ver `docs/designs/reestruturacao-produtos-twr-tech.md`) foi reaproveitar `Case` como está para não adicionar escopo à Fase 1. Quando um segundo projeto próprio existir, vale revisitar: criar `lib/projetos.ts` com um tipo `Projeto` (título, resumo, contexto, stack, status, href opcional) e migrar `projetosProprios` pra lá, saindo de `lib/cases.ts` de vez.

**Effort:** S
**Priority:** P3
**Depends on:** Existir um segundo projeto próprio (gatilho natural, não uma data)

### Configurar framework de testes automatizados

**What:** Instalar e configurar um framework de teste (provavelmente Playwright, dado que o site é majoritariamente estático com pouca interatividade — menu mobile, formulário de contato, acordeão de FAQ) e escrever a primeira suíte cobrindo os fluxos críticos do site.

**Why:** O projeto hoje não tem nenhum framework de teste instalado — zero arquivos de teste, sem `jest.config`/`vitest.config`/`playwright.config`, sem script `test` no `package.json`. Toda verificação de regressão depende de `npm run build` limpo + checagem manual (Lighthouse, `/qa`). Isso funciona para um site pequeno, mas cada reestruturação (como a de produtos, 2026-09-15) tem que confiar só em revisão manual pra pegar quebras de nav, links e conteúdo.

**Context:** Levantado na Seção 3 (Revisão de Testes) do `/plan-eng-review` de 2026-09-15, ao revisar a reestruturação do site em torno de produtos (`docs/designs/reestruturacao-produtos-twr-tech.md`) — não é uma lacuna dessa PR específica, é estrutural do projeto. Quando priorizar: começar pelos fluxos com mais superfície de quebra silenciosa (nav entre rotas, formulário de contato via Formspree, links de CTA externos pro Cal.com/WhatsApp).

**Effort:** M
**Priority:** P3
**Depends on:** None
