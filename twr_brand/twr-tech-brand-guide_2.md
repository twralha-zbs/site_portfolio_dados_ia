# TWR Tech — Guia de Identidade de Marca

*Auditoria e evolução da identidade visual, a partir do site em produção (twralha.com). Diretriz estética: tecnológico, minimalista, alta clareza de hierarquia — no espírito de produtos SaaS/dashboards.*

## 1. Diagnóstico rápido dos ativos atuais

O site já opera com um sistema de design real (tokens de cor, escala tipográfica e radius consistentes via Tailwind), não um layout improvisado — isso é raro entre concorrentes diretos (freelancers de Power BI, que em geral usam templates genéricos) e já é a maior vantagem competitiva da marca hoje. A dupla tipográfica funciona bem: Bricolage Grotesque em peso extrabold para títulos entrega personalidade geométrica sem virar "startup genérica", e Onest no corpo garante leitura confortável. O par cromático fundo quase-preto + acento ciano pontual está bem calibrado — todos os contrastes testados passam WCAG AA (ver seção 2), o que é raro acontecer por acidente e vale documentar como regra, não deixar como sorte.

Três lacunas concretas seguram a marca de virar um sistema completo: (1) não existem cores semânticas de sucesso/alerta — só o vermelho de erro está definido; (2) números e KPIs usam a mesma fonte do corpo (Onest), perdendo a chance óbvia de comunicar "rigor técnico" via tipografia monoespaçada com algarismos tabulares; (3) a marca não tem símbolo — só o wordmark "TWR Tech" — e o favicon atual é um ícone genérico (quadrado azul com duas barras brancas cruzadas) que não comunica "T", nem dado, nem decisão, lendo como placeholder de framework, não como marca.

## 2. Paleta de Cores

Os valores abaixo **já estão implementados no site** (extraídos diretamente do CSS de produção) — não foram recriados, apenas organizados e nomeados por função. Onde marcado **[NOVO]**, é lacuna preenchida nesta auditoria.

| Nome | HEX | Uso | Contraste (AA ≥ 4.5:1 texto) |
|---|---|---|---|
| Fundo | `#15171B` | Fundo base de página (dark-first) | — |
| Painel | `#1B2025` | Fundo de cards, painéis, inputs | — |
| Linha | `#2D3135` | Bordas, divisores, contornos sutis | — |
| Texto | `#E5E8EC` | Texto primário sobre Fundo/Painel | 14,6:1 sobre Fundo |
| Suave | `#A0A5AB` | Texto secundário, legendas | 7,2:1 sobre Fundo |
| Apagado | `#888D92` | Texto terciário, placeholders, metadados | 5,4:1 sobre Fundo |
| Azul Profundo | `#06466E` | Fundo de seções de destaque, blocos "cheios" | 8,1:1 c/ Texto sobre ele |
| Azul | `#0A5D8D` | Superfícies azuis intermediárias, hover de blocos azuis | 6,3:1 c/ Sobre-azul |
| Azul Linha | `#3D78A2` | Bordas/divisores sobre fundos azuis | — |
| Acento | `#52AFE7` | CTA primário, links, palavra-chave de destaque no H1 — **uso pontual, 1 por viewport** | 7,4:1 sobre Fundo |
| Acento-contraste | `#06131E` | Texto sobre botões/blocos na cor Acento | 7,7:1 sobre Acento |
| Sobre-azul | `#ECF3F8` | Texto primário sobre blocos Azul/Azul Profundo | — |
| Sobre-azul suave | `#B9D2E2` | Texto secundário sobre blocos azuis | — |
| Erro | `#FF6568` | Estados de erro, validação negativa | 6,3:1 sobre Fundo |
| **Sucesso** [NOVO] | `#3E9C76` | Confirmações, métricas positivas, status "ok" | 5,3:1 sobre Fundo |
| **Alerta** [NOVO] | `#E8A33D` | Avisos, estados de atenção, pendências | 8,3:1 sobre Fundo |

**Racional das duas cores novas:** em vez do verde-neon (`#22C55E`) e amarelo-canário genéricos de dashboard "startup padrão", ambos foram desaturados para a mesma temperatura fria da paleta azul existente (Sucesso puxa para o verde-azulado, não verde-limão; Alerta é âmbar terroso, não amarelo puro). Isso evita o efeito "semáforo" comum em produtos de BI genéricos e mantém as duas novas cores como extensões da mesma família cromática, nunca como corpos estranhos — critério de coerência definido na regra de prioridade tecnológico > minimalista > clareza informacional: mesmo cores de status precisam obedecer o sistema antes de obedecer à convenção de mercado.

## 3. Tipografia

| Papel | Fonte | Peso | Uso |
|---|---|---|---|
| Títulos / Display | **Bricolage Grotesque** *(já em uso — mantida)* | 800 Extrabold (H1/logo), 700 Bold (H2–H4) | Wordmark, headlines, hero, títulos de seção |
| Texto corrido / UI | **Onest** *(já em uso — mantida)* | 400 Regular (parágrafos), 500 Medium (labels, nav), 600 Semibold (botões, ênfase) | Corpo de texto, formulários, navegação, badges |
| **Dados / números** [NOVO] | **JetBrains Mono** | 500 Medium (valores correntes), 700 Bold (KPI em destaque) | Métricas de dashboard, tabelas, timestamps, códigos de proposta |

**Racional da fonte de dados:** hoje os números do site usam Onest, a mesma fonte do texto — funciona, mas desperdiça a oportunidade mais direta de comunicar "rigor técnico e precisão" (o atributo de marca priorizado nesta auditoria). JetBrains Mono foi escolhida por três motivos técnicos, não estéticos: algarismos tabulares (números sempre ocupam a mesma largura, essencial para colunas de tabela e KPIs que mudam de valor sem "pular" o layout), diferenciação clara entre caracteres facilmente confundíveis (0/O, 1/l/I) — o tipo de detalhe que sinaliza precisão para quem trabalha com dados —, e é gratuita/open-source, sem custo de licença adicional. Ela entra **apenas** em contextos numéricos; títulos e corpo continuam com a dupla já validada.

## 4. Conceito de Marca/Logo

**O que mantém:** o wordmark "TWR Tech" em Bricolage Grotesque Extrabold já é forte, legível e coerente com o tom tecnológico — não deve ser redesenhado do zero. O problema é estrutural: a marca não tem um símbolo próprio para contextos onde o texto não cabe (favicon, avatar de rede social, ícone de app), e hoje usa um ícone genérico sem significado.

**Símbolo final — "T":** gerado pelo cliente a partir desta identidade e adotado como definitivo, substituindo as explorações anteriores. Um "T" construído em dois planos cortados na diagonal — a barra superior e a haste descem no Azul principal (`#1087FE`), e uma segunda peça, mais clara (`#3DC5FD`), se solta no canto superior direito, como se o próprio corte gerasse um segundo sinal. A haste termina em ponta, como um estandarte: lê como um marcador fincado — "TWR aqui" — em vez de um gráfico ou ícone de dado. Direto o suficiente para não precisar de explicação, particular o suficiente para não ser um "T" de caixa de texto qualquer.

**Arquivos do símbolo e casos de uso:**

| Arquivo | Formato | O que é | Onde aplicar |
|---|---|---|---|
| `logo-mark.svg` | SVG, fundo transparente, duas cores (`#1087FE` / `#3DC5FD`) | Símbolo solto, sem tile, para fundo escuro | Cabeçalho do site, capas de apresentação, qualquer lockup ao lado do wordmark |
| `logo-mark-light.svg` | SVG, fundo transparente, tons escuros (`#06466E` / `#0A5D8D`) | Mesmo símbolo solto, para fundo claro | Propostas em PDF, material impresso, slides com fundo branco |
| `icon.svg` | SVG, tile preenchido — fundo Acento (`#52AFE7`), símbolo em Azul Profundo | Versão em uma só cor, para tamanhos muito pequenos (abaixo de ~24px, onde o corte entre as duas peças se perde) | Favicon do site (`app/icon.svg` no Next.js), aba do navegador, bookmarks, avatar de rede social |
| `icon-outline-dark.svg` | SVG, tile em Azul Profundo, símbolo nas duas cores | Versão completa, para tamanhos médios/grandes onde o corte entre as peças ainda se lê | Ícone de app fora do navegador (listagem em marketplace, ícone de integração) |
| `apple-icon.png` | PNG, 180×180, opaco | Ícone "adicionar à tela de início" no iOS | `app/apple-icon.png` no Next.js |
| `icon-192.png` | PNG, 192×192, opaco | Ícone de instalação PWA, tamanho padrão | Referenciado em `manifest.json` / `manifest.webmanifest` |
| `icon-512.png` | PNG, 512×512, opaco | Ícone de instalação PWA, tamanho grande / splash screen | Referenciado em `manifest.json` / `manifest.webmanifest` |

**Nota de coerência:** as duas cores do símbolo (`#1087FE` e `#3DC5FD`) são um pouco mais vívidas que o Azul (`#0A5D8D`) e o Acento (`#52AFE7`) já documentados na seção 2 — mesma direção de cor, um degrau mais saturado. Funcionam bem como estão: um símbolo pode respirar um pouco mais intenso que o restante da UI sem quebrar o sistema. Se no futuro a preferência for zero divergência, a opção é recalibrar os tokens Azul/Acento do site para esses tons; por ora, não há necessidade de mudar nada no site para o símbolo fazer sentido ao lado dele.

**Como se chegou até aqui:** três direções foram exploradas antes do símbolo final chegar pronto do cliente — "Barras de Decisão" (três barras crescentes, descartada por ler perto demais do ícone genérico de gráfico de BI), "Nó" (uma grade 3×3 com diagonal em Erro/Alerta/Sucesso, descartada por comunicar "painel de status" mais do que "marca") e "Sinal" (pontos dispersos convergindo a um ponto sólido, inspirado na própria frase de abertura do site — a proposta principal até este ponto). As três seguem documentadas abaixo como registro do processo e reserva para usos secundários.

### Direções exploradas (histórico)

**Sinal** — pontos dispersos, de tamanho e opacidade crescentes, convergindo para um único ponto sólido: "de dados dispersos a decisões claras" em forma. Era a proposta principal antes do símbolo do cliente; fica como opção para uma peça de campanha que queira citar essa frase diretamente.

**Rota** — um ponto pequeno (dado bruto) conectado por um único trajeto reto, em ângulo, a um ponto maior (decisão). Ilustra o processo, não o resultado: a automação como um trajeto percorrido sem intervenção manual.

**Elo** — duas cápsulas arredondadas sobrepostas, uma em azul intermediário e outra no Acento. A peça no Acento marca a interseção: onde a camada de IA reconcilia as duas etapas em vez de apenas executá-las em sequência. A mais literal sobre "automação de processos".

**Nó** — uma grade 3×3 regular com uma diagonal em Erro/Alerta/Sucesso, narrando a evolução de um processo automatizado do erro à decisão validada. Mantida como referência para uso em contextos de produto (ex.: um indicador de saúde de pipeline dentro do próprio dashboard), não como símbolo institucional.

## 5. Elementos Gráficos de Apoio

Grid e espaçamento: a unidade-base de `4px` já embutida no CSS do site (`--spacing: .25rem`) passa a ser a regra oficial de todo espaçamento — documentar isso formaliza uma prática que já existe, mas está implícita. Radius: os quatro tokens já em uso (`0.375rem` inputs, `0.5rem` botões, `1rem` cards, `1.5rem` painéis grandes) seguem exatamente como estão — não recriar. Ícones: recomenda-se adotar uma única biblioteca de ícones outline (Lucide ou Phosphor, traço de 1,5–2px), hoje ausente/inconsistente no site; traço fino com cantos levemente arredondados casa com os radius do sistema e evita o efeito "ícone genérico de template" que aparece no favicon atual. Espaço negativo: já bem explorado no fundo escuro com respiro generoso — a recomendação é proteger esse respiro especificamente ao redor de números e KPIs, dando peso visual a dado quando ele for o herói da tela. Padrão de apoio: um grid de pontos sutil (opacidade 4–6%) sobre `Fundo`, para uso pontual em heros de apresentações ou capas de material — remete a "papel quadriculado/plano técnico" sem virar textura decorativa.

## 6. Tom de Voz Visual

Formas retas, mas não rígidas: cantos levemente arredondados (nunca 100% quadrados, nunca pill em tudo) comunicam "tecnológico com acessibilidade humana" — coerente com o copy do site, que é técnico mas nunca frio ("dá pra confiar", "não vai virar mais um projeto engavetado"). Alto contraste com uso disciplinado da cor: fundo escuro, texto claro, e o Acento aparecendo em só um elemento por tela — isso não é estética, é a tradução visual direta do racional de negócio do Thiago ("recuar da decisão até o dado, não o contrário"): a interface também aponta para uma única coisa de cada vez. Baixa ornamentação — sem gradientes pesados, sombras discretas, hierarquia resolvida por tipografia e cor, não por efeitos — é o que diferencia a marca de concorrentes que tentam parecer "mais produzidos" empilhando elementos: aqui, rigor técnico é sinônimo de economia visual.

## 7. Aplicações Práticas

**Site / produto (já existente, ajustes finos):** manter a base dark, mas migrar todo valor numérico (KPIs, tabelas de case, métricas de resultado) para JetBrains Mono; usar as novas cores Sucesso/Alerta apenas em badges de status pequenos, nunca em blocos grandes — o Acento continua sendo a única cor "de ação" da tela.

**Apresentação comercial (PDF de proposta enviado por e-mail):** para impressão/leitura em PDF, inverter para fundo claro (`Sobre-azul` `#ECF3F8` ou branco) — texto em `Azul Profundo`, símbolo em versão invertida no rodapé de cada lâmina, KPIs de resultado em JetBrains Mono Bold na cor `Azul`, título de capa em Bricolage Grotesque Extrabold. Isso cria uma "versão impressa" da mesma marca sem inventar uma paleta paralela.

**Rede social (LinkedIn / Instagram, incluindo conteúdo de bastidor como o projeto ELAS JOGAM):** avatar = versão preenchida do símbolo (tile em Acento, "T" em Azul Profundo) — a mais legível em miniatura, exatamente o problema que um avatar de rede social impõe; posts de carrossel mantêm o fundo escuro do produto para reforçar reconhecimento de marca; qualquer estatística ou número citado no post vai em JetBrains Mono, mesmo em imagem estática — reforça o mesmo sinal de "dado tratado com rigor" em qualquer canal.

## 8. Próximos Passos Recomendados

Implementar as duas cores semânticas novas (`Sucesso` `#3E9C76`, `Alerta` `#E8A33D`) diretamente nas variáveis CSS já existentes no site, ao lado de `--color-red-400`. Substituir o favicon genérico pelo monograma novo em todos os tamanhos padrão (16px, 32px, 180px apple-touch-icon). Carregar JetBrains Mono via o mesmo mecanismo de font-loading já usado para Bricolage Grotesque/Onest e aplicá-la em todo componente numérico do site antes de expandi-la para propostas e social. Consolidar os tokens (cor, tipografia, radius, espaçamento) documentados aqui em um arquivo único de referência (`design-tokens`) para que qualquer novo material — proposta, post, deck — parta da mesma fonte, em vez de ser recriado visualmente a cada vez.
