import { EMPTY_DATA_MESSAGE, formatNumber } from "../data.js";

function RiskMatrix({ risks = [], onInspect }) {
  if (!risks.length) {
    return (
      <section className="panel panel-risks">
        <h3>Risques</h3>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const maxCriticality = Math.max(...risks.map((risk) => risk.criticality || 0), 1);

  return (
    <section className="panel panel-risks">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Risques</p>
          <h3>Criticité</h3>
        </div>
        <button
          className="panel-action"
          type="button"
          onClick={() =>
            onInspect({
              eyebrow: "Risques",
              title: "Registre des risques MVP",
              summary:
                "La criticité est calculée par probabilité × impact. Les risques restent volontairement au niveau cadrage MVP.",
              items: risks.map((risk) => ({
                title: risk.risk,
                value: formatNumber(risk.criticality),
                text: `${risk.mitigation} Suivi : ${risk.follow_up}`,
              })),
            })
          }
        >
          Registre
        </button>
      </div>

      <div className="risk-orbit" aria-label="Matrice de risque compacte">
        {risks.map((risk, index) => (
          <button
            className="risk-node"
            key={risk.risk}
            style={{
              "--score": (risk.criticality || 0) / maxCriticality,
              "--delay": `${index * 65}ms`,
            }}
            type="button"
            onClick={() =>
              onInspect({
                eyebrow: "Risque",
                title: risk.risk,
                summary: risk.mitigation || EMPTY_DATA_MESSAGE,
                metrics: [
                  ["Impact", formatNumber(risk.impact)],
                  ["Probabilité", formatNumber(risk.probability)],
                  ["Criticité", formatNumber(risk.criticality)],
                  ["Responsable", risk.owner || "n/a"],
                ],
                items: [
                  {
                    title: "Suivi",
                    text: risk.follow_up || EMPTY_DATA_MESSAGE,
                  },
                ],
              })
            }
          >
            <span>{formatNumber(risk.criticality)}</span>
            <strong>{risk.risk}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

export default RiskMatrix;
