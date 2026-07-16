# Distribuidora Serra Azul — base de dados sintética

> **Estudo de caso demonstrativo.** A Distribuidora Serra Azul Ltda. é uma
> empresa **fictícia** e todos os dados deste diretório são **100% sintéticos**,
> gerados por script. Nenhum dado real de cliente ou empresa foi utilizado.

Base de dados de um atacado/distribuidor de bebidas de médio porte
(~R$ 4 mi/mês, 1.200 PDVs ativos, 250 SKUs, 12 vendedores externos em 4 regiões
de MG), cobrindo **jan/2024 a jun/2026 (30 meses)** — o ano de 2024 completo
permite comparações de ano fechado (2024 vs. 2025) no dashboard.

## Como rodar

```bash
pip install -r requirements.txt
python gerar_dados.py
```

Os 7 CSVs são gravados em `data/` (UTF-8, separador vírgula, datas ISO
`YYYY-MM-DD`). A seed é fixa (42): duas execuções produzem arquivos
byte-idênticos com as versões pinadas no `requirements.txt`. O próprio script
valida volumes, integridade referencial, ausência de nulos em chaves e os
padrões de negócio antes de gravar (bloco de `assert` em `validar()`).

## Dicionário de dados

### `clientes.csv` — 1.200 linhas

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | int | Chave do cliente (PDV) | `42` |
| `nome_fantasia` | str | Nome do ponto de venda | `Bar do Antônio` |
| `tipo_pdv` | str | Bar, Mercado, Restaurante, Conveniência ou Padaria | `Bar` |
| `cidade` | str | Cidade do PDV (coerente com a região do vendedor) | `Contagem` |
| `uf` | str | Sempre `MG` | `MG` |
| `data_cadastro` | date | Data de cadastro (maioria anterior a 2024) | `2021-03-15` |
| `vendedor_id` | int | FK → `vendedores.id` (vendedor da carteira) | `7` |

### `produtos.csv` — 250 linhas

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `sku` | str | Chave do produto | `SKU-0031` |
| `categoria` | str | Cerveja, Refrigerante, Água, Energético ou Suco | `Cerveja` |
| `marca` | str | Marca fictícia | `Serra Dourada` |
| `descricao` | str | Marca + categoria + embalagem | `Serra Dourada Cerveja Lata 350ml cx12` |
| `preco_tabela` | float | Preço de tabela da caixa/unidade (R$) | `78.90` |
| `custo` | float | Custo de aquisição (margem de 18–35%) | `55.23` |
| `fornecedor` | str | Fornecedor fictício | `Bebidas Mantiqueira S.A.` |

### `vendedores.csv` — 12 linhas

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | int | Chave do vendedor | `3` |
| `nome` | str | Nome fictício | `Ana Souza` |
| `regiao` | str | Grande BH, Sul de Minas, Zona da Mata ou Vale do Aço (3 por região) | `Grande BH` |
| `data_admissao` | date | Data de admissão | `2018-06-02` |

### `pedidos.csv` — ~55.000 linhas

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | int | Chave do pedido (sequencial por data) | `12345` |
| `cliente_id` | int | FK → `clientes.id` | `42` |
| `vendedor_id` | int | FK → `vendedores.id` (o da carteira do cliente) | `7` |
| `data` | date | Data do pedido (sem domingos) | `2025-01-17` |
| `status` | str | `entregue` (~98%) ou `cancelado` (~2%) | `entregue` |

### `itens_pedido.csv` — ~207.000 linhas

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `pedido_id` | int | FK → `pedidos.id` | `12345` |
| `sku` | str | FK → `produtos.sku` (sem SKU repetido no mesmo pedido) | `SKU-0031` |
| `qtd` | int | Quantidade **atendida** (caixas/unidades) | `8` |
| `preco_unit` | float | Preço praticado = tabela × (1 − desconto) | `74.96` |
| `desconto` | float | Desconto em % sobre a tabela (0 em ~60% das linhas) | `5.00` |
| `flag_ruptura` | int | `1` = item com atendimento parcial por falta de estoque | `0` |

Receita de uma linha = `qtd × preco_unit`. Para análise de receita, considerar
apenas pedidos com `status = 'entregue'`.

### `estoque_movimentos.csv` — ~93.000 linhas

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `data` | date | Data do movimento | `2024-08-05` |
| `sku` | str | FK → `produtos.sku` | `SKU-0031` |
| `tipo` | str | `entrada` (reposição), `saida` (venda) ou `ajuste` (perda/quebra) | `entrada` |
| `qtd` | int | Quantidade **assinada**: entrada > 0, saída < 0, ajuste < 0 | `-14` |
| `saldo` | int | Saldo do SKU após o movimento (nunca negativo) | `122` |

Saídas são o espelho diário das vendas entregues (agregadas por dia × SKU).
Entradas seguem cadência de reposição por giro: semanal (top-50), quinzenal
(51–150) e mensal (demais). A primeira entrada de cada SKU em 01/01/2024 é o
estoque inicial.

### `metas.csv` — 360 linhas (12 vendedores × 30 meses)

| Coluna | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `vendedor_id` | int | FK → `vendedores.id` | `3` |
| `mes` | str | Mês de competência (`YYYY-MM`) | `2025-04` |
| `meta_valor` | int | Meta de receita do mês (R$, arredondada ao milhar) | `318000` |

A meta reflete o potencial da carteira do vendedor ajustado pelo perfil sazonal
da empresa, com folga de ~8%.

## Padrões plantados nos dados

Estes padrões existem de propósito — são o que o dashboard Power BI e a camada
de IA do estudo de caso devem "descobrir":

1. **Sazonalidade** — pico de vendas no verão (dez–fev, até +40%) com bumps em
   Carnaval e festas juninas; vale em abr–mai.
2. **Curva ABC** — os 50 SKUs de maior giro (20% do catálogo) concentram
   ~74–78% da receita.
3. **Ruptura de estoque** — ~8% dos pedidos têm ≥ 1 item com `flag_ruptura = 1`
   (atendimento parcial), concentrados nos top-50 SKUs (>90%) e nos meses de
   pico. No estoque, a reposição dos SKUs de alto giro é subdimensionada no
   verão — os saldos baixos explicam as rupturas.
4. **Churn** — 90 clientes reduzem progressivamente a frequência de compra
   entre mar/2026 e jun/2026 (fator 0,70 → 0,15). Não há flag na base: o
   padrão só aparece analisando o comportamento de compra.
5. **Vendedores abaixo da meta** — os vendedores **3 e 9** fecham abaixo da
   meta em ≥ 25 dos 30 meses; os demais batem a meta na maioria dos meses.

Além disso, há ruído aleatório controlado (frequência por cliente, descontos,
quantidades, cancelamentos) para os dados não parecerem "lisos demais".

## Modelo relacional

```
vendedores 1─N clientes 1─N pedidos 1─N itens_pedido N─1 produtos
vendedores 1─N metas                                      produtos 1─N estoque_movimentos
```
