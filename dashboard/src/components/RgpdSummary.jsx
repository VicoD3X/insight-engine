import { EMPTY_DATA_MESSAGE } from "../data.js";

function RgpdSummary({ rgpd = [], onInspect }) {
  const summary = rgpd[0];

  if (!summary) {
    return (
      <section className="panel panel-rgpd">
        <h3>Synthèse RGPD</h3>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const items = [
    ["Finalité", summary.finality],
    ["Base légale", summary.legal_basis],
    ["Données", summary.processed_data],
    ["Conservation", summary.retention],
    ["Sécurité", summary.security_measures],
    ["Droits", summary.user_rights],
  ];

  return (
    <section className="panel panel-rgpd">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">RGPD</p>
          <h3>Cadre données</h3>
        </div>
        <button
          className="panel-action"
          type="button"
          onClick={() =>
            onInspect({
              eyebrow: "Conformité",
              title: "Synthèse RGPD",
              summary:
                "Le traitement porte sur la recommandation d'articles à partir d'une photo de tenue, avec consentement explicite.",
              items: items.map(([title, text]) => ({ title, text })),
            })
          }
        >
          Lire
        </button>
      </div>

      <div className="rgpd-chips">
        {items.slice(0, 4).map(([label, value]) => (
          <button
            key={label}
            type="button"
            onClick={() =>
              onInspect({
                eyebrow: "RGPD",
                title: label,
                summary: value || EMPTY_DATA_MESSAGE,
                metrics: [
                  ["Nature", "Cadrage"],
                  ["Source", "Feuille CNIL"],
                ],
                items: items
                  .filter(([itemLabel]) => itemLabel !== label)
                  .map(([title, text]) => ({ title, text })),
              })
            }
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default RgpdSummary;
