---
name: TWR Tech
description: "De dados dispersos a decisões claras — site portfólio de consultoria em dados, automação e IA."
colors:
  fundo: "oklch(20.5% 0.008 260)"
  painel: "oklch(24% 0.012 255)"
  linha: "oklch(31% 0.01 255)"
  texto: "oklch(93% 0.006 250)"
  suave: "oklch(72% 0.01 250)"
  apagado: "oklch(64% 0.01 250)"
  azul-profundo: "oklch(38% 0.09 244)"
  azul: "oklch(46% 0.105 242)"
  azul-linha: "oklch(55% 0.09 242)"
  sobre-azul: "oklch(96% 0.01 240)"
  sobre-azul-suave: "oklch(85% 0.035 238)"
  acento: "oklch(72% 0.12 238)"
  acento-contraste: "oklch(18% 0.03 245)"
  erro: "oklch(70.4% 0.191 22.2)"
  sucesso: "oklch(62.6% 0.107 164)"
  alerta: "oklch(76.5% 0.14 73)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2.2rem + 4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.5rem + 1.8vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.13em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1rem"
    fontWeight: 500
    letterSpacing: "normal"
rounded:
  md: "6px"
  lg: "8px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  card: "20px"
  card-lg: "24px"
  panel-lg: "32px"
  section-y: "80px"
  section-y-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.acento}"
    textColor: "{colors.acento-contraste}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.texto}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-lg}"
  badge:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.suave}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
  input:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
---

# Design System: TWR Tech

## 1. Overview

**Norte Criativo: "A Cabine de Instrumentos"**

O site opera como o painel de um cockpit técnico, não como um dashboard de SaaS. Fundo quase-preto, respiro generoso, e cada seção lê como um instrumento único acendendo no escuro: uma cor por vez, um número por vez, uma decisão por vez. Isso não é estética emprestada de "app de dados" — é a tradução literal do princípio de negócio do Thiago ("recuar da decisão até o dado, não o contrário"): a interface também aponta para uma única coisa por tela.

A disciplina cromática é o argumento de venda. O Acento ciano (`#52AFE7`) funciona como a luz de alerta de um instrumento: aparece no máximo uma vez por viewport — na palavra-chave do H1, no CTA primário, nunca nos dois ao mesmo tempo em blocos concorrentes. Fora dele, a paleta é neutra e fria, com blocos inteiros em Azul/Azul Profundo reservados para seções de oferta e conversão — o sistema é mais **Comprometido** que **Contido** nessas seções (a cor cobre 100% do bloco), mas o Acento em si segue a regra de raridade. Sem sombra em lugar nenhum: profundidade vem de camadas tonais (Fundo → Painel → Azul → Azul Profundo), nunca de `box-shadow`.

O sistema rejeita explicitamente o que o PRODUCT.md chama de **Template SaaS genérico** (hero com gradiente roxo, grid de cards idênticos, "trusted by", cara de site gerado por IA), a **Agência exagerada** (animações pesadas, scroll-hijacking), o **Corporativo engessado** (azul-marinho institucional + foto de stock de aperto de mão) e o **Currículo online** (página que parece CV formatado). Rigor técnico aqui é sinônimo de economia visual, não de ausência de personalidade.

**Key Characteristics:**
- Dark-first quase-preto (`#15171B`), nunca `#000` puro.
- Uma única cor de ação por tela — o Acento é raro por design, não por acidente.
- Zero `box-shadow`; profundidade por camadas tonais e bordas de 1px.
- Cantos levemente arredondados em tudo, nunca 100% quadrados, pílula só em CTAs e badges.
- Tipografia faz o trabalho de hierarquia: título extrabold + corpo regular, sem efeitos.
- Dados e números (quando existirem) rodam em fonte monoespaçada — o instrumento fala em algarismos tabulares, não na mesma voz do corpo do texto.

## 2. Colors

Paleta fria, de baixa saturação nos neutros e saturação comprometida só na família azul — cada cor nova precisa obedecer essa temperatura antes de obedecer à convenção de mercado (nada de verde-neon ou amarelo-canário "padrão dashboard de startup").

### Primary
- **Acento** (`#52AFE7` / `oklch(72% 0.12 238)`): CTA primário, links, a palavra-chave de destaque no H1. Contraste 7,4:1 sobre Fundo. Uso pontual — no máximo um elemento em Acento por viewport.
- **Acento-contraste** (`#06131E` / `oklch(18% 0.03 245)`): texto sobre superfícies em Acento (botões, badge "Porta de entrada"). Contraste 7,7:1 sobre Acento.

### Secondary
- **Azul** (`#0A5D8D` / `oklch(46% 0.105 242)`): fundo de seções intermediárias ("Como eu posso ajudar"), hover de blocos de oferta.
- **Azul Profundo** (`#06466E` / `oklch(38% 0.09 244)`): fundo de blocos de destaque cheios — a CTASection reutilizável e o card de "Porta de entrada". Contraste 8,1:1 com Texto-sobre-azul.
- **Azul Linha** (`#3D78A2` / `oklch(55% 0.09 242)`): bordas e divisores sobre fundos azuis.
- **Sobre-azul** (`#ECF3F8` / `oklch(96% 0.01 240)`): texto e CTAs invertidos sobre blocos Azul/Azul Profundo.
- **Sobre-azul suave** (`#B9D2E2` / `oklch(85% 0.035 238)`): texto secundário sobre blocos azuis.

### Neutral
- **Fundo** (`#15171B` / `oklch(20.5% 0.008 260)`): fundo base de página, dark-first.
- **Painel** (`#1B2025` / `oklch(24% 0.012 255)`): fundo de cards, inputs, badges.
- **Linha** (`#2D3135` / `oklch(31% 0.01 255)`): bordas, divisores, contornos — a única forma de separação visual no sistema (nunca sombra).
- **Texto** (`#E5E8EC` / `oklch(93% 0.006 250)`): texto primário sobre Fundo/Painel — 14,6:1 de contraste.
- **Suave** (`#A0A5AB` / `oklch(72% 0.01 250)`): texto secundário, legendas — 7,2:1.
- **Apagado** (`#888D92` / `oklch(64% 0.01 250)`): texto terciário, placeholders, metadados de rodapé — 5,4:1.

### Estados semânticos
- **Erro** (`#FF6568` / `oklch(70.4% 0.191 22.2)`): validação negativa em formulários. Hoje implementado via `text-red-400` do Tailwind (não é um token custom no `@theme`) — o hex documentado aqui é a leitura desse valor, para consistência de referência com Sucesso/Alerta.
- **Sucesso** (`#3E9C76` / `oklch(62.6% 0.107 164)`): confirmações, métricas positivas, status "ok". Puxado para o verde-azulado (não verde-limão) para ficar na mesma temperatura fria da paleta — evita o efeito "semáforo" de BI genérico.
- **Alerta** (`#E8A33D` / `oklch(76.5% 0.14 73)`): avisos, pendências. Âmbar terroso, não amarelo puro, pelo mesmo motivo.

### Named Rules
**A Regra da Cor Única.** O Acento aparece no máximo uma vez por viewport — um H1, um CTA, uma palavra-chave. Sua raridade é o ponto: se dois elementos em Acento competem na mesma tela, um deles está errado.

**A Regra Sem-Semáforo.** Sucesso e Alerta nunca aparecem como verde/amarelo puros de dashboard genérico — sempre desaturados na mesma direção fria da família Azul, como extensões do sistema, nunca corpos estranhos.

## 3. Typography

**Display Font:** Bricolage Grotesque (peso 800 Extrabold para H1/wordmark, 700 Bold para H2–H4)
**Body Font:** Onest (400 Regular no corpo, 500/600 em labels, nav e botões)
**Label/Mono Font:** JetBrains Mono — reservada para dados e números (ainda não carregada no projeto; ver Do's/Don'ts)

**Character:** Um par geométrico-extrabold para títulos com leitura confortável no corpo — nenhuma das duas assina "startup genérica", e a diferença de peso (800 vs 400) faz a hierarquia sozinha, sem precisar de cor ou efeito.

### Hierarchy
- **Display** (800, `clamp(3rem, 6vw, 6rem)`, leading 0.98): H1 de página — Bricolage Grotesque, tracking apertado, quebra em até 14 caracteres por linha.
- **Headline** (800, `clamp(1.875rem, 4vw, 3rem)`, leading 1.05): H2 de seção — mesmo tratamento, uma oitava abaixo do Display.
- **Title** (800, `clamp(1.25rem, 2.5vw, 1.875rem)`, leading 1.1): H3 de card/oferta, título de item de portfólio.
- **Body** (400, 1rem–1.125rem, leading 1.6, max 58–70ch): parágrafo corrido em Suave; parágrafos de abertura de seção sobem para `text-lg` (1.125rem).
- **Label** (600, 0.78rem, tracking 0.13em, uppercase): a "sobrescrita" que abre toda seção ("O problema", "Portfólio") — em Apagado. Variante menor (0.7rem, tracking 0.09em) para badges de status ("Estudo de caso demonstrativo").

### Named Rules
**A Regra do Dado Monoespaçado.** Todo valor numérico — KPI, métrica de resultado, timestamp, código de proposta — usa JetBrains Mono, nunca Onest. Algarismos tabulares evitam que colunas "pulem" quando o valor muda, e a fonte monoespaçada é o sinal visual de "isso é dado tratado com rigor", não decoração.

## 4. Elevation

Sistema estritamente plano: nenhum `box-shadow` no código-fonte hoje. Profundidade vem só de duas ferramentas — camadas tonais (Fundo → Painel → Azul → Azul Profundo, cada uma um degrau de luminosidade acima da anterior) e bordas de 1px em Linha/Azul Linha. Um card nunca "flutua"; ele se diferencia do fundo só por ser um pouco mais claro e ter um contorno fino.

### Named Rules
**A Regra Sem Sombra.** Nenhum `box-shadow` em nenhum componente. Se um elemento precisa se destacar, o caminho é mudar a cor de fundo (Painel/Azul) ou adicionar uma borda de 1px — nunca uma sombra, nem "discreta".

## 5. Components

### Buttons
- **Shape:** pílula total (`rounded-full`, 9999px) — sem exceção, em qualquer CTA do site.
- **Primary:** `bg-acento` / `text-acento-contraste`, `font-bold`, padding `12px 24px`. Sobre blocos Azul Profundo, o primário inverte para `bg-sobre-azul` / `text-azul-profundo` (mantém o princípio "claro sobre escuro", nunca dois azuis empilhados).
- **Hover/Focus:** `filter: brightness(1.1)` no primário (nunca troca de cor sólida); foco visível via `outline: 2px solid var(--color-acento)` com `outline-offset: 2px`, herdado globalmente de `:focus-visible`.
- **Secondary/Ghost:** fundo transparente, borda 1px em Linha (ou Azul Linha sobre fundo azul), `font-semibold`, hover preenche com Painel (ou Azul).

### Badges (pílulas de status)
- **Style:** `rounded-full`, borda 1px em Linha, fundo Painel ou transparente, texto 0.7–0.78rem uppercase tracking-wide em Suave/Apagado.
- **Uso:** rótulo obrigatório em todo item de portfólio ("Estudo de caso demonstrativo · empresa fictícia, dados sintéticos" / "Projeto próprio") — nunca omitido, é o selo de honestidade radical do PRODUCT.md.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) é o padrão para cards de conteúdo; `rounded-3xl` (24px) reservado para o painel maior (retrato + citação na Home).
- **Background:** Painel sobre Fundo; Azul Profundo sobre Azul nos blocos de oferta.
- **Shadow Strategy:** nenhuma — ver Elevation.
- **Border:** 1px em Linha (ou Azul Linha sobre fundo azul) em praticamente todo card.
- **Internal Padding:** 20px (`p-5`) em grids densos de 4 colunas, 24px (`p-6`) no padrão geral, 32px (`p-8`/`p-12`) no painel de destaque.

### Inputs / Fields
- **Style:** `rounded-lg` (8px), borda 1px Linha, fundo Painel, texto em Texto, placeholder em Apagado.
- **Focus:** troca de cor da borda para Acento + remoção do outline nativo (`focus:border-acento focus:outline-none`) — sem glow, sem ring.
- **Error:** mensagem em `text-red-400` (ver seção Erro em Colors) com `role="alert"`, nunca borda vermelha no campo.

### Navigation
- **Style:** header com wordmark em Display 2xl + nav de texto simples; link ativo muda de Suave para Texto (sem sublinhado, sem pílula de fundo); CTA da nav é o único botão-pílula no header.
- **Mobile:** menu hambúrguer em botão quadrado `rounded-md` (6px) — única aparição desse radius no sistema — que expande um painel full-width com a mesma hierarquia de links.

### FAQ (Signature Component)
Acordeão nativo `<details>`/`<summary>`, sem JavaScript e sem biblioteca: a resposta fica no HTML renderizado mesmo fechado (requisito de AEO — bots e crawlers de busca por IA precisam ler a resposta sem interação). Indicador visual é um "+" em Acento que gira 45° para virar "×" via `group-open:rotate-45`, puramente CSS. Divisores são 1px em Linha; sem cards, sem fundo diferenciado por item.

## 6. Do's and Don'ts

### Do:
- **Do** usar OKLCH para toda cor nova, reduzindo croma perto dos extremos de luminosidade — os dois tokens novos (Sucesso, Alerta) seguem essa regra.
- **Do** manter o Acento a no máximo um elemento por viewport (Regra da Cor Única).
- **Do** usar pílula total (`rounded-full`) em todo CTA e badge — é a única forma de botão do sistema.
- **Do** rodar todo número/KPI em JetBrains Mono assim que a fonte for carregada (Regra do Dado Monoespaçado).
- **Do** construir profundidade com camadas tonais e bordas de 1px, nunca com `box-shadow`.
- **Do** manter o selo "estudo de caso demonstrativo" / "dados sintéticos" visível e nunca escondido — é identidade visual, não rodapé legal.

### Don't:
- **Don't** usar hero com gradiente roxo, grid de cards idênticos, "trusted by" ou qualquer cara de "site gerado por IA" (anti-referência PRODUCT.md: Template SaaS genérico).
- **Don't** adicionar animações pesadas, scroll-hijacking ou efeito competindo com o conteúdo (anti-referência PRODUCT.md: Agência exagerada).
- **Don't** usar azul-marinho institucional combinado com foto de stock de aperto de mão, nem tom distante (anti-referência PRODUCT.md: Corporativo engessado).
- **Don't** deixar a página parecer um currículo formatado em vez de vitrine de consultoria (anti-referência PRODUCT.md: Currículo online).
- **Don't** usar `border-left`/`border-right` colorido como faixa de destaque em card, badge ou alerta — nunca intencional neste sistema.
- **Don't** usar texto em gradiente (`background-clip: text`) — ênfase é sempre peso ou tamanho, nunca gradiente.
- **Don't** usar Sucesso/Alerta em blocos grandes de fundo — são cores de badge pequeno, nunca de seção inteira (o Acento continua sendo a única cor "de ação" da tela).
- **Don't** misturar `box-shadow` em nenhum componente novo — quebra a Regra Sem Sombra.
