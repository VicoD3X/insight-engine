# Insight Engine — Fashion-Insta MVP Analytics

Insight Engine transforme les documents de cadrage du MVP Fashion-Insta en une base data exploitable.

Le projet part d'un livrable métier existant : une application mobile de recommandation d'articles de mode à partir d'une photo. Cette phase ne construit pas l'application mobile, ne crée pas de modèle IA et ne livre pas encore de dashboard. Elle structure les informations clés du cadrage produit pour préparer une analyse claire, testable et réutilisable.

## Contexte

Fashion-Insta est un MVP de parcours photo → recommandations → fiche produit. Les documents source décrivent le backlog, les hypothèses de budget, les scénarios ROI, les risques et les éléments RGPD.

Dans ce dépôt, ces fichiers Office ne sont pas de simples annexes : ils sont la source métier du projet.

## Objectif de la phase 1

Cette phase convertit les documents existants en datasets propres :

- extraction Python des informations clés ;
- génération de CSV et d'un JSON exploitable par un futur dashboard ;
- notebook analytique lisible ;
- synthèses Markdown pour comprendre le projet sans ouvrir Excel ou PowerPoint ;
- tests simples sur les calculs principaux.

## Sources métier

```text
docs/insight-engine-backlog.xlsx
docs/insight-engine-workbook.xlsx
docs/insight-engine-presentation.pptx
```

Les fichiers Office originaux sont conservés. Les données propres générées sont placées dans `data/processed/`.

## Structure du dépôt

```text
insight-engine/
|-- data/
|   |-- processed/
|   `-- README.md
|-- dashboard/
|   `-- application React locale
|-- docs/
|   |-- project-brief.md
|   |-- backlog-summary.md
|   |-- financial-assumptions.md
|   |-- risk-register.md
|   |-- rgpd-summary.md
|   `-- extraction-notes.md
|-- notebooks/
|   `-- 01_insight_engine_analysis.ipynb
|-- scripts/
|   `-- build_processed_data.py
|-- src/
|   `-- insight_engine/
|-- tests/
|-- requirements.txt
`-- requirements-dev.txt
```

## Installation

Créer un environnement Python puis installer les dépendances :

```bash
python -m venv .venv
pip install -r requirements.txt -r requirements-dev.txt
```

## Générer les données traitées

Depuis la racine du dépôt :

```bash
python scripts/build_processed_data.py
```

Cette commande génère :

- `data/processed/backlog.csv`
- `data/processed/financial_summary.csv`
- `data/processed/roi_scenarios.csv`
- `data/processed/risks.csv`
- `data/processed/rgpd_summary.csv`
- `data/processed/dashboard_data.json`

Le fichier `dashboard_data.json` servira de source au dashboard React local prévu en phase 2.

## Notebook analytique

Lancer JupyterLab :

```bash
jupyter lab
```

Puis ouvrir :

```text
notebooks/01_insight_engine_analysis.ipynb
```

Le notebook charge les documents source, affiche les feuilles Excel détectées, reconstruit les tables propres et exporte les fichiers traités.

## Tests

```bash
pytest
```

Les tests vérifient les calculs financiers, la criticité des risques, la structure du backlog et le schéma minimal du JSON dashboard.

## Dashboard local

Le dossier `dashboard/` contient une interface React locale alimentée par le fichier statique `data/processed/dashboard_data.json`.

Il n'y a pas de backend : le dashboard lit une copie synchronisée du JSON dans `dashboard/public/dashboard_data.json`.

Synchroniser les données depuis la racine du dépôt :

```bash
python scripts/sync_dashboard_data.py
```

Lancer l'interface :

```bash
cd dashboard
npm install
npm run dev
```

Le dashboard affiche les KPI MVP, le backlog, les scénarios ROI, les risques, la synthèse RGPD et la timeline des sprints.

La phase 3 n'est pas encore démarrée : les tests avancés et validations supplémentaires seront traités ensuite.

## Limites actuelles

Ce dépôt ne contient pas :

- d'API ou backend ;
- de modèle IA de recommandation ;
- de pipeline de production ;
- de données brutes utilisateur.

Le bon positionnement est celui d'un MVP analytique : transformer un cadrage produit en base data propre pour aider à décider, prioriser et préparer la phase dashboard.

## Prochaine phase

La phase suivante consistera à créer un dashboard React local alimenté uniquement par `data/processed/dashboard_data.json`.
