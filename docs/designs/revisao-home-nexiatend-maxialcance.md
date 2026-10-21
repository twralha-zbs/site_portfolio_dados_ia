# Revisão da Home, /nexiatend e /maxialcance

## Contexto

A Home ainda abre como consultoria (estudos de caso no hero, pílula e citação
sobre implantação, seção "O problema" de dados e o método de 5 passos). O
usuário quer a Home focada nos produtos e na dor de cada um (NexIAtend →
MaxIAlcance → consultoria), com os cases mais no fim. A `/nexiatend` deve
virar uma landing de impacto no estilo da aldacrm.com (recursos agrupados por
tema, cada grupo com print real da plataforma), com o vocabulário do encontro
Helena na Meta (conversas inteligentes, fluxo com objetivo, CRM como fonte
única), o comparador de planos e, abaixo, os recursos adicionais sem preço.
Visual alinhado às artes do Instagram: fundo quase preto, brilho azul
elétrico, grade/malha discreta, rótulos mono (`// marcador`), títulos fortes.

Decisões do usuário (2026-10-21):
- Componentes colados entram **adaptados**: estrutura `components/ui/`, deps
  mínimas, tokens escuros do Prisma (sem shadcn init, motion, cva).
- Adicionais: "podem ser agregados ao seu plano" + ressalva de que a
  disponibilidade varia por plano (TWR indica na proposta). Sem preço.
- **Sem números de terceiros** (80%/31%/70% da Helena) e **remover a seção do
  diagnóstico próprio** ("4 de 6...") da `/nexiatend`. Problema fica
  qualitativo. (A seção equivalente da `/maxialcance` permanece.)
- Prints da Helena usados como estão; só recorte da faixa "Utilize o Google
  Chrome" e conversão para WebP.

## Dependências e base

- `npm i lucide-react @number-flow/react @radix-ui/react-switch clsx tailwind-merge`
- `lib/utils.ts` (novo): `cn()` com clsx + tailwind-merge.
- `components/ui/` (novo, convenção shadcn para componentes de UI genéricos;
  os componentes de página continuam em `components/`).
- `app/globals.css`: keyframes `fade-in` / `fade-up` + utilitários
  `.animate-fade-in` / `.animate-fade-up` (com `both`, desligados em
  `prefers-reduced-motion`); token `--color-eletrico: #1087fe` (em OKLCH)
  só para o brilho decorativo do hero, igual ao `--eletrico` do carrossel.
  Ação continua no `acento` (Regra da Cor Única).

## Componentes novos

1. **`components/ui/hero.tsx`** (adaptado do hero-1, server component):
   props `eyebrow`, `titulo` (ReactNode, para o trecho em `text-acento`),
   `subtitulo`, `ctas` (primário/secundário, interno ou externo), `selo?`
   ("by TWR Tech"), `children?` (visual abaixo, ex. print do produto).
   Fundo: grade `linha` com máscara radial no topo + arco radial com borda e
   brilho `eletrico` na base (versão escura do "Radial Accent"); eyebrow em
   pílula mono com `ChevronRight`; H1 `font-display` grande com fade-in;
   botões pílula existentes. Usado na Home, `/nexiatend` e `/maxialcance`.
2. **`components/ui/switch.tsx`**: Switch Radix estilizado nos tokens
   (`acento` ligado, `linha` desligado), foco visível.
3. **`components/ui/planos.tsx`** (adaptado do growth-plans, `"use client"`):
   toggle **"Mensal, sem fidelidade" ↔ "12 meses"** com selo "implantação
   pela metade"; mensalidade fixa (R$ 437 / 717 / 1.207 / 2.197) e a
   **implantação anima com NumberFlow** (767 → 383,50; 1.647 → 823,50;
   2.197 → 1.098,50; 3.297 → 1.648,50; `locales="pt-BR"`, BRL). 4 cards
   (`lg:grid-cols-4`), plano **Vendas em destaque** (fundo `azul-profundo`,
   rótulo "Atendimento + vendas", sem alegar "mais vendido"); capacidade,
   dor que resolve, lista com `Check`, CTA de cada card → `whatsappDiagnostico`.
   Abaixo, **tabela comparativa completa** em `<details>` ("Comparar todos os
   recursos"), linhas da seção 2 de `Produtos/NexIAtend/Docs/oferta-e-planos.md`
   (usuários, canais, chatbots, CRM/funis, campanhas, sequências, rastreio de
   origem, distribuição, carteiras, CSAT, transcrição, API/webhooks, agente
   de IA, suporte). Tabela com `overflow-x-auto` no mobile.
   Dados dos planos ficam em **`lib/nexiatend.ts`** (novo), fonte única para
   cards, tabela e JSON-LD.
4. **`components/ui/print-produto.tsx`**: moldura de janela (barra com 3
   pontos, borda `linha`, `rounded-2xl`, `next/image` com `sizes`) para os
   prints claros da Helena repousarem no fundo escuro; variante celular para
   `atendimento_mobile`.

## Imagens

Script em scratchpad (Python + Pillow) converte
`Downloads/Documento sem título/images-helena/*` para WebP em
`public/nexiatend/` (largura máx. 1600 px, q≈82), recortando o topo de
`central_atendimento.jpg` (faixa do Chrome). `alt` descritivo em PT-BR para
cada uma. Mapa de uso:

| Imagem | Seção |
|---|---|
| central_atendimento + atendimento_mobile | hero (janela + celular sobreposto) |
| fluxo_chatbot, exemplo_whatsapp_flow, detalhe_chatbot | conversas inteligentes |
| crm_pipeline_comercial, modelos_mensagem, horario_funcionamento | fluxos de atendimento e vendas |
| central_atendimento (recorte do card "Rastreamento") | organizar e rastrear dados |
| agentes_inteligentes | IA |
| atendimento_mobile | gestão e monitoramento |
| aplicativos, integracoes | recursos adicionais |

## Home (`app/(site)/page.tsx`)

Sai: pílula de implantação, seção "O problema"/verticais, `ProcessoTrabalho`
(componente fica no repo, só sai da Home), citação do fundador sobre
implantação, CTA "Ver estudos de caso" do hero.

Nova ordem:
1. **Hero** (`<Hero>`): sem eyebrow; H1 na linha das artes
   ("do caos à ordem"), ex.: "Conversas, presença e dados da sua empresa
   **organizados.**"; subtítulo: a TWR Tech tem três produtos para PME
   organizar atendimento, ser encontrada e decidir com dados. CTAs: "Conhecer
   os produtos" (`#produtos`) e "Fale conosco". `lib/site.ts` (`headline`,
   `subheadline`) alinhado ao texto final.
2. **Produtos pela dor** (`#produtos`): três blocos grandes alternando lado do
   visual, cada um com rótulo mono (`// 01 · atendimento`), a dor como título,
   o produto como resposta, 3 benefícios e CTA:
   - NexIAtend: "Seu WhatsApp tem conversa demais e registro de menos." →
     print `central_atendimento` em moldura.
   - MaxIAlcance: "Quem não conhece você procura no Google e pergunta à IA."
     → visual tipográfico (Google / Mapa / IAs).
   - Consultoria de Dados & Processos: "Cinco planilhas, nenhum número em que
     dá pra confiar." → visual tipográfico (fontes → painel).
   `lib/servicos.ts` ganha `dor`, `beneficios[]`, `rotulo` por produto.
3. **Estudos de caso** (bloco atual de portfólio, movido para baixo).
4. FAQ da Home, Substack, CTA final (texto sem "implantação").

## `/nexiatend` (`app/(site)/nexiatend/page.tsx`)

Estrutura inspirada na Alda (cada grupo: rótulo mono, título, texto curto,
2 a 4 recursos numerados e print), copy das notas da Helena sem números:

1. **Hero**: eyebrow "WhatsApp, Instagram e IA"; H1 "NexIAtend" + selo;
   título forte "Conversas inteligentes que **viram venda.**"; subtítulo
   (central única, equipe atendendo junto, gestão vendo tudo; sem a frase
   de implantação no hero); CTAs "Pedir diagnóstico gratuito" e "Ver planos"
   (`#planos`); visual janela + celular. Faixa de 4 selos: WhatsApp Business
   Platform (API) · WhatsApp e Instagram numa tela · App no celular · IA com
   passagem para pessoa.
   **Terminologia (orientação da Meta):** nunca "API oficial"; usar
   "WhatsApp Business Platform (API)". Corrigir também as ocorrências atuais:
   nota da seção "Como funciona" (`nexiatend/page.tsx:268`, "A conexão é a
   oficial do WhatsApp") e a resposta do FAQ em `lib/faq.ts:60` ("A conexão
   oficial do WhatsApp...").
2. **O problema** (qualitativo): "Digitalizamos a conversa, **não o que ela
   gera.**" Cadeia campanha → conversa → atendimento → CRM → retorno → venda
   → relacionamento, com as 4 rupturas (origem do lead se perde, conversa não
   vira registro, oportunidade sem dono, cliente esquecido depois da compra).
   Reaproveita os 3 itens de `hoje` (celular de cada um, WhatsApp Web
   dividido, retorno de memória). **Seção azul de números removida.**
3. **Conversas inteligentes**: contraste "o mercado vende disparo em massa e
   menu 'digite 1, 2, 3'" vs. conversa com objetivo; arquitetura em 5 passos
   (abertura → engajamento → qualificação → conversão → pessoa) e o que
   retém (uma pergunta por vez, dado coletado sem parecer formulário, próxima
   ação clara, saída para pessoa na hora certa, tratamento de áudio/texto
   livre). Prints: `fluxo_chatbot` (fluxo no editor) e
   **`exemplo_whatsapp_flow.png`** (novo, ~360 px de largura: formulário
   "Leva 1 minuto" aberto dentro do WhatsApp, logo TWR) em moldura de
   celular, mostrando o que o cliente vê: dados coletados sem sair da
   conversa. Sem upscale; exibido no tamanho natural.
4. **Fluxos de atendimento e vendas**: bento com distribuição automática,
   carteiras, departamentos/filas, horário e mensagem fora do expediente,
   funil de vendas, modelos oficiais, sequências e mensagens agendadas.
5. **Dados organizados e rastreados**: CRM como fonte única, origem de cada
   lead (campanha, anúncio, site), etiquetas e campos, histórico completo
   mesmo quando o atendente sai.
6. **Tempo devolvido à equipe** (sem números): lista "o que sai da mão de
   quem atende e vende": triagem automática, respostas rápidas, transcrição
   de áudio, retorno programado, perguntas repetidas com o agente de IA,
   tudo do cliente numa tela.
7. **Gestão e monitoramento**: supervisão em tempo real (quem está
   esperando), relatórios de volume, espera e duração, pesquisa de
   satisfação, acompanhar pelo celular. Print mobile.
8. **IA**: agentes inteligentes com base de conhecimento da empresa,
   configurados pela TWR, passando para pessoa quando precisa (tokens na conta
   da empresa, como hoje).
9. **Como funciona** (4 etapas atuais, compactas) + nota "a TWR implanta,
   treina e dá suporte, não opera".
10. **Planos** (`#planos`): `<Planos>` + tabela comparativa + texto de
    contrato (Meta cobrada direto da empresa).
11. **Recursos adicionais** (sem preço): agente de IA, transcrição de áudio,
    pagamentos no chat (Asaas), usuário ou canal extra, integrações (API,
    webhooks, Make, n8n), widget de atendimento no site, chat interno,
    classificação de atendimento, visita presencial no ABC. Prints
    `aplicativos` e `integracoes`. Ressalva de disponibilidade por plano.
12. Ponte para dados (bloco atual), FAQ (`faqNexiatend`, revisar só se algum
    texto contradisser a página), CTA.

Metadata e JSON-LD `Service` mantidos (preço mínimo de `lib/nexiatend.ts`);
title ≤ 60, description ≤ 155.

## `/maxialcance`

Revisão leve: troca o hero pelo `<Hero>` compartilhado (mesmo texto, CTA
secundário "Ver investimento" → `#investimento`), rótulos mono nas seções para
casar com a nova linguagem. Conteúdo e números do eval inalterados.

**Acompanhamento mensal passa de R$ 300 para R$ 400/mês** em todos os
lugares: card "Acompanhamento" (`maxialcance/page.tsx:305`), descrição do
JSON-LD `Service` (`:121`) e resposta do FAQ (`lib/faq.ts:105`, que alimenta
FaqSection e FAQPage juntos). Implantação "a partir de R$ 3.000" mantida.

## Etapas de execução

Cada etapa termina com `npm run lint` + `npm run build` limpos e um commit
local (push só no fim). Ao fim das etapas 4, 5 e 6, screenshot em 1280 e 375
mostrado ao usuário antes de seguir.

**Etapa 1. Base técnica** (sem mudança visível)
- Instalar deps; criar `lib/utils.ts` (`cn`).
- `globals.css`: keyframes/utilitários `fade-in`/`fade-up`, token
  `--color-eletrico`, regras de reduced-motion.
- Converter as 11 imagens para WebP em `public/nexiatend/` (script no
  scratchpad, recorte do `central_atendimento`).
- Pronto quando: build limpo e as imagens abrem em `/nexiatend/*.webp`.

**Etapa 2. Componentes de UI**
- `components/ui/hero.tsx`, `switch.tsx`, `print-produto.tsx`.
- `lib/nexiatend.ts` (planos, implantação mensal/12 meses, matriz da tabela).
- `components/ui/planos.tsx` (cards + toggle + NumberFlow + tabela em
  `<details>`).
- Pronto quando: build limpo (componentes ainda não usados em página).

**Etapa 3. Correções de texto pontuais** (independentes do redesign)
- "API oficial"/"conexão oficial" → "WhatsApp Business Platform (API)" em
  `lib/faq.ts` e na nota de "Como funciona".
- MaxIAlcance: R$ 300 → R$ 400/mês (card, JSON-LD, FAQ).
- Pronto quando: grep por "oficial" e "R$ 300" vazio no site.

**Etapa 4. Home**
- `lib/servicos.ts` com `rotulo`, `dor`, `beneficios`; `lib/site.ts`
  (`headline`/`subheadline`).
- Reescrever `app/(site)/page.tsx`: Hero → produtos pela dor (NexIAtend,
  MaxIAlcance, consultoria) → estudos de caso → FAQ → Substack → CTA;
  remover pílula, "O problema", `ProcessoTrabalho` e citação.
- QA visual + aprovação.

**Etapa 5. /nexiatend**
- 5a: hero + faixa de selos + problema qualitativo (remove seção de números).
- 5b: conversas inteligentes, fluxos, dados rastreados, tempo da equipe,
  gestão e monitoramento, IA (blocos com prints).
- 5c: como funciona, planos (`<Planos>` + tabela), recursos adicionais com
  ressalva, ponte para dados, FAQ, CTA; metadata e JSON-LD lendo
  `lib/nexiatend.ts`.
- QA visual (toggle, tabela no mobile, âncora `#planos`) + aprovação.

**Etapa 6. /maxialcance**
- Hero compartilhado com CTA "Ver investimento" (`#investimento`), rótulos
  mono nas seções.
- QA visual + aprovação.

**Etapa 7. Verificação final e encerramento**
- Checklist da seção Verificação nas 3 páginas (console, H1, rolagem
  horizontal, em dash, primeira pessoa, JSON-LD = texto visível).
- MEMORY.md (entrada "Sessão 2026-10-21"), encerrar dev server, commit e
  push (deploy automático).

## Regras a respeitar

Sem travessão em texto visível; voz de empresa (nada de primeira pessoa);
não prometer resultado, prazo ou número de cliente; não descrever a TWR como
operadora; não prometer app com a marca NexIAtend; foco visível e
reduced-motion.

## Verificação

1. `npm run lint` e `npm run build` limpos.
2. Dev server + `/browse` (`$B`) em 1280 e 375: `/`, `/nexiatend`,
   `/maxialcance`, sem rolagem horizontal, console limpo, um H1 por página,
   toggle dos planos troca a implantação (snapshot antes/depois), tabela
   rola no mobile, âncoras `#produtos`/`#planos` funcionam, imagens carregam.
3. Grep por "—" e por primeira pessoa nos arquivos tocados; grep por
   "oficial" e "R$ 300" sem resultados no site; JSON-LD FAQ igual ao texto
   visível.
4. Screenshots mostrados ao usuário para aprovação visual antes do commit.
5. Encerramento: entrada "Sessão 2026-10-21" no MEMORY.md, encerrar dev
   server, commit e push (deploy automático).
