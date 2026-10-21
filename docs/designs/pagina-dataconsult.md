# Página /organizacao-de-dados (DataConsult)

## Decisões do usuário (2026-10-21)

- **Nome:** DataConsult, como marca de trabalho (provisório). A rota continua
  descritiva (`/organizacao-de-dados`), para não mudar a URL se o nome mudar.
- **Oferta:** escopo aberto por projeto, sem preço público. Começa por uma
  conversa e, se fizer sentido, por um diagnóstico de escopo fixo.
- **Público:** PME com dados em planilhas e ERP (a mesma dor da Home).
- **CTA principal:** agendar conversa de 30 minutos (cal.com).

## Estrutura da página

1. Hero (`<Hero>` compartilhado): marca DataConsult, título "Dados dispersos
   viram decisão confiável", CTAs "Agendar conversa de 30 minutos" e
   "Ver estudos de caso".
2. O problema: relatórios em que não dá pra confiar, com 4 sintomas.
3. Como trabalhamos: mapear, propor, construir (os 3 passos da copy aprovada),
   mais a nota de "sem lock-in".
4. O que pode ser construído: as 4 camadas (Python, Power BI, Power Automate,
   IA aplicada), que se combinam.
5. Como começa e como é cobrado: conversa, diagnóstico de escopo fixo, projeto
   por escopo; valor sob consulta.
6. Para quem é: os 4 setores já usados na Home antiga.
7. Prova: os 3 estudos de caso demonstrativos, rotulados, com link ao
   portfólio.
8. Ponte com o NexIAtend, FAQ (`faqDataconsult`) e CTA final.

JSON-LD `Service` (sem `offers`, o valor é sob consulta) e `FAQPage`, com o FAQ
lido da mesma fonte do texto visível.

## Ligações no site

- `lib/servicos.ts`: nome "DataConsult", selo "by TWR Tech", href para a nova
  rota, CTA "Conhecer o DataConsult" (hoje aponta para `/contato`).
- Rodapé e `sitemap.ts` ganham a rota.

## Regras a respeitar

Sem travessão em texto visível; voz de empresa; sem preço, prazo fixo nem
resultado numérico; estudos de caso sempre rotulados como demonstrativos;
nada de cliente nomeado.

## Pendências fora do código

Checar INPI e domínio antes de tornar "DataConsult" definitivo.
