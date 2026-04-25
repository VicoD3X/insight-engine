# Insight Engine — Fashion-Insta MVP Analytics

Insight Engine transforme un cadrage produit IA en base analytique exploitable : données structurées, indicateurs de pilotage, synthèses décisionnelles et dashboard React local.

Le projet part du concept Fashion-Insta, une application mobile de recommandation d'articles de mode à partir d'une photo. Le dépôt ne livre pas l'application mobile finale et ne prétend pas embarquer une IA de recommandation en production. Il se concentre sur l'analyse, le pilotage MVP, le ROI, les risques et le RGPD.

## Présentation du projet

Les documents Office présents dans `docs/` sont la source métier du projet. Le pipeline Python extrait et structure les informations clés, puis génère des fichiers propres dans `data/processed/`.

Ces fichiers alimentent ensuite un notebook analytique et un dashboard React sans backend.

## Objectif métier

L'objectif est de rendre un cadrage MVP compréhensible et actionnable :

- prioriser le backlog avec une lecture MoSCoW ;
- consolider les hypothèses budget et ROI ;
- suivre les risques principaux ;
- résumer les éléments RGPD ;
- visualiser une trajectoire MVP en 4 sprints.

## Sources du projet

```text
docs/insight-engine-backlog.xlsx
docs/insight-engine-workbook.xlsx
docs/insight-engine-presentation.pptx
```

Les fichiers Office originaux sont conservés. Les exports dérivés sont versionnés car ils servent de base au dashboard et aux tests.

## Architecture du dépôt

```text
insight-engine/
|-- data/
|   |-- processed/
|   `-- README.md
|-- dashboard/
|   |-- public/dashboard_data.json
|   `-- src/
|-- docs/
|   |-- project-brief.md
|   |-- backlog-summary.md
|   |-- financial-assumptions.md
|   |-- risk-register.md
|   |-- rgpd-summary.md
|   |-- dashboard-spec.md
|   `-- extraction-notes.md
|-- notebooks/
|   `-- 01_insight_engine_analysis.ipynb
|-- scripts/
|   |-- build_processed_data.py
|   |-- run_project_pipeline.py
|   `-- sync_dashboard_data.py
|-- src/
|   `-- insight_engine/
|-- tests/
|-- requirements.txt
`-- requirements-dev.txt
```

## Pipeline analytique Python

Le package `src/insight_engine/` contient les modules d'extraction, structuration, calcul, export et validation :

- `backlog.py` : user stories, priorités MoSCoW et effort ;
- `finance.py` : budget, ROI, point mort et bénéfice net mensuel ;
- `risks.py` : registre des risques et criticité ;
- `rgpd.py` : synthèse CNIL/RGPD ;
- `export.py` : génération CSV et JSON ;
- `validation.py` : contrôle minimal du JSON dashboard et des exports.

## Notebook analytique

Le notebook `notebooks/01_insight_engine_analysis.ipynb` présente le contexte, charge les sources Office, affiche les tables propres et synthétise les KPI, le backlog, le ROI, les risques et le RGPD.

## Dashboard React local

Le dossier `dashboard/` contient une interface React + Vite alimentée par `dashboard/public/dashboard_data.json`.

Le dashboard affiche :

- les KPI principaux ;
- le backlog MVP ;
- les scénarios ROI ;
- la matrice de risques ;
- la synthèse RGPD ;
- la timeline des 4 sprints.

Il ne contient pas de backend : toutes les données viennent du JSON généré par le pipeline Python.

Démo publique GitHub Pages :

```text
https://vicod3x.github.io/insight-engine/
```

## Données générées

```text
data/processed/backlog.csv
data/processed/financial_summary.csv
data/processed/roi_scenarios.csv
data/processed/risks.csv
data/processed/rgpd_summary.csv
data/processed/dashboard_data.json
```

## Installation

```bash
python -m venv .venv
pip install -r requirements.txt -r requirements-dev.txt
```

## Commandes principales

Générer les données traitées :

```bash
python scripts/build_processed_data.py
```

Lancer l'orchestration complète du pipeline local :

```bash
python scripts/run_project_pipeline.py
```

Synchroniser les données du dashboard :

```bash
python scripts/sync_dashboard_data.py
```

Lancer le notebook :

```bash
jupyter lab
```

Lancer les tests Python :

```bash
pytest
```

Lancer le dashboard :

```bash
cd dashboard
npm install
npm run dev
```

## Tests

Les tests vérifient les calculs principaux, la structure du backlog, la criticité des risques, la génération des exports, la présence des fichiers essentiels et la validité minimale de `dashboard_data.json`.

## Limites actuelles

- Le projet ne contient pas de vraie IA de recommandation en production.
- Le dashboard est une interface statique locale, sans backend.
- Les données viennent des documents de cadrage, pas d'un système métier connecté.
- Les scénarios ROI sont des hypothèses de pilotage, pas des prévisions garanties.
- Le dépôt reste volontairement au niveau MVP analytique portfolio.

## Améliorations possibles

- Ajouter un schéma JSON plus strict pour le dashboard.
- Ajouter des graphiques interactifs si les données s'enrichissent.
- Brancher un export PDF ou HTML des synthèses.
- Ajouter une comparaison de scénarios plus détaillée.
- Enrichir le notebook avec des visualisations complémentaires.

## Contexte du projet

Ce projet a été initialement développé dans le cadre d'un parcours professionnalisant en Data Science, puis restructuré pour servir de dépôt portfolio.

Il montre la capacité à transformer un cadrage produit IA en pipeline analytique, indicateurs de pilotage, synthèses de décision et dashboard local.
