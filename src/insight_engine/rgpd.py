from __future__ import annotations

import pandas as pd

from .config import WORKBOOK_RGPD_SHEET, WORKBOOK_SOURCE


RGPD_COLUMNS = [
    "finality",
    "legal_basis",
    "processor",
    "retention",
    "security_measures",
    "user_rights",
    "processed_data",
]


def build_rgpd_summary(source_path=WORKBOOK_SOURCE) -> pd.DataFrame:
    rows = pd.read_excel(
        source_path,
        sheet_name=WORKBOOK_RGPD_SHEET,
        header=None,
        engine="openpyxl",
    ).where(lambda dataframe: pd.notna(dataframe), None).values.tolist()

    record = {
        "finality": _find_text(rows, "On décrit un seul traitement"),
        "legal_basis": _value_next_to_label(rows, "Base légale"),
        "processor": "Microsoft Azure (hébergement + traitements techniques)",
        "retention": _value_next_to_label(rows, "Conservation"),
        "security_measures": _value_next_to_label(rows, "Sécurité"),
        "user_rights": _value_next_to_label(rows, "Droits"),
        "processed_data": _row_after_label(rows, "Quelles données sont utilisées ?"),
    }
    return pd.DataFrame([record], columns=RGPD_COLUMNS)


def _find_text(rows: list[list[object]], prefix: str) -> str:
    for row in rows:
        value = str(row[0] or "")
        if value.startswith(prefix):
            return value
    return ""


def _value_next_to_label(rows: list[list[object]], label: str) -> str:
    for row in rows:
        if str(row[0] or "") == label:
            return str(row[1] or "")
    return ""


def _row_after_label(rows: list[list[object]], label: str) -> str:
    for index, row in enumerate(rows):
        if str(row[0] or "") == label and index + 1 < len(rows):
            return str(rows[index + 1][0] or "")
    return ""
