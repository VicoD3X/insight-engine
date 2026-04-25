from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pandas as pd

from .backlog import build_backlog, summarize_by_moscow
from .config import (
    BACKLOG_OUTPUT,
    DASHBOARD_JSON_OUTPUT,
    FINANCIAL_SUMMARY_OUTPUT,
    PROCESSED_DATA_DIR,
    RGPD_OUTPUT,
    RISKS_OUTPUT,
    ROI_SCENARIOS_OUTPUT,
    SPRINTS,
)
from .finance import build_financial_summary, build_roi_scenarios
from .rgpd import build_rgpd_summary
from .risks import build_risks


def build_processed_datasets() -> dict[str, pd.DataFrame]:
    return {
        "backlog": build_backlog(),
        "financial_summary": build_financial_summary(),
        "roi_scenarios": build_roi_scenarios(),
        "risks": build_risks(),
        "rgpd_summary": build_rgpd_summary(),
    }


def build_dashboard_data(datasets: dict[str, pd.DataFrame] | None = None) -> dict[str, Any]:
    datasets = datasets or build_processed_datasets()
    financial_summary = datasets["financial_summary"]
    kpis = {
        row["metric"]: _json_value(row["value"])
        for row in financial_summary.to_dict(orient="records")
    }
    return {
        "kpis": kpis,
        "backlog": _records(datasets["backlog"]),
        "backlog_summary": _records(summarize_by_moscow(datasets["backlog"])),
        "roi_scenarios": _records(datasets["roi_scenarios"]),
        "risks": _records(datasets["risks"]),
        "rgpd": _records(datasets["rgpd_summary"]),
        "sprints": SPRINTS,
    }


def export_all(output_dir: Path = PROCESSED_DATA_DIR) -> dict[str, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    datasets = build_processed_datasets()

    datasets["backlog"].to_csv(BACKLOG_OUTPUT, index=False)
    datasets["financial_summary"].to_csv(FINANCIAL_SUMMARY_OUTPUT, index=False)
    datasets["roi_scenarios"].to_csv(ROI_SCENARIOS_OUTPUT, index=False)
    datasets["risks"].to_csv(RISKS_OUTPUT, index=False)
    datasets["rgpd_summary"].to_csv(RGPD_OUTPUT, index=False)

    dashboard_data = build_dashboard_data(datasets)
    DASHBOARD_JSON_OUTPUT.write_text(
        json.dumps(dashboard_data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    return {
        "backlog": BACKLOG_OUTPUT,
        "financial_summary": FINANCIAL_SUMMARY_OUTPUT,
        "roi_scenarios": ROI_SCENARIOS_OUTPUT,
        "risks": RISKS_OUTPUT,
        "rgpd_summary": RGPD_OUTPUT,
        "dashboard_data": DASHBOARD_JSON_OUTPUT,
    }


def _records(dataframe: pd.DataFrame) -> list[dict[str, Any]]:
    return [
        {key: _json_value(value) for key, value in row.items()}
        for row in dataframe.to_dict(orient="records")
    ]


def _json_value(value: Any) -> Any:
    if pd.isna(value):
        return None
    if hasattr(value, "item"):
        return value.item()
    return value
