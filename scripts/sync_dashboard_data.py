from pathlib import Path
import shutil


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_JSON = PROJECT_ROOT / "data" / "processed" / "dashboard_data.json"
DASHBOARD_PUBLIC_DIR = PROJECT_ROOT / "dashboard" / "public"
TARGET_JSON = DASHBOARD_PUBLIC_DIR / "dashboard_data.json"


def main() -> None:
    if not SOURCE_JSON.exists():
        raise FileNotFoundError(
            "Export introuvable. Lancez d'abord : python scripts/build_processed_data.py"
        )

    DASHBOARD_PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SOURCE_JSON, TARGET_JSON)

    print("Données synchronisées :")
    print(f"- source : {SOURCE_JSON.relative_to(PROJECT_ROOT)}")
    print(f"- cible  : {TARGET_JSON.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
