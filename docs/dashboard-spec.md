# Spécification du dashboard

## Rôle

Le dashboard Insight Engine est une interface React locale qui visualise les données structurées générées depuis les documents de cadrage Fashion-Insta.

Il sert à rendre le cadrage MVP lisible rapidement : budget, effort, backlog, ROI, risques, RGPD et planning.

## Source de données

La source principale est :

```text
data/processed/dashboard_data.json
```

Pour l'interface React, ce fichier est synchronisé vers :

```text
dashboard/public/dashboard_data.json
```

Le dashboard ne lit pas les fichiers Excel ou PowerPoint directement. Il consomme uniquement l'export JSON produit par le pipeline Python.

## Blocs affichés

- KPI principaux : investissement initial, coût mensuel, effort MVP, effort avec marge, point mort et bénéfices nets mensuels.
- Backlog : volume de user stories, répartition MoSCoW et effort associé.
- ROI : comparaison des scénarios optimiste et pessimiste.
- Risques : criticité calculée par probabilité × impact, mitigation et suivi.
- RGPD : finalité, base légale, données traitées, conservation, sécurité et droits utilisateurs.
- Timeline : trajectoire MVP en 4 sprints.

## Comportement attendu

- Le dashboard doit rester lisible sur desktop et responsive sur écrans plus petits.
- Une donnée manquante doit produire un état vide propre, pas une valeur inventée.
- Les interactions locales peuvent ouvrir des détails dans le panneau latéral.
- Aucun appel backend n'est nécessaire.

## Limites

- Le dashboard n'est pas une application métier complète.
- Il ne contient pas de modèle IA de recommandation.
- Les valeurs affichées reflètent les documents de cadrage et les exports phase data.
- Les scénarios ROI doivent être interprétés comme des hypothèses de décision, pas comme une prévision financière garantie.
