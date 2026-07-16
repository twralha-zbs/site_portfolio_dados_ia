"""
Gerador da base sintética da Distribuidora Serra Azul Ltda. (empresa fictícia).

Gera 7 CSVs em ./data/ cobrindo jan/2024 a jun/2026 (30 meses), com padrões
de negócio plantados para o estudo de caso do portfólio:

  1. Sazonalidade — pico de vendas no verão (dez–fev) e bumps em datas festivas.
  2. Curva ABC — os 50 SKUs mais vendidos (20%) concentram ~78% da receita.
  3. Ruptura — ~8% dos pedidos têm item com atendimento parcial (flag_ruptura),
     concentrada nos top-50 SKUs e nos meses de pico.
  4. Churn — 90 clientes reduzem progressivamente a frequência de compra
     entre mar/2026 e jun/2026.
  5. Metas — 2 vendedores ficam consistentemente abaixo da meta mensal.

Reprodutibilidade: seed fixa (42) em numpy e Faker; duas execuções produzem
arquivos byte-idênticos (com as versões pinadas em requirements.txt).

Uso:
    pip install -r requirements.txt
    python gerar_dados.py
"""

from __future__ import annotations

import calendar
from datetime import date, timedelta
from pathlib import Path

import numpy as np
import pandas as pd
from faker import Faker

# ---------------------------------------------------------------------------
# Configuração
# ---------------------------------------------------------------------------

SEED = 42
DATA_INICIO = date(2024, 1, 1)
DATA_FIM = date(2026, 6, 30)
MESES = pd.period_range("2024-01", "2026-06", freq="M")  # 30 meses

N_CLIENTES = 1200
N_SKUS = 250
N_VENDEDORES = 12

RECEITA_MENSAL_ALVO = 4_000_000  # R$/mês (aproximado)
FREQ_MEDIA_PEDIDOS_MES = 1.5     # pedidos por cliente por mês (média)

# Padrão 1 — multiplicador de sazonalidade por mês-calendário
SAZONALIDADE = {
    1: 1.32, 2: 1.22, 3: 1.05, 4: 0.88, 5: 0.85, 6: 0.98,
    7: 0.90, 8: 0.92, 9: 1.00, 10: 1.06, 11: 1.15, 12: 1.42,
}

# Padrão 2 — curva ABC
SHARE_RECEITA_TOP50 = 0.78

# Padrão 3 — ruptura
TAXA_RUPTURA_PEDIDOS = 0.082  # fração de pedidos com >= 1 item em ruptura

# Padrão 4 — churn: fator de frequência dos clientes em churn por mês
CLIENTES_CHURN = 90
FATOR_CHURN = {"2026-03": 0.70, "2026-04": 0.45, "2026-05": 0.28, "2026-06": 0.15}

# Padrão 5 — vendedores abaixo da meta (ids fixos)
VENDEDORES_FRACOS = [3, 9]
FATOR_VENDEDOR_FRACO = 0.80  # redução de frequência dos clientes da carteira

REGIOES = ["Grande BH", "Sul de Minas", "Zona da Mata", "Vale do Aço"]
CIDADES = {
    "Grande BH": ["Belo Horizonte", "Contagem", "Betim", "Nova Lima", "Sabará"],
    "Sul de Minas": ["Varginha", "Poços de Caldas", "Pouso Alegre", "Lavras", "Três Corações"],
    "Zona da Mata": ["Juiz de Fora", "Muriaé", "Ubá", "Viçosa", "Cataguases"],
    "Vale do Aço": ["Ipatinga", "Coronel Fabriciano", "Timóteo", "Caratinga", "Santana do Paraíso"],
}

# categoria: (qtd de SKUs, marcas, embalagens, faixa de preço da caixa em R$)
CATALOGO = {
    "Cerveja": (90,
                ["Serra Dourada", "Alpina", "Vale do Ouro", "Imperial Minas", "Boêmia Mineira"],
                ["Lata 350ml cx12", "Lata 473ml cx12", "Long Neck 355ml cx24", "Garrafa 600ml cx12"],
                (48.0, 125.0)),
    "Refrigerante": (60,
                     ["Guaraná Serrano", "Refrix", "Horizonte", "Tuiuiú"],
                     ["Lata 350ml cx12", "PET 600ml cx12", "PET 2L cx6"],
                     (28.0, 72.0)),
    "Água": (40,
             ["Fonte Azul", "Cristal da Serra", "Minas Pura"],
             ["Garrafa 500ml cx12", "Garrafa 1,5L cx6", "Galão 20L un"],
             (14.0, 42.0)),
    "Energético": (30,
                   ["Voltz", "Kraft Energy", "Trovão"],
                   ["Lata 250ml cx6", "Lata 473ml cx6"],
                   (85.0, 175.0)),
    "Suco": (30,
             ["Pomar Real", "Frutta Viva", "Serra Verde"],
             ["Caixa 1L cx12", "Garrafa 300ml cx12", "PET 1,5L cx6"],
             (32.0, 78.0)),
}
FORNECEDORES = [
    "Bebidas Mantiqueira S.A.", "Distribuidora Vale Verde", "Grupo Serrano Bebidas",
    "Fábrica Alto da Serra", "Envasadora Minas Sul", "Comercial Pedra Branca",
]

TIPOS_PDV = ["Bar", "Mercado", "Restaurante", "Conveniência", "Padaria"]
PROB_TIPOS_PDV = [0.40, 0.25, 0.20, 0.10, 0.05]

OUT_DIR = Path(__file__).resolve().parent / "data"

rng = np.random.default_rng(SEED)
Faker.seed(SEED)
fake = Faker("pt_BR")


def _dia_util(ano: int, mes: int, dia: int) -> date:
    """Move pedidos que caírem no domingo para o dia útil vizinho."""
    d = date(ano, mes, dia)
    if d.weekday() == 6:  # domingo
        d = d + timedelta(days=1) if dia < calendar.monthrange(ano, mes)[1] else d - timedelta(days=1)
    return d


# ---------------------------------------------------------------------------
# Dimensões
# ---------------------------------------------------------------------------

def gerar_vendedores() -> pd.DataFrame:
    linhas = []
    for i in range(N_VENDEDORES):
        admissao = date(2015, 1, 1) + timedelta(days=int(rng.integers(0, 8 * 365)))
        linhas.append({
            "id": i + 1,
            "nome": fake.name(),
            "regiao": REGIOES[i // 3],  # 3 vendedores por região
            "data_admissao": admissao.isoformat(),
        })
    return pd.DataFrame(linhas)


def gerar_produtos() -> tuple[pd.DataFrame, np.ndarray, np.ndarray]:
    """Retorna (produtos, probs de venda por SKU, índices dos top-50 por receita esperada)."""
    linhas = []
    for categoria, (qtd, marcas, embalagens, (p_min, p_max)) in CATALOGO.items():
        for _ in range(qtd):
            marca = marcas[int(rng.integers(0, len(marcas)))]
            emb = embalagens[int(rng.integers(0, len(embalagens)))]
            preco = round(float(rng.uniform(p_min, p_max)), 2)
            margem = float(rng.uniform(0.18, 0.35))
            linhas.append({
                "categoria": categoria,
                "marca": marca,
                "descricao": f"{marca} {categoria} {emb}",
                "preco_tabela": preco,
                "custo": round(preco * (1 - margem), 2),
                "fornecedor": FORNECEDORES[int(rng.integers(0, len(FORNECEDORES)))],
            })
    df = pd.DataFrame(linhas)
    ordem = rng.permutation(len(df))  # embaralha para o código do SKU não denunciar a curva ABC
    df = df.iloc[ordem].reset_index(drop=True)
    df.insert(0, "sku", [f"SKU-{i + 1:04d}" for i in range(len(df))])

    # Popularidade com cauda longa + calibração da curva ABC (padrão 2):
    # escala a popularidade dos top-50 (por receita esperada) para que a
    # participação deles na receita seja ~SHARE_RECEITA_TOP50.
    pop = rng.pareto(1.3, N_SKUS) + 0.05
    receita_esp = pop * df["preco_tabela"].to_numpy()
    top50 = np.argsort(receita_esp)[::-1][:50]
    mask_top = np.zeros(N_SKUS, dtype=bool)
    mask_top[top50] = True
    escala = (SHARE_RECEITA_TOP50 / (1 - SHARE_RECEITA_TOP50)) * (
        receita_esp[~mask_top].sum() / receita_esp[mask_top].sum()
    )
    pop[mask_top] *= escala
    probs = pop / pop.sum()
    return df, probs, top50


def gerar_clientes(vendedores: pd.DataFrame) -> pd.DataFrame:
    pesos_vend = rng.dirichlet(np.full(N_VENDEDORES, 30.0))
    vendedor_ids = rng.choice(vendedores["id"].to_numpy(), size=N_CLIENTES, p=pesos_vend)
    regiao_por_vend = dict(zip(vendedores["id"], vendedores["regiao"]))

    tipos = rng.choice(TIPOS_PDV, size=N_CLIENTES, p=PROB_TIPOS_PDV)
    linhas = []
    for i in range(N_CLIENTES):
        tipo = str(tipos[i])
        vid = int(vendedor_ids[i])
        cidades = CIDADES[regiao_por_vend[vid]]
        if rng.random() < 0.85:  # maioria cadastrada antes do período analisado
            cadastro = date(2018, 1, 1) + timedelta(days=int(rng.integers(0, 6 * 365)))
        else:
            cadastro = date(2024, 1, 1) + timedelta(days=int(rng.integers(0, 2 * 365)))
        if tipo == "Bar":
            nome = f"Bar do {fake.first_name()}"
        elif tipo == "Mercado":
            nome = f"Mercado {fake.last_name()}"
        elif tipo == "Restaurante":
            nome = f"Restaurante {fake.last_name()}"
        elif tipo == "Conveniência":
            nome = f"Conveniência {fake.last_name()} 24h"
        else:
            nome = f"Padaria {fake.last_name()}"
        linhas.append({
            "id": i + 1,
            "nome_fantasia": nome,
            "tipo_pdv": tipo,
            "cidade": cidades[int(rng.integers(0, len(cidades)))],
            "uf": "MG",
            "data_cadastro": cadastro.isoformat(),
            "vendedor_id": vid,
        })
    df = pd.DataFrame(linhas)

    # Atributos internos do gerador (NÃO são gravados no CSV): frequência de
    # compra e marcação de churn — o dashboard deve descobrir o churn nos dados.
    freq = rng.gamma(2.2, FREQ_MEDIA_PEDIDOS_MES / 2.2, N_CLIENTES).clip(0.15, 8.0)
    fator_tipo = df["tipo_pdv"].map(
        {"Bar": 1.15, "Mercado": 1.05, "Restaurante": 0.95, "Conveniência": 0.85, "Padaria": 0.70}
    ).to_numpy()
    df["_freq_mensal"] = freq * fator_tipo
    df.loc[df["vendedor_id"].isin(VENDEDORES_FRACOS), "_freq_mensal"] *= FATOR_VENDEDOR_FRACO

    elegiveis = df.index[df["data_cadastro"] < "2024-07-01"].to_numpy()
    churn_idx = rng.choice(elegiveis, size=CLIENTES_CHURN, replace=False)
    df["_churn"] = False
    df.loc[np.sort(churn_idx), "_churn"] = True
    return df


# ---------------------------------------------------------------------------
# Fatos
# ---------------------------------------------------------------------------

def gerar_pedidos(clientes: pd.DataFrame) -> pd.DataFrame:
    """Padrões 1 (sazonalidade), 4 (churn) e 5 (vendedores fracos) entram aqui."""
    saz = np.array([SAZONALIDADE[m.month] for m in MESES])
    lam = np.outer(clientes["_freq_mensal"].to_numpy(), saz)  # (clientes x meses)

    # cliente só compra a partir do mês de cadastro
    cadastro_per = pd.PeriodIndex(pd.to_datetime(clientes["data_cadastro"]), freq="M")
    mes_idx = {m: j for j, m in enumerate(MESES)}
    for i, per in enumerate(cadastro_per):
        if per > MESES[0]:
            lam[i, : mes_idx.get(per, len(MESES))] = 0.0

    # churn: queda progressiva nos 4 últimos meses
    churn_mask = clientes["_churn"].to_numpy()
    for mes_str, fator in FATOR_CHURN.items():
        j = mes_idx[pd.Period(mes_str, freq="M")]
        lam[churn_mask, j] *= fator

    n_pedidos = rng.poisson(lam)  # (1200 x 30)

    cli_rep, mes_rep = np.nonzero(n_pedidos)
    reps = n_pedidos[cli_rep, mes_rep]
    cli_all = np.repeat(clientes["id"].to_numpy()[cli_rep], reps)
    vend_all = np.repeat(clientes["vendedor_id"].to_numpy()[cli_rep], reps)
    mes_all = np.repeat(mes_rep, reps)

    anos = np.array([m.year for m in MESES])[mes_all]
    meses_cal = np.array([m.month for m in MESES])[mes_all]
    dias_no_mes = np.array([calendar.monthrange(a, m)[1] for a, m in zip(anos, meses_cal)])
    dias = rng.integers(1, dias_no_mes + 1)

    datas = [_dia_util(int(a), int(m), int(d)) for a, m, d in zip(anos, meses_cal, dias)]
    status = np.where(rng.random(len(cli_all)) < 0.02, "cancelado", "entregue")

    df = pd.DataFrame({
        "cliente_id": cli_all,
        "vendedor_id": vend_all,
        "data": [d.isoformat() for d in datas],
        "status": status,
    })
    df = df.sort_values(["data", "cliente_id"], kind="stable").reset_index(drop=True)
    df.insert(0, "id", df.index + 1)
    return df


def gerar_itens(pedidos: pd.DataFrame, produtos: pd.DataFrame,
                probs: np.ndarray, top50: np.ndarray) -> pd.DataFrame:
    """Padrão 3 (ruptura) entra aqui."""
    n_ped = len(pedidos)
    n_itens = (rng.poisson(3.6, n_ped) + 1).clip(1, 12)

    pedido_rep = np.repeat(pedidos["id"].to_numpy(), n_itens)
    sku_idx = rng.choice(N_SKUS, size=n_itens.sum(), p=probs)

    df = pd.DataFrame({"pedido_id": pedido_rep, "_sku_idx": sku_idx})
    df = df.drop_duplicates(["pedido_id", "_sku_idx"]).reset_index(drop=True)

    # calibração do ticket: qtd média tal que a receita total ~ R$ 4 mi/mês
    preco_tab = produtos["preco_tabela"].to_numpy()
    preco_esperado = float((probs * preco_tab).sum())
    alvo_linha = (RECEITA_MENSAL_ALVO * len(MESES)) / len(df) / 0.98 / 0.975  # cancelamentos e descontos
    qtd_media = alvo_linha / preco_esperado
    qtd = np.round(rng.gamma(2.0, qtd_media / 2.0, len(df))).clip(1, 80).astype(int)

    desconto = np.where(rng.random(len(df)) < 0.60, 0.0, np.round(rng.uniform(2, 12, len(df)), 1))
    preco_unit = np.round(preco_tab[df["_sku_idx"]] * (1 - desconto / 100), 2)

    df["qtd"] = qtd
    df["desconto"] = desconto
    df["preco_unit"] = preco_unit
    df["flag_ruptura"] = 0

    # ruptura por pedido: mais provável nos meses de pico (expoente 1.8),
    # reescalada para a taxa média alvo
    mes_pedido = pd.to_datetime(pedidos["data"]).dt.month.to_numpy()
    saz_media = float(np.mean(list(SAZONALIDADE.values())))
    p_rup = np.array([SAZONALIDADE[m] for m in mes_pedido]) ** 1.8 / saz_media**1.8
    p_rup = p_rup * (TAXA_RUPTURA_PEDIDOS / p_rup.mean())
    pedidos_com_ruptura = set(pedidos["id"].to_numpy()[rng.random(n_ped) < p_rup])

    # no pedido afetado, o item que falta é (quase sempre) o de maior giro —
    # concentra a ruptura nos top-50 SKUs
    mask_top = np.zeros(N_SKUS, dtype=bool)
    mask_top[top50] = True
    pop_por_linha = probs[df["_sku_idx"].to_numpy()]
    grupos = df.groupby("pedido_id").indices
    flag = df["flag_ruptura"].to_numpy().copy()
    qtd_arr = df["qtd"].to_numpy().copy()
    for pid in sorted(pedidos_com_ruptura):
        idxs = grupos.get(pid)
        if idxs is None:
            continue
        if rng.random() < 0.90:
            alvo = idxs[int(np.argmax(pop_por_linha[idxs]))]
        else:
            alvo = idxs[int(rng.integers(0, len(idxs)))]
        flag[alvo] = 1
        qtd_arr[alvo] = max(1, int(qtd_arr[alvo] * rng.uniform(0.25, 0.60)))  # atendimento parcial
    df["flag_ruptura"] = flag
    df["qtd"] = qtd_arr

    df["sku"] = produtos["sku"].to_numpy()[df["_sku_idx"]]
    df = df[["pedido_id", "sku", "qtd", "preco_unit", "desconto", "flag_ruptura"]]
    return df.sort_values(["pedido_id", "sku"], kind="stable").reset_index(drop=True)


def gerar_estoque(itens: pd.DataFrame, pedidos: pd.DataFrame,
                  produtos: pd.DataFrame) -> pd.DataFrame:
    """Saídas espelham as vendas; entradas por cadência de reposição; saldo >= 0.

    qtd é assinada: entrada > 0, saída < 0, ajuste < 0 (perdas/quebras).
    Nos meses de pico, a reposição dos SKUs de alto giro é propositalmente
    subdimensionada — os saldos baixos justificam as rupturas do case.
    """
    entregues = itens.merge(pedidos[["id", "data", "status"]], left_on="pedido_id", right_on="id")
    entregues = entregues[entregues["status"] == "entregue"]

    saidas = (entregues.groupby(["data", "sku"], as_index=False)["qtd"].sum()
              .assign(tipo="saida"))
    saidas["qtd"] = -saidas["qtd"]

    demanda_total = entregues.groupby("sku")["qtd"].sum()
    demanda_total = demanda_total.reindex(produtos["sku"], fill_value=0)
    n_semanas = (DATA_FIM - DATA_INICIO).days / 7
    demanda_semanal = (demanda_total / n_semanas).clip(lower=1.0)

    rank = demanda_total.rank(ascending=False, method="first")
    cadencia_semanas = pd.Series(np.where(rank <= 50, 1, np.where(rank <= 150, 2, 4)),
                                 index=demanda_total.index)

    segundas = []
    d = DATA_INICIO  # 2024-01-01 é segunda-feira
    while d <= DATA_FIM:
        segundas.append(d)
        d += timedelta(days=7)

    MESES_PICO = {11, 12, 1, 2}
    linhas_entrada = []
    for sku in produtos["sku"]:
        cad = int(cadencia_semanas[sku])
        base = float(demanda_semanal[sku]) * cad
        # estoque inicial em 01/01 (antes de qualquer venda): ~3 semanas de demanda
        inicial = max(24, int(round(float(demanda_semanal[sku]) * 3)))
        linhas_entrada.append({"data": DATA_INICIO.isoformat(), "sku": sku,
                               "tipo": "entrada", "qtd": inicial})
        alto_giro = rank[sku] <= 50
        for i, seg in enumerate(segundas[1:]):
            if i % cad != 0:
                continue
            if alto_giro and seg.month in MESES_PICO:
                fator = rng.uniform(0.65, 0.90)  # reposição insuficiente no pico
            else:
                fator = rng.uniform(0.95, 1.25)
            q = max(6, int(round(base * fator / 6)) * 6)  # múltiplos de 6 caixas
            linhas_entrada.append({"data": seg.isoformat(), "sku": sku, "tipo": "entrada", "qtd": q})
    entradas = pd.DataFrame(linhas_entrada)

    # ajustes esporádicos (perdas/quebras)
    n_aj = 800
    aj_sku = produtos["sku"].to_numpy()[rng.integers(0, N_SKUS, n_aj)]
    aj_dia = [(DATA_INICIO + timedelta(days=int(x))).isoformat()
              for x in rng.integers(0, (DATA_FIM - DATA_INICIO).days + 1, n_aj)]
    ajustes = pd.DataFrame({"data": aj_dia, "sku": aj_sku, "tipo": "ajuste",
                            "qtd": -rng.integers(1, 8, n_aj)})

    mov = pd.concat([entradas, ajustes, saidas], ignore_index=True)
    ordem_tipo = {"entrada": 0, "ajuste": 1, "saida": 2}
    mov["_ordem"] = mov["tipo"].map(ordem_tipo)
    mov = mov.sort_values(["sku", "data", "_ordem"], kind="stable").reset_index(drop=True)

    # saldo acumulado por SKU; se ficar negativo, reforça o estoque inicial
    mov["saldo"] = mov.groupby("sku")["qtd"].cumsum()
    minimos = mov.groupby("sku")["saldo"].min()
    deficits = (-minimos[minimos < 0]).astype(int)
    if len(deficits) > 0:
        eh_inicial = (mov["data"] == DATA_INICIO.isoformat()) & (mov["tipo"] == "entrada")
        for sku, deficit in deficits.items():
            reforco = int(np.ceil(deficit / 12) * 12)
            mov.loc[eh_inicial & (mov["sku"] == sku), "qtd"] += reforco
        mov["saldo"] = mov.groupby("sku")["qtd"].cumsum()

    mov = mov.sort_values(["data", "sku", "_ordem"], kind="stable").reset_index(drop=True)
    return mov[["data", "sku", "tipo", "qtd", "saldo"]]


def gerar_metas(pedidos: pd.DataFrame, itens: pd.DataFrame,
                vendedores: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Meta = potencial da carteira do vendedor x perfil sazonal da empresa.

    A base é a média mensal do próprio vendedor (carteiras têm tamanhos
    diferentes) com folga de 8%. Para os vendedores fracos (padrão 5) a base
    é corrigida pelo potencial da carteira — a meta reflete o que a carteira
    deveria render, e eles ficam consistentemente abaixo.
    Retorna (metas, receita por vendedor-mês para validação).
    """
    fato = itens.merge(pedidos[["id", "vendedor_id", "data", "status"]],
                       left_on="pedido_id", right_on="id")
    fato = fato[fato["status"] == "entregue"]
    fato["receita"] = fato["qtd"] * fato["preco_unit"]
    fato["mes"] = fato["data"].str[:7]

    receita = (fato.groupby(["vendedor_id", "mes"], as_index=False)["receita"].sum())
    grade = pd.MultiIndex.from_product(
        [vendedores["id"], [str(m) for m in MESES]], names=["vendedor_id", "mes"]
    ).to_frame(index=False)
    receita = grade.merge(receita, on=["vendedor_id", "mes"], how="left").fillna({"receita": 0.0})

    # perfil mensal da empresa (sazonalidade + crescimento da base de clientes)
    perfil = receita.groupby("mes")["receita"].sum()
    perfil = perfil / perfil.mean()

    media_propria = receita.groupby("vendedor_id")["receita"].mean()
    potencial = media_propria.copy()
    potencial[VENDEDORES_FRACOS] = potencial[VENDEDORES_FRACOS] / FATOR_VENDEDOR_FRACO

    metas = receita[["vendedor_id", "mes"]].copy()
    base = (metas["vendedor_id"].map(potencial).to_numpy()
            * metas["mes"].map(perfil).to_numpy())
    ruido = rng.uniform(0.98, 1.02, len(metas))
    metas["meta_valor"] = ((base * 0.92 * ruido / 1000).round() * 1000).astype(int)
    metas = metas.sort_values(["vendedor_id", "mes"], kind="stable").reset_index(drop=True)
    return metas, receita[["vendedor_id", "mes", "receita"]]


# ---------------------------------------------------------------------------
# Validação (critérios binários da Fase 1 + padrões plantados)
# ---------------------------------------------------------------------------

def validar(tabelas: dict[str, pd.DataFrame], produtos: pd.DataFrame,
            clientes: pd.DataFrame, receita_vm: pd.DataFrame) -> None:
    pedidos = tabelas["pedidos"]
    itens = tabelas["itens_pedido"]
    estoque = tabelas["estoque_movimentos"]
    metas = tabelas["metas"]

    # ⑤ zero nulos em colunas de chave
    chaves = {
        "clientes": ["id", "vendedor_id"],
        "produtos": ["sku"],
        "vendedores": ["id"],
        "pedidos": ["id", "cliente_id", "vendedor_id", "data"],
        "itens_pedido": ["pedido_id", "sku"],
        "estoque_movimentos": ["data", "sku"],
        "metas": ["vendedor_id", "mes"],
    }
    for nome, cols in chaves.items():
        assert tabelas[nome][cols].notna().all().all(), f"nulos em coluna de chave de {nome}"

    # integridade referencial
    assert set(pedidos["cliente_id"]) <= set(tabelas["clientes"]["id"])
    assert set(pedidos["vendedor_id"]) <= set(tabelas["vendedores"]["id"])
    assert set(itens["pedido_id"]) <= set(pedidos["id"])
    assert set(itens["sku"]) <= set(produtos["sku"])
    assert set(estoque["sku"]) <= set(produtos["sku"])
    assert set(metas["vendedor_id"]) == set(tabelas["vendedores"]["id"])

    # ③ volumes mínimos
    assert len(pedidos) >= 35_000, f"pedidos: {len(pedidos)}"
    assert len(itens) >= 150_000, f"itens: {len(itens)}"
    assert len(metas) == N_VENDEDORES * len(MESES) == 360

    # ④ cobertura de datas (jan/2024 a jun/2026)
    assert pedidos["data"].min() <= "2024-01-07"
    assert pedidos["data"].max() >= "2026-06-20"
    assert pedidos["data"].between("2024-01-01", "2026-06-30").all()
    assert estoque["data"].between("2024-01-01", "2026-06-30").all()

    fato = itens.merge(pedidos[["id", "data", "status", "cliente_id"]],
                       left_on="pedido_id", right_on="id")
    entregue = fato[fato["status"] == "entregue"].copy()
    entregue["receita"] = entregue["qtd"] * entregue["preco_unit"]

    # receita mensal na faixa alvo
    receita_mensal = entregue["receita"].sum() / len(MESES)
    assert 3_300_000 <= receita_mensal <= 4_700_000, f"receita mensal média: {receita_mensal:,.0f}"

    # padrão 2 — curva ABC
    receita_sku = entregue.groupby("sku")["receita"].sum().sort_values(ascending=False)
    share_top50 = receita_sku.head(50).sum() / receita_sku.sum()
    assert 0.74 <= share_top50 <= 0.82, f"share top-50: {share_top50:.3f}"

    # padrão 3 — ruptura
    pedidos_rup = fato.loc[fato["flag_ruptura"] == 1, "pedido_id"].nunique()
    taxa_rup = pedidos_rup / len(pedidos)
    assert 0.07 <= taxa_rup <= 0.095, f"taxa de ruptura: {taxa_rup:.3f}"
    rup = fato[fato["flag_ruptura"] == 1]
    top50_reais = set(receita_sku.head(50).index)
    share_rup_top50 = rup["sku"].isin(top50_reais).mean()
    assert share_rup_top50 >= 0.75, f"ruptura nos top-50: {share_rup_top50:.3f}"

    # padrão 4 — churn: queda de atividade dos clientes marcados
    churn_ids = set(clientes.loc[clientes["_churn"], "id"])
    ped_churn = pedidos[pedidos["cliente_id"].isin(churn_ids)]
    mes_ped = ped_churn["data"].str[:7]
    freq_2025 = len(ped_churn[(mes_ped >= "2025-01") & (mes_ped <= "2025-12")]) / 12
    freq_final = len(ped_churn[mes_ped >= "2026-03"]) / 4
    assert freq_final < 0.6 * freq_2025, f"churn fraco: {freq_final:.0f}/mês vs {freq_2025:.0f}/mês"

    # padrão 5 — vendedores abaixo da meta
    cmp = receita_vm.merge(metas, on=["vendedor_id", "mes"])
    cmp["abaixo"] = cmp["receita"] < cmp["meta_valor"]
    meses_abaixo = cmp.groupby("vendedor_id")["abaixo"].sum()
    for vid in VENDEDORES_FRACOS:
        assert meses_abaixo[vid] >= 25, f"vendedor {vid} abaixo em só {meses_abaixo[vid]} meses"
    for vid in meses_abaixo.index:
        if vid not in VENDEDORES_FRACOS:
            assert meses_abaixo[vid] <= 15, f"vendedor normal {vid} abaixo em {meses_abaixo[vid]} meses"

    # estoque
    assert (estoque["saldo"] >= 0).all(), "saldo de estoque negativo"

    # sazonalidade — verão vende mais que o vale de outono
    rec_mes_cal = entregue.assign(mes_cal=pd.to_datetime(entregue["data"]).dt.month)
    media_por_mes = rec_mes_cal.groupby("mes_cal")["receita"].sum()
    verao = media_por_mes[[12, 1, 2]].sum() / 3
    vale = media_por_mes[[4, 5]].sum() / 2
    assert verao > 1.25 * vale, "sazonalidade fraca"

    print("Todas as validações passaram.")
    print(f"  Receita mensal média:      R$ {receita_mensal:,.0f}")
    print(f"  Share top-50 SKUs:         {share_top50:.1%}")
    print(f"  Pedidos com ruptura:       {taxa_rup:.1%} ({share_rup_top50:.0%} nos top-50)")
    print(f"  Pedidos/mês clientes churn: {freq_2025:.0f} (2025) -> {freq_final:.0f} (mar-jun/26)")
    print(f"  Meses abaixo da meta:      " +
          ", ".join(f"vend {v}: {meses_abaixo[v]}" for v in sorted(meses_abaixo.index)))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)

    vendedores = gerar_vendedores()
    produtos, probs, top50 = gerar_produtos()
    clientes = gerar_clientes(vendedores)
    pedidos = gerar_pedidos(clientes)
    itens = gerar_itens(pedidos, produtos, probs, top50)
    estoque = gerar_estoque(itens, pedidos, produtos)
    metas, receita_vm = gerar_metas(pedidos, itens, vendedores)

    clientes_pub = clientes.drop(columns=["_freq_mensal", "_churn"])
    tabelas = {
        "clientes": clientes_pub,
        "produtos": produtos,
        "vendedores": vendedores,
        "pedidos": pedidos,
        "itens_pedido": itens,
        "estoque_movimentos": estoque,
        "metas": metas,
    }

    validar(tabelas, produtos, clientes, receita_vm)

    float_fmt = {"produtos": "%.2f", "itens_pedido": "%.2f"}
    for nome, df in tabelas.items():
        caminho = OUT_DIR / f"{nome}.csv"
        df.to_csv(caminho, index=False, encoding="utf-8", lineterminator="\n",
                  float_format=float_fmt.get(nome))
        print(f"  {caminho.name}: {len(df):,} linhas")

    print(f"\n7 arquivos gravados em {OUT_DIR}")


if __name__ == "__main__":
    main()
