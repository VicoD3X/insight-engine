import json

import pytest

from insight_engine.config import DASHBOARD_JSON_OUTPUT
from insight_engine.export import export_all
from insight_engine.validation import (
    REQUIRED_DASHBOARD_KEYS,
    validate_dashboard_data,
    validate_dashboard_json,
    validate_processed_exports,
)


def test_validate_dashboard_data_accepts_expected_schema():
    data = {key: [] for key in REQUIRED_DASHBOARD_KEYS}
    data["kpis"] = {}

    report = validate_dashboard_data(data)

    assert report["valid"] is True
    assert set(report["keys"]) == REQUIRED_DASHBOARD_KEYS


def test_validate_dashboard_data_rejects_missing_key():
    data = {key: [] for key in REQUIRED_DASHBOARD_KEYS if key != "risks"}

    with pytest.raises(ValueError, match="risks"):
        validate_dashboard_data(data)


def test_validate_dashboard_json_after_export():
    export_all()

    report = validate_dashboard_json(DASHBOARD_JSON_OUTPUT)
    data = json.loads(DASHBOARD_JSON_OUTPUT.read_text(encoding="utf-8"))

    assert report["valid"] is True
    assert set(REQUIRED_DASHBOARD_KEYS).issubset(data.keys())


def test_validate_processed_exports_after_generation():
    outputs = export_all()

    report = validate_processed_exports(outputs)

    assert report["valid"] is True
    assert "dashboard_data" in report["files"]
