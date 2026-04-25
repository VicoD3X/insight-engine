# Données

Ce dossier est réservé aux données locales du projet.

Les données brutes, intermédiaires et générées ne sont pas versionnées afin de garder le dépôt léger et d'éviter de publier des fichiers sensibles ou volumineux.

Structure prévue :

```text
data/
|-- raw/
|-- interim/
|-- processed/
|-- external/
`-- README.md
```

Le dossier `processed/` contient les exports propres générés depuis les documents source. Ces fichiers sont versionnés car ils servent de base au notebook et au futur dashboard React local.
