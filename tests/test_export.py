import json

from insight_engine.config import DASHBOARD_JSON_OUTPUT
from insight_engine.export import build_dashboard_data, export_all


def test_dashboard_data_contains_expected_keys():
    dashboard_data = build_dashboard_data()

    assert {
        "kpis",
        "backlog",
        "roi_scenarios",
        "risks",
        "rgpd",
        "sprints",
    }.issubset(dashboard_data.keys())


def test_export_all_generates_dashboard_json(tmp_path):
    outputs = export_all()

    assert DASHBOARD_JSON_OUTPUT.exists()
    assert outputs["dashboard_data"] == DASHBOARD_JSON_OUTPUT

    data = json.loads(DASHBOARD_JSON_OUTPUT.read_text(encoding="utf-8"))
    assert len(data["backlog"]) == 17
    assert data["kpis"]["investment_initial"] == 70885.0
