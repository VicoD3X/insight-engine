from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]

DOCS_DIR = PROJECT_ROOT / "docs"
DATA_DIR = PROJECT_ROOT / "data"
PROCESSED_DATA_DIR = DATA_DIR / "processed"

BACKLOG_SOURCE = DOCS_DIR / "insight-engine-backlog.xlsx"
WORKBOOK_SOURCE = DOCS_DIR / "insight-engine-workbook.xlsx"
PRESENTATION_SOURCE = DOCS_DIR / "insight-engine-presentation.pptx"

BACKLOG_OUTPUT = PROCESSED_DATA_DIR / "backlog.csv"
FINANCIAL_SUMMARY_OUTPUT = PROCESSED_DATA_DIR / "financial_summary.csv"
ROI_SCENARIOS_OUTPUT = PROCESSED_DATA_DIR / "roi_scenarios.csv"
RISKS_OUTPUT = PROCESSED_DATA_DIR / "risks.csv"
RGPD_OUTPUT = PROCESSED_DATA_DIR / "rgpd_summary.csv"
DASHBOARD_JSON_OUTPUT = PROCESSED_DATA_DIR / "dashboard_data.json"

BACKLOG_SHEET = "Backlog simple"
WORKBOOK_BUDGET_SHEET = "Budget & ROI"
WORKBOOK_RGPD_SHEET = "CNIL"
WORKBOOK_RISKS_SHEET = "Risques"

SPRINTS = [
    {
        "sprint": 1,
        "title": "Photo + qualité + consentement",
        "duration_weeks": 2,
        "summary": "Prise/import, contrôle flou/lumière, option floutage visage et base technique.",
    },
    {
        "sprint": 2,
        "title": "Analyse + signature",
        "duration_weeks": 2,
        "summary": "Catégorie, couleurs dominantes, génération et stockage des signatures produits.",
    },
    {
        "sprint": 3,
        "title": "Recommandation + affichage",
        "duration_weeks": 2,
        "summary": "Top-N résultats, filtres, fiche produit et fallback si l'IA est indisponible.",
    },
    {
        "sprint": 4,
        "title": "Finalisation MVP + pilotage",
        "duration_weeks": 2,
        "summary": "Feedback, préférences, modération, KPI, logs, tests finaux et préparation lancement.",
    },
]
