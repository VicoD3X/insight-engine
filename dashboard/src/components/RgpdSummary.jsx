import { EMPTY_DATA_MESSAGE } from "../data.js";

function RgpdSummary({ rgpd = [] }) {
  const summary = rgpd[0];

  if (!summary) {
    return (
      <section className="panel">
        <h2>Synthèse RGPD</h2>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const items = [
    ["Finalité", summary.finality],
    ["Base légale", summary.legal_basis],
    ["Données traitées", summary.processed_data],
    ["Conservation", summary.retention],
    ["Sécurité", summary.security_measures],
    ["Droits utilisateurs", summary.user_rights],
  ];

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Conformité</p>
          <h2>Synthèse RGPD</h2>
        </div>
      </div>

      <div className="rgpd-list">
        {items.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <p>{value || EMPTY_DATA_MESSAGE}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RgpdSummary;
