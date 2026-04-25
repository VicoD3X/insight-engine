from pathlib import Path
import sys


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"
sys.path.insert(0, str(SRC_DIR))

from insight_engine.export import export_all  # noqa: E402


def main() -> None:
    outputs = export_all()
    print("Fichiers générés :")
    for name, path in outputs.items():
        print(f"- {name}: {path.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
