import { EMPTY_DATA_MESSAGE, formatNumber } from "../data.js";

function RiskMatrix({ risks = [] }) {
  if (!risks.length) {
    return (
      <section className="panel">
        <h2>Risques</h2>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const maxCriticality = Math.max(...risks.map((risk) => risk.criticality || 0), 1);

  return (
    <section className="panel full-width">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Risques</p>
          <h2>Matrice de criticité MVP</h2>
        </div>
        <span className="metric-chip">Impact × probabilité</span>
      </div>

      <div className="risk-grid">
        {risks.map((risk) => (
          <article className="risk-card" key={risk.risk}>
            <div className="risk-header">
              <strong>{risk.risk}</strong>
              <span>{formatNumber(risk.criticality)}</span>
            </div>
            <div className="bar-track risk-track" aria-hidden="true">
              <span style={{ width: `${((risk.criticality || 0) / maxCriticality) * 100}%` }} />
            </div>
            <dl>
              <div>
                <dt>Impact</dt>
                <dd>{formatNumber(risk.impact)}</dd>
              </div>
              <div>
                <dt>Probabilité</dt>
                <dd>{formatNumber(risk.probability)}</dd>
              </div>
              <div>
                <dt>Responsable</dt>
                <dd>{risk.owner || EMPTY_DATA_MESSAGE}</dd>
              </div>
            </dl>
            <p>{risk.mitigation || EMPTY_DATA_MESSAGE}</p>
            <small>Suivi : {risk.follow_up || EMPTY_DATA_MESSAGE}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RiskMatrix;
