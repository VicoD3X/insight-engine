from insight_engine.risks import build_risks, calculate_criticality


def test_calculate_criticality():
    assert calculate_criticality(2, 3) == 6


def test_risks_have_expected_criticality():
    risks = build_risks()

    assert len(risks) == 4
    assert (risks["criticality"] == risks["probability"] * risks["impact"]).all()
    assert set(risks["criticality"]) == {6}
