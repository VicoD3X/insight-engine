from insight_engine.backlog import BACKLOG_COLUMNS, build_backlog


def test_backlog_has_expected_columns_and_story_count():
    backlog = build_backlog()

    assert list(backlog.columns) == BACKLOG_COLUMNS
    assert len(backlog) == 17


def test_backlog_effort_and_priorities_are_extracted():
    backlog = build_backlog()

    assert backlog["effort_days"].sum() == 115
    assert set(backlog["moscow"]) == {"MUST", "SHOULD"}
    assert backlog["id"].iloc[0] == "US-01"
