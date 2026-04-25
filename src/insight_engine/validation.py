from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .config import (
    BACKLOG_OUTPUT,
    DASHBOARD_JSON_OUTPUT,
    FINANCIAL_SUMMARY_OUTPUT,
    RGPD_OUTPUT,
    RISKS_OUTPUT,
    ROI_SCENARIOS_OUTPUT,
)


REQUIRED_DASHBOARD_KEYS = {
    "kpis",
    "backlog",
    "roi_scenarios",
    "risks",
    "rgpd",
    "sprints",
}

ESSENTIAL_EXPORTS = {
    "backlog": BACKLOG_OUTPUT,
    "financial_summary": FINANCIAL_SUMMARY_OUTPUT,
    "roi_scenarios": ROI_SCENARIOS_OUTPUT,
    "risks": RISKS_OUTPUT,
    "rgpd_summary": RGPD_OUTPUT,
    "dashboard_data": DASHBOARD_JSON_OUTPUT,
}


def validate_dashboard_data(data: dict[str, Any]) -> dict[str, Any]:
    """Valide la structure minimale attendue par le dashboard React."""
    missing_keys = sorted(REQUIRED_DASHBOARD_KEYS.difference(data.keys()))
    if missing_keys:
        raise ValueError(
            "dashboard_data.json est incomplet. Clés manquantes : "
            + ", ".join(missing_keys)
        )

    return {
        "valid": True,
        "keys": sorted(REQUIRED_DASHBOARD_KEYS),
    }


def validate_dashboard_json(path: Path = DASHBOARD_JSON_OUTPUT) -> dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"Fichier introuvable : {path}")

    data = json.loads(path.read_text(encoding="utf-8"))
    return validate_dashboard_data(data)


def validate_processed_exports(
    exports: dict[str, Path] | None = None,
) -> dict[str, Any]:
    expected_exports = exports or ESSENTIAL_EXPORTS
    missing_files = [
        name for name, path in expected_exports.items() if not Path(path).exists()
    ]

    if missing_files:
        raise FileNotFoundError(
            "Exports traités manquants : " + ", ".join(sorted(missing_files))
        )

    return {
        "valid": True,
        "files": sorted(expected_exports.keys()),
    }
