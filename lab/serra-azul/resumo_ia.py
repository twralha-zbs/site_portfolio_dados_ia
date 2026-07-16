"""Resumo executivo automático da Distribuidora Serra Azul (estudo de caso).

Lê os CSVs sintéticos de `data/`, calcula os KPIs do mês mais recente da base
e gera um resumo executivo em PT-BR:

- com `GEMINI_API_KEY` no ambiente, o texto é gerado pela API do Gemini
  (SDK `google-genai`);
- sem a chave (ou se a chamada falhar), cai num modo offline que monta o
  resumo por template determinístico com os mesmos KPIs.

Em ambos os modos o resumo é impresso no terminal e gravado em
`resumo_exemplo.md`. Uso:

    python resumo_ia.py [--offline]

Empresa fictícia, dados 100% sintéticos — ver README.md.
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

import pandas as pd

# O console do Windows usa cp1252 por padrão e não imprime caracteres como "≥"
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

PASTA = Path(__file__).resolve().parent
PASTA_DADOS = PASTA / "data"
ARQUIVO_SAIDA = PASTA / "resumo_exemplo.md"

# Modelo padrão; pode ser trocado sem editar o código (ex.: GEMINI_MODEL=gemini-2.5-pro)
MODELO_PADRAO = "gemini-2.5-flash"

# Mesma regra da medida DAX "Clientes em Risco de Churn" (especificacao_powerbi.md):
# cliente frequente (>= 6 pedidos no mesmo trimestre do ano anterior) que caiu
# para <= 50% dessa frequência nos últimos 90 dias. A comparação é com o mesmo
# período do ano anterior para neutralizar a sazonalidade (verão x baixa
# temporada), que geraria falsos positivos numa comparação trimestre a trimestre.
JANELA_DIAS = 90
MIN_PEDIDOS_TRIMESTRE = 6
FATOR_QUEDA = 0.5


def brl(valor: float) -> str:
    """Formata um valor em reais no padrão PT-BR (R$ 1.234.567)."""
    return "R$ " + f"{valor:,.0f}".replace(",", ".")


def pct(valor: float, casas: int = 1) -> str:
    """Formata uma fração como percentual PT-BR (0.084 -> '8,4%')."""
    return f"{valor * 100:.{casas}f}%".replace(".", ",")


def carregar_dados() -> dict[str, pd.DataFrame]:
    """Carrega os CSVs necessários, com datas parseadas."""
    dfs = {
        "pedidos": pd.read_csv(PASTA_DADOS / "pedidos.csv", parse_dates=["data"]),
        "itens": pd.read_csv(PASTA_DADOS / "itens_pedido.csv"),
        "produtos": pd.read_csv(PASTA_DADOS / "produtos.csv"),
        "vendedores": pd.read_csv(PASTA_DADOS / "vendedores.csv"),
        "metas": pd.read_csv(PASTA_DADOS / "metas.csv"),
    }
    return dfs


def calcular_kpis(dfs: dict[str, pd.DataFrame]) -> dict:
    """Calcula os KPIs do mês de referência (o mais recente da base)."""
    pedidos = dfs["pedidos"]
    itens = dfs["itens"]

    # Receita só conta pedidos entregues (regra do dicionário de dados).
    entregues = pedidos[pedidos["status"] == "entregue"]
    vendas = itens.merge(
        entregues[["id", "cliente_id", "vendedor_id", "data"]],
        left_on="pedido_id",
        right_on="id",
    )
    vendas["receita"] = vendas["qtd"] * vendas["preco_unit"]

    data_ref = pedidos["data"].max()
    mes_ref = data_ref.to_period("M")
    mes_anterior = mes_ref - 1
    mes_ano_anterior = mes_ref - 12
    vendas["mes"] = vendas["data"].dt.to_period("M")

    receita_por_mes = vendas.groupby("mes")["receita"].sum()
    receita_mes = receita_por_mes.get(mes_ref, 0.0)
    receita_mes_anterior = receita_por_mes.get(mes_anterior, 0.0)
    receita_ano_anterior = receita_por_mes.get(mes_ano_anterior, 0.0)

    # Ruptura: % de pedidos entregues do mês com >= 1 item de atendimento parcial.
    vendas_mes = vendas[vendas["mes"] == mes_ref]
    pedidos_mes = vendas_mes["pedido_id"].nunique()
    pedidos_ruptura = vendas_mes.loc[vendas_mes["flag_ruptura"] == 1, "pedido_id"].nunique()

    # Top-5 SKUs do mês por receita.
    top5 = (
        vendas_mes.groupby("sku")["receita"]
        .sum()
        .nlargest(5)
        .reset_index()
        .merge(dfs["produtos"][["sku", "descricao"]], on="sku")
    )

    # Clientes em risco de churn: frequência dos últimos 90 dias vs. o mesmo
    # período do ano anterior (neutraliza a sazonalidade).
    ini_atual = data_ref - pd.Timedelta(days=JANELA_DIAS - 1)
    ini_ly = ini_atual - pd.DateOffset(years=1)
    fim_ly = data_ref - pd.DateOffset(years=1)
    freq_atual = (
        entregues[entregues["data"] >= ini_atual].groupby("cliente_id")["id"].nunique()
    )
    freq_anterior = (
        entregues[(entregues["data"] >= ini_ly) & (entregues["data"] <= fim_ly)]
        .groupby("cliente_id")["id"]
        .nunique()
    )
    base = freq_anterior[freq_anterior >= MIN_PEDIDOS_TRIMESTRE]
    atual = freq_atual.reindex(base.index, fill_value=0)
    clientes_risco = int((atual <= base * FATOR_QUEDA).sum())

    # Vendedores vs. meta no mês de referência.
    receita_vendedor = vendas_mes.groupby("vendedor_id")["receita"].sum()
    metas_mes = dfs["metas"][dfs["metas"]["mes"] == str(mes_ref)]
    desempenho = metas_mes.assign(
        receita=metas_mes["vendedor_id"].map(receita_vendedor).fillna(0.0)
    )
    desempenho["atingimento"] = desempenho["receita"] / desempenho["meta_valor"]
    abaixo = desempenho[desempenho["atingimento"] < 1.0].merge(
        dfs["vendedores"][["id", "nome"]], left_on="vendedor_id", right_on="id"
    )

    return {
        "data_ref": data_ref,
        "mes_ref": mes_ref,
        "receita_mes": receita_mes,
        "var_mes_anterior": receita_mes / receita_mes_anterior - 1 if receita_mes_anterior else None,
        "var_ano_anterior": receita_mes / receita_ano_anterior - 1 if receita_ano_anterior else None,
        "pct_ruptura": pedidos_ruptura / pedidos_mes if pedidos_mes else 0.0,
        "pedidos_mes": pedidos_mes,
        "top5": top5,
        "clientes_risco": clientes_risco,
        "vendedores_abaixo": abaixo,
    }


def kpis_em_texto(k: dict) -> str:
    """Bloco de KPIs em texto — vira prompt do LLM e corpo do modo offline."""
    meses_pt = {
        1: "janeiro", 2: "fevereiro", 3: "março", 4: "abril", 5: "maio",
        6: "junho", 7: "julho", 8: "agosto", 9: "setembro", 10: "outubro",
        11: "novembro", 12: "dezembro",
    }
    nome_mes = f"{meses_pt[k['mes_ref'].month]}/{k['mes_ref'].year}"

    linhas = [
        f"Mês de referência: {nome_mes} (dados até {k['data_ref'].strftime('%d/%m/%Y')})",
        f"Receita do mês: {brl(k['receita_mes'])}",
    ]
    if k["var_mes_anterior"] is not None:
        sinal = "+" if k["var_mes_anterior"] >= 0 else ""
        linhas.append(f"Variação vs. mês anterior: {sinal}{pct(k['var_mes_anterior'])}")
    if k["var_ano_anterior"] is not None:
        sinal = "+" if k["var_ano_anterior"] >= 0 else ""
        linhas.append(f"Variação vs. mesmo mês do ano anterior: {sinal}{pct(k['var_ano_anterior'])}")
    linhas.append(
        f"Pedidos com ruptura (atendimento parcial por falta de estoque): "
        f"{pct(k['pct_ruptura'])} dos {k['pedidos_mes']} pedidos do mês"
    )
    linhas.append(
        "Clientes em risco de churn (compraram nos últimos 90 dias metade ou menos "
        f"do que no mesmo período do ano passado): {k['clientes_risco']}"
    )

    linhas.append("Top 5 produtos do mês por receita:")
    for _, linha in k["top5"].iterrows():
        linhas.append(f"  - {linha['descricao']}: {brl(linha['receita'])}")

    if len(k["vendedores_abaixo"]) > 0:
        linhas.append("Vendedores abaixo da meta no mês:")
        for _, v in k["vendedores_abaixo"].iterrows():
            linhas.append(
                f"  - {v['nome']} (id {v['vendedor_id']}): {brl(v['receita'])} "
                f"de {brl(v['meta_valor'])} ({pct(v['atingimento'], 0)} da meta)"
            )
    else:
        linhas.append("Todos os vendedores bateram a meta no mês.")

    return "\n".join(linhas)


def gerar_com_gemini(kpis_txt: str) -> str:
    """Gera o resumo via API do Gemini. Levanta exceção se algo falhar."""
    from google import genai  # import tardio: o modo offline não exige o SDK

    prompt = (
        "Você é analista de dados sênior da Distribuidora Serra Azul, um atacado "
        "de bebidas em MG. Escreva um resumo executivo semanal em português do "
        "Brasil para a diretoria, a partir dos KPIs abaixo.\n\n"
        "Regras:\n"
        "- 3 a 4 parágrafos curtos, tom direto e factual, sem jargão nem elogios vazios;\n"
        "- comece pelo desempenho de receita, depois ruptura de estoque, depois "
        "clientes em risco e vendedores abaixo da meta;\n"
        "- termine com 2 ou 3 recomendações práticas em lista;\n"
        "- use os números exatamente como fornecidos (formato brasileiro).\n\n"
        f"KPIs:\n{kpis_txt}"
    )
    cliente = genai.Client()  # lê GEMINI_API_KEY do ambiente
    modelo = os.environ.get("GEMINI_MODEL", MODELO_PADRAO)
    resposta = cliente.models.generate_content(model=modelo, contents=prompt)
    return resposta.text.strip()


def gerar_offline(kpis_txt: str) -> str:
    """Resumo determinístico por template — fallback sem chave de API."""
    return (
        "## Resumo executivo (modo offline — template determinístico)\n\n"
        "Indicadores da semana, calculados a partir da base de vendas:\n\n"
        f"{kpis_txt}\n\n"
        "Recomendações padrão: priorizar reposição dos SKUs de alto giro, "
        "acionar os vendedores dos clientes em queda de frequência e revisar "
        "o plano de ação dos vendedores abaixo da meta.\n\n"
        "> Nota: defina a variável de ambiente GEMINI_API_KEY para gerar este "
        "resumo em linguagem natural via API do Gemini."
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Gera o resumo executivo da Serra Azul.")
    parser.add_argument(
        "--offline",
        action="store_true",
        help="força o modo offline (template), mesmo com GEMINI_API_KEY definida",
    )
    args = parser.parse_args()

    print("Carregando CSVs e calculando KPIs...", file=sys.stderr)
    kpis = calcular_kpis(carregar_dados())
    kpis_txt = kpis_em_texto(kpis)

    usar_api = not args.offline and bool(os.environ.get("GEMINI_API_KEY"))
    modo = "gemini"
    if usar_api:
        try:
            resumo = gerar_com_gemini(kpis_txt)
        except Exception as erro:  # rede, chave inválida, SDK ausente etc.
            print(f"Aviso: falha na API do Gemini ({erro}); usando modo offline.", file=sys.stderr)
            resumo = gerar_offline(kpis_txt)
            modo = "offline"
    else:
        if not args.offline:
            print("Aviso: GEMINI_API_KEY não definida; usando modo offline.", file=sys.stderr)
        resumo = gerar_offline(kpis_txt)
        modo = "offline"

    cabecalho = (
        "# Resumo executivo — Distribuidora Serra Azul\n\n"
        "> Estudo de caso demonstrativo — empresa fictícia com dados sintéticos. "
        f"Gerado por `resumo_ia.py` (modo: {modo}).\n\n"
    )
    ARQUIVO_SAIDA.write_text(cabecalho + resumo + "\n", encoding="utf-8")

    print(resumo)
    print(f"\n[ok] Resumo gravado em {ARQUIVO_SAIDA.name} (modo: {modo}).", file=sys.stderr)


if __name__ == "__main__":
    main()
