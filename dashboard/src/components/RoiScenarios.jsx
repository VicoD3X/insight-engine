import { EMPTY_DATA_MESSAGE, formatCurrency, formatMonths, formatPercent } from "../data.js";

function RoiScenarios({ scenarios = [], onInspect }) {
  if (!scenarios.length) {
    return (
      <section className="panel panel-roi">
        <h3>Scénarios ROI</h3>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const maxAbsNet = Math.max(
    ...scenarios.map((scenario) => Math.abs(scenario.monthly_net_benefit || 0)),
    1,
  );

  return (
    <section className="panel panel-roi">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">ROI</p>
          <h3>Scénarios</h3>
        </div>
        <button
          className="panel-action"
          type="button"
          onClick={() =>
            onInspect({
              eyebrow: "ROI",
              title: "Optimiste vs pessimiste",
              summary:
                "Comparaison directe des hypothèses ROI disponibles dans l'export phase 1, sans extrapolation.",
              items: scenarios.map((scenario) => ({
                title: scenario.scenario,
                value: formatCurrency(scenario.monthly_net_benefit),
                text: `Point mort : ${formatMonths(
                  scenario.break_even_months,
                )} · Uplift : ${formatPercent(scenario.uplift)}`,
              })),
            })
          }
        >
          Détails
        </button>
      </div>

      <div className="scenario-list">
        {scenarios.map((scenario) => {
          const net = scenario.monthly_net_benefit;
          const width = `${(Math.abs(net || 0) / maxAbsNet) * 100}%`;
          const isPositive = net >= 0;

          return (
            <button
              className={`scenario-card ${isPositive ? "positive" : "negative"}`}
              key={scenario.scenario}
              type="button"
              onClick={() =>
                onInspect({
                  eyebrow: "Scénario ROI",
                  title: scenario.scenario,
                  summary: `Bénéfice net mensuel : ${formatCurrency(net)}.`,
                  metrics: [
                    ["Point mort", formatMonths(scenario.break_even_months)],
                    ["MAU", Number(scenario.monthly_active_users || 0).toLocaleString("fr-FR")],
                    ["Uplift", formatPercent(scenario.uplift)],
                  ],
                })
              }
            >
              <div className="scenario-topline">
                <strong>{scenario.scenario}</strong>
                <span>{formatCurrency(net)}</span>
              </div>
              <div className="roi-axis" aria-hidden="true">
                <span style={{ width }} />
              </div>
              <small>Point mort · {formatMonths(scenario.break_even_months)}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default RoiScenarios;
