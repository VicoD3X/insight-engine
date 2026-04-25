# Données

Ce dossier contient les données dérivées utilisées par le projet Insight Engine.

## Données versionnées

Le dossier `data/processed/` contient les exports propres générés depuis les documents Office sources :

- `backlog.csv`
- `financial_summary.csv`
- `roi_scenarios.csv`
- `risks.csv`
- `rgpd_summary.csv`
- `dashboard_data.json`

Ces fichiers sont versionnés car ils alimentent le notebook, les tests et le dashboard React.

## Données non versionnées

Les données brutes ou temporaires ne sont pas ajoutées au dépôt afin de garder le projet léger et d'éviter de publier des fichiers sensibles ou volumineux.

## Génération

Depuis la racine du dépôt :

```bash
python scripts/build_processed_data.py
```

Pour générer les exports et synchroniser le dashboard en une seule commande :

```bash
python scripts/run_project_pipeline.py
```
