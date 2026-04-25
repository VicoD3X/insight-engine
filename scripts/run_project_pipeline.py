from pathlib import Path
import shutil
import sys


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"
sys.path.insert(0, str(SRC_DIR))

from insight_engine.config import DASHBOARD_JSON_OUTPUT  # noqa: E402
from insight_engine.export import export_all  # noqa: E402
from insight_engine.validation import (  # noqa: E402
    validate_dashboard_json,
    validate_processed_exports,
)


DASHBOARD_PUBLIC_DIR = PROJECT_ROOT / "dashboard" / "public"
DASHBOARD_PUBLIC_JSON = DASHBOARD_PUBLIC_DIR / "dashboard_data.json"


def main() -> None:
    print("Extraction des données traitées...")
    outputs = export_all()

    print("Vérification des exports essentiels...")
    validate_processed_exports(outputs)

    print("Vérification du dashboard_data.json...")
    validate_dashboard_json(DASHBOARD_JSON_OUTPUT)

    print("Synchronisation du dashboard...")
    DASHBOARD_PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(DASHBOARD_JSON_OUTPUT, DASHBOARD_PUBLIC_JSON)

    print("Synchronisation dashboard terminée.")
    print(f"- source : {DASHBOARD_JSON_OUTPUT.relative_to(PROJECT_ROOT)}")
    print(f"- cible  : {DASHBOARD_PUBLIC_JSON.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
