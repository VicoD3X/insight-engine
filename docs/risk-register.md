# Registre des risques

Les risques principaux viennent de la feuille `Risques` du classeur source. La criticité est calculée avec la formule :

```text
criticité = probabilité × impact
```

| Risque | Probabilité | Impact | Criticité | Mitigation | Responsable |
| --- | ---: | ---: | ---: | --- | --- |
| Retard sur le MVP | 2 | 3 | 6 | MoSCoW strict, lots petits, démo chaque sprint | PO/SM |
| Fuite de photos / données | 2 | 3 | 6 | Chiffrement, accès restreint, suppression rapide | Tech lead |
| Non-conformité RGPD | 2 | 3 | 6 | Consentement clair, suppression, preuve de consentement | PO + juridique |
| Adoption faible | 2 | 3 | 6 | Onboarding, guidance photo, suivi KPI, itérations UX | PO |

## Lecture

Les quatre risques ressortent avec une criticité identique. Le pilotage doit donc combiner suivi produit, sécurité et conformité dès le MVP.
