# Dashboard local — Insight Engine

Ce dossier contient le dashboard React local du projet Insight Engine.

Il visualise les données structurées générées en phase 1 depuis les documents de cadrage Fashion-Insta. Le dashboard ne contient pas de backend : il lit uniquement le fichier statique `dashboard/public/dashboard_data.json`.

## Source de données

La source de vérité reste :

```text
data/processed/dashboard_data.json
```

Avant de lancer le dashboard, synchroniser le JSON depuis la racine du dépôt :

```bash
python scripts/sync_dashboard_data.py
```

## Installation

```bash
cd dashboard
npm install
```

## Lancement local

```bash
npm run dev
```

Le dashboard affiche les KPI MVP, le backlog, les scénarios ROI, les risques, la synthèse RGPD et la timeline des 4 sprints.

## Build de vérification

```bash
npm run build
```

## Limites

Le dashboard reflète uniquement les données présentes dans l'export actuel. Si une donnée manque, l'interface affiche un état vide propre au lieu d'inventer une valeur.
