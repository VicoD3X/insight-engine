from __future__ import annotations

from typing import Any

import pandas as pd

from .config import BACKLOG_SHEET, BACKLOG_SOURCE


BACKLOG_COLUMNS = [
    "id",
    "theme",
    "description",
    "business_value",
    "moscow",
    "effort_days",
    "data_used",
    "acceptance_criteria",
    "sprint",
    "comment",
]

THEME_BY_ID = {
    "US-01": "Photo & garde-robe",
    "US-02": "Photo & qualité",
    "US-03": "RGPD & sécurité",
    "US-04": "Analyse visuelle",
    "US-05": "Analyse visuelle",
    "US-06": "Signature visuelle",
    "US-07": "Recommandation",
    "US-08": "Expérience d'achat",
    "US-09": "Expérience d'achat",
    "US-10": "Feedback & amélioration",
    "US-11": "Feedback & amélioration",
    "US-12": "RGPD & consentement",
    "US-13": "RGPD & suppression",
    "US-14": "Préférences",
    "US-15": "Préférences",
    "US-16": "Modération",
    "US-17": "Pilotage & métriques",
}

SPRINT_BY_ID = {
    "US-01": "Sprint 1",
    "US-02": "Sprint 1",
    "US-03": "Sprint 1",
    "US-12": "Sprint 1",
    "US-04": "Sprint 2",
    "US-05": "Sprint 2",
    "US-06": "Sprint 2",
    "US-07": "Sprint 3",
    "US-08": "Sprint 3",
    "US-09": "Sprint 3",
    "US-10": "Sprint 4",
    "US-11": "Sprint 4",
    "US-13": "Sprint 4",
    "US-14": "Sprint 4",
    "US-15": "Sprint 4",
    "US-16": "Sprint 4",
    "US-17": "Sprint 4",
}


def normalize_moscow(priority: Any) -> str:
    value = str(priority or "").upper()
    if "MUST" in value or "INDISPENSABLE" in value:
        return "MUST"
    if "SHOULD" in value or "IMPORTANT" in value:
        return "SHOULD"
    if "COULD" in value:
        return "COULD"
    if "WON" in value:
        return "WONT"
    return ""


def build_backlog(source_path=BACKLOG_SOURCE) -> pd.DataFrame:
    raw = pd.read_excel(source_path, sheet_name=BACKLOG_SHEET, header=None, engine="openpyxl")
    header_row = raw.index[raw.iloc[:, 0].eq("ID")][0]
    table = raw.iloc[header_row + 1 :, :7].copy()
    table.columns = [
        "id",
        "description",
        "business_value",
        "priority_raw",
        "effort_days",
        "data_used",
        "acceptance_criteria",
    ]
    table = table[table["id"].astype(str).str.match(r"^US-\d+", na=False)]
    table["moscow"] = table["priority_raw"].map(normalize_moscow)
    table["effort_days"] = pd.to_numeric(table["effort_days"], errors="coerce")
    table["theme"] = table["id"].map(THEME_BY_ID).fillna("")
    table["sprint"] = table["id"].map(SPRINT_BY_ID).fillna("")
    table["comment"] = ""
    return table[BACKLOG_COLUMNS].reset_index(drop=True)


def backlog_effort_total(backlog: pd.DataFrame) -> float:
    return float(backlog["effort_days"].sum())


def summarize_by_moscow(backlog: pd.DataFrame) -> pd.DataFrame:
    return (
        backlog.groupby("moscow", as_index=False)
        .agg(user_stories=("id", "count"), effort_days=("effort_days", "sum"))
        .sort_values("moscow")
    )
