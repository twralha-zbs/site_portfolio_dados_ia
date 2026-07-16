"""Gera o CSV de risco de ruptura consumido pelo fluxo Power Automate.

Calcula, para cada SKU, o estoque atual (soma da quantidade assinada de
`estoque_movimentos.csv`) e a venda média diária dos últimos 30 dias da base,
e lista os SKUs com **dias de cobertura < 7** — a mesma regra da medida DAX
"SKUs em Risco de Ruptura" da `especificacao_powerbi.md`.

Saída: `alerta_ruptura.csv` (neste diretório), o arquivo que o usuário sobe
ao OneDrive/SharePoint para o fluxo documentado em `fluxo_ruptura.md`.

    python gerar_alerta_ruptura.py [--data-referencia YYYY-MM-DD]

Por padrão a referência é a última data da base (jun/2026, baixa temporada —
lista vazia). O exemplo commitado usa `--data-referencia 2026-02-10` (pico de
verão), quando a reposição subdimensionada deixa SKUs de alto giro em risco.

Empresa fictícia, dados 100% sintéticos — ver ../README.md.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

PASTA = Path(__file__).resolve().parent
PASTA_DADOS = PASTA.parent / "data"
ARQUIVO_SAIDA = PASTA / "alerta_ruptura.csv"

DIAS_COBERTURA_MINIMA = 7
JANELA_VENDA_DIAS = 30


def main() -> None:
    parser = argparse.ArgumentParser(description="Gera o CSV de SKUs em risco de ruptura.")
    parser.add_argument(
        "--data-referencia",
        type=pd.Timestamp,
        default=None,
        help="data de referência do cálculo (YYYY-MM-DD); padrão: última data da base",
    )
    args = parser.parse_args()

    pedidos = pd.read_csv(PASTA_DADOS / "pedidos.csv", parse_dates=["data"])
    itens = pd.read_csv(PASTA_DADOS / "itens_pedido.csv")
    produtos = pd.read_csv(PASTA_DADOS / "produtos.csv")
    estoque = pd.read_csv(PASTA_DADOS / "estoque_movimentos.csv", parse_dates=["data"])

    data_ref = args.data_referencia if args.data_referencia is not None else pedidos["data"].max()

    # Estoque na data de referência: a soma da qtd assinada até a data
    # (entrada +, saída/ajuste −) equivale ao saldo.
    estoque_atual = (
        estoque[estoque["data"] <= data_ref].groupby("sku")["qtd"].sum().rename("estoque_atual")
    )

    # Venda média diária dos últimos 30 dias (somente pedidos entregues).
    ini_janela = data_ref - pd.Timedelta(days=JANELA_VENDA_DIAS - 1)
    entregues = pedidos[
        (pedidos["status"] == "entregue")
        & (pedidos["data"] >= ini_janela)
        & (pedidos["data"] <= data_ref)
    ]
    vendas_janela = itens[itens["pedido_id"].isin(entregues["id"])]
    venda_media = (
        (vendas_janela.groupby("sku")["qtd"].sum() / JANELA_VENDA_DIAS)
        .rename("venda_media_dia")
    )

    risco = (
        pd.concat([estoque_atual, venda_media], axis=1)
        .fillna(0.0)
        .assign(dias_cobertura=lambda df: df["estoque_atual"] / df["venda_media_dia"])
    )
    risco = risco[(risco["venda_media_dia"] > 0) & (risco["dias_cobertura"] < DIAS_COBERTURA_MINIMA)]

    resultado = (
        risco.reset_index()
        .merge(produtos[["sku", "descricao", "categoria"]], on="sku")
        .sort_values("dias_cobertura")
        .assign(
            data_referencia=data_ref.strftime("%Y-%m-%d"),
            venda_media_dia=lambda df: df["venda_media_dia"].round(1),
            dias_cobertura=lambda df: df["dias_cobertura"].round(1),
        )
        [["data_referencia", "sku", "descricao", "categoria",
          "estoque_atual", "venda_media_dia", "dias_cobertura"]]
    )

    resultado.to_csv(ARQUIVO_SAIDA, index=False, encoding="utf-8")
    print(
        f"[ok] {len(resultado)} SKUs com cobertura < {DIAS_COBERTURA_MINIMA} dias "
        f"(referência {data_ref.strftime('%d/%m/%Y')}) gravados em {ARQUIVO_SAIDA.name}."
    )


if __name__ == "__main__":
    main()
