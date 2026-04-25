# Synthèse RGPD

Le projet décrit un traitement principal : recommander des articles similaires à partir d'une photo de tenue.

## Données traitées

- Photo de tenue, pouvant contenir un visage.
- Identifiant utilisateur.
- Date et heure.
- Feedback utile / pas utile.
- Signature de style ou embedding.

## Règles de conformité

| Élément | Synthèse |
| --- | --- |
| Finalité | Recommander des articles similaires à partir d'une photo. |
| Base légale | Consentement explicite avant analyse. |
| Sous-traitant | Microsoft Azure pour l'hébergement et les traitements techniques. |
| Conservation | Photo originale supprimée rapidement, signature 12 mois, logs 3 mois. |
| Sécurité | Chiffrement, contrôle d'accès, journalisation, séparation test / prod. |
| Droits utilisateurs | Accès, retrait du consentement, suppression des photos et données associées. |

## Point de vigilance

Le MVP ne doit pas utiliser la photo pour identifier une personne. Le traitement vise uniquement la similarité de style entre images.
