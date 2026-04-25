from __future__ import annotations

import math
from typing import Any

import pandas as pd

from .config import WORKBOOK_BUDGET_SHEET, WORKBOOK_SOURCE


def effort_with_buffer(effort_days: float, buffer_rate: float) -> float:
    return effort_days * (1 + buffer_rate)


def monthly_net_benefit(
    monthly_active_users: float,
    orders_per_user: float,
    uplift: float,
    average_order_value: float,
    gross_margin: float,
    monthly_cost: float,
) -> float:
    gross_gain = (
        monthly_active_users
        * orders_per_user
        * uplift
        * average_order_value
        * gross_margin
    )
    return gross_gain - monthly_cost


def break_even_months(initial_investment: float, monthly_net: float) -> float | str:
    if monthly_net <= 0:
        return "n/a"
    return initial_investment / monthly_net


def build_financial_summary(source_path=WORKBOOK_SOURCE) -> pd.DataFrame:
    rows = _budget_rows(source_path)
    effort_mvp = _value_after_label(rows, "Effort du MVP")
    buffer_rate = _value_after_label(rows, "Marge d’aléas")
    effort_total = effort_with_buffer(float(effort_mvp), float(buffer_rate))
    initial_investment = _value_after_label(rows, "Investissement initial")
    recurring_monthly = _value_after_label(rows, "Coût mensuel après lancement")
    cloud_monthly = _sum_costs(
        rows,
        [
            "Stockage des images",
            "Appels IA",
            "Hébergement API",
            "Logs & monitoring",
        ],
    )
    maintenance_monthly = _cost_for_label(rows, "Petite maintenance")
    optimistic_break_even = _value_after_label(rows, "Point mort (scénario optimiste)")

    records = [
        ("investment_initial", initial_investment, "EUR", "Budget one-shot de construction du MVP."),
        ("mvp_effort_days", effort_mvp, "JH", "Effort MVP avant marge."),
        ("buffer_rate", buffer_rate, "ratio", "Marge d'aléas appliquée au backlog."),
        ("effort_with_buffer_days", effort_total, "JH", "Effort MVP avec buffer."),
        ("recurring_monthly_cost", recurring_monthly, "EUR/month", "Cloud + exploitation + maintenance."),
        ("cloud_monthly_cost", cloud_monthly, "EUR/month", "Stockage, appels IA, API et logs."),
        ("maintenance_monthly_cost", maintenance_monthly, "EUR/month", "Petite maintenance mensuelle."),
        ("break_even_optimistic_months", optimistic_break_even, "months", "Point mort du scénario optimiste."),
    ]
    return pd.DataFrame(records, columns=["metric", "value", "unit", "description"])


def build_roi_scenarios(source_path=WORKBOOK_SOURCE) -> pd.DataFrame:
    rows = _budget_rows(source_path)
    initial_investment = float(_value_after_label(rows, "Investissement initial"))
    monthly_cost = float(_value_after_label(rows, "Coût mensuel après lancement"))

    optimistic = _scenario_from_rows(rows, "Optimiste", column_index=1)
    pessimistic = _scenario_from_rows(rows, "Pessimiste", column_index=2)

    records = []
    for scenario, values in [("optimiste", optimistic), ("pessimiste", pessimistic)]:
        net = monthly_net_benefit(
            values["monthly_active_users"],
            values["orders_per_user_month"],
            values["uplift"],
            values["average_order_value"],
            values["gross_margin"],
            monthly_cost,
        )
        records.append(
            {
                "scenario": scenario,
                **values,
                "monthly_net_benefit": net,
                "break_even_months": break_even_months(initial_investment, net),
            }
        )
    return pd.DataFrame(records)


def _budget_rows(source_path) -> list[list[Any]]:
    dataframe = pd.read_excel(
        source_path,
        sheet_name=WORKBOOK_BUDGET_SHEET,
        header=None,
        engine="openpyxl",
    )
    return dataframe.where(pd.notna(dataframe), None).values.tolist()


def _value_after_label(rows: list[list[Any]], label: str) -> Any:
    for row in rows:
        first = str(row[0] or "")
        if label in first:
            return row[1]
    raise ValueError(f"Label not found: {label}")


def _cost_for_label(rows: list[list[Any]], label: str) -> float:
    for row in rows:
        if label in str(row[0] or ""):
            for value in row[1:]:
                if isinstance(value, (int, float)) and not math.isnan(value):
                    last_numeric = value
            return float(last_numeric)
    raise ValueError(f"Cost label not found: {label}")


def _sum_costs(rows: list[list[Any]], labels: list[str]) -> float:
    return sum(_cost_for_label(rows, label) for label in labels)


def _scenario_from_rows(rows: list[list[Any]], name: str, column_index: int) -> dict[str, float]:
    mapping = {
        "Utilisateurs actifs par mois": "monthly_active_users",
        "Achats moyens par utilisateur": "orders_per_user_month",
        "Gain grâce aux recommandations": "uplift",
        "Panier moyen": "average_order_value",
        "Marge brute": "gross_margin",
    }
    values = {}
    for label, target in mapping.items():
        for row in rows:
            if label in str(row[0] or ""):
                values[target] = float(row[column_index])
                break
        else:
            raise ValueError(f"{name}: missing scenario label {label}")
    return values
