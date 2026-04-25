import pytest

from insight_engine.finance import (
    break_even_months,
    build_financial_summary,
    build_roi_scenarios,
    effort_with_buffer,
    monthly_net_benefit,
)


def test_effort_with_buffer():
    assert effort_with_buffer(115, 0.15) == pytest.approx(132.25)


def test_monthly_net_benefit():
    net = monthly_net_benefit(
        monthly_active_users=50_000,
        orders_per_user=0.12,
        uplift=0.10,
        average_order_value=70,
        gross_margin=0.45,
        monthly_cost=5_210,
    )
    assert net == pytest.approx(13_690)


def test_break_even_months():
    assert break_even_months(70_885, 13_690) == pytest.approx(5.1778670562)
    assert break_even_months(70_885, -4_634) == "n/a"


def test_financial_sources_extract_expected_kpis():
    summary = build_financial_summary().set_index("metric")
    scenarios = build_roi_scenarios().set_index("scenario")

    assert summary.loc["investment_initial", "value"] == pytest.approx(70_885)
    assert summary.loc["recurring_monthly_cost", "value"] == pytest.approx(5_210)
    assert scenarios.loc["optimiste", "monthly_net_benefit"] == pytest.approx(13_690)
    assert scenarios.loc["pessimiste", "monthly_net_benefit"] == pytest.approx(-4_634)
