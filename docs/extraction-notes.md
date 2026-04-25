# Notes d'extraction

Ce fichier documente les choix réalisés pendant la transformation des documents Office en données structurées.

## Sources lues

- `docs/insight-engine-backlog.xlsx`
  - feuille `Backlog simple`
  - feuille `Glossaire`
- `docs/insight-engine-workbook.xlsx`
  - feuille `Budget & ROI`
  - feuille `CNIL`
  - feuille `Risques`
- `docs/insight-engine-presentation.pptx`
  - 26 slides extraites comme contexte projet

## Backlog

Les colonnes `id`, `description`, `business_value`, `moscow`, `effort_days`, `data_used` et `acceptance_criteria` viennent directement de la feuille `Backlog simple`.

Les colonnes `theme` et `sprint` sont reconstruites à partir des intitulés de user stories et de la slide de planning des 4 sprints. Cette reconstruction est volontairement simple et destinée au dashboard MVP.

## Finance

Les KPI financiers proviennent de la feuille `Budget & ROI`.

Les cellules de synthèse Excel contiennent des formules, mais le classeur stocke les valeurs calculées. Les exports utilisent ces valeurs :

- investissement initial : 70 885 €
- effort avant marge : 115 JH
- effort avec buffer : 132.25 JH
- coût mensuel : 5 210 €
- bénéfice net optimiste : 13 690 €/mois
- bénéfice net pessimiste : -4 634 €/mois
- point mort optimiste : environ 5.18 mois

## Risques

Les risques, probabilités, impacts, actions et suivis viennent de la feuille `Risques`.

Les responsables sont reconstruits depuis la slide `Plan d'action : mitigation des risques (top 4)`.

## RGPD

La finalité, la base légale, la conservation, les droits, les mesures de sécurité et les données traitées viennent de la feuille `CNIL`.

Le sous-traitant `Microsoft Azure` vient de la présentation, qui détaille l'architecture cible du MVP.

## Incertitudes

Aucune valeur chiffrée critique n'a été inventée. Les champs reconstruits concernent uniquement la mise en forme analytique : thèmes backlog, sprints et responsables risques.
