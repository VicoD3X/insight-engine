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

## Déploiement GitHub Pages

Le dashboard est prévu pour être publié sur GitHub Pages à l'adresse :

```text
https://vicod3x.github.io/insight-engine/
```

Le workflow GitHub Actions situé dans `.github/workflows/deploy-dashboard.yml` installe les dépendances, exécute `npm run build`, puis déploie `dashboard/dist`.

La configuration `vite.config.js` utilise `/` en développement local et `/insight-engine/` au moment du build afin que les assets soient correctement chargés sur GitHub Pages.

## Limites

Le dashboard reflète uniquement les données présentes dans l'export actuel. Si une donnée manque, l'interface affiche un état vide propre au lieu d'inventer une valeur.
