from __future__ import annotations

import pandas as pd

from .config import WORKBOOK_RISKS_SHEET, WORKBOOK_SOURCE


RISK_COLUMNS = [
    "risk",
    "probability",
    "impact",
    "criticality",
    "mitigation",
    "owner",
    "follow_up",
]

OWNER_BY_RISK = {
    "Retard sur le MVP (8 semaines)": "PO/SM",
    "Fuite de photos / données": "Tech lead",
    "Non‑conformité (consentement / suppression)": "PO + juridique",
    "Adoption faible (peu d’usage de la photo)": "PO",
}


def calculate_criticality(probability: float, impact: float) -> float:
    return probability * impact


def build_risks(source_path=WORKBOOK_SOURCE) -> pd.DataFrame:
    raw = pd.read_excel(source_path, sheet_name=WORKBOOK_RISKS_SHEET, header=None, engine="openpyxl")
    header_row = raw.index[raw.iloc[:, 0].eq("Risque")][0]
    table = raw.iloc[header_row + 1 :, :6].copy()
    table.columns = ["risk", "probability", "impact", "criticality_source", "mitigation", "follow_up"]
    table = table[table["risk"].notna()]
    table["probability"] = pd.to_numeric(table["probability"], errors="coerce")
    table["impact"] = pd.to_numeric(table["impact"], errors="coerce")
    table["criticality"] = table.apply(
        lambda row: calculate_criticality(row["probability"], row["impact"]),
        axis=1,
    )
    table["owner"] = table["risk"].map(OWNER_BY_RISK).fillna("")
    return table[RISK_COLUMNS].reset_index(drop=True)
