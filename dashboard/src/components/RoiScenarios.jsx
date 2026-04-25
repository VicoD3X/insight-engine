import { EMPTY_DATA_MESSAGE, formatCurrency, formatMonths, formatPercent } from "../data.js";

function RoiScenarios({ scenarios = [] }) {
  if (!scenarios.length) {
    return (
      <section className="panel">
        <h2>Scénarios ROI</h2>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const maxAbsNet = Math.max(
    ...scenarios.map((scenario) => Math.abs(scenario.monthly_net_benefit || 0)),
    1,
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ROI</p>
          <h2>Optimiste vs pessimiste</h2>
        </div>
      </div>

      <div className="scenario-list">
        {scenarios.map((scenario) => {
          const net = scenario.monthly_net_benefit;
          const width = `${(Math.abs(net || 0) / maxAbsNet) * 100}%`;
          const isPositive = net >= 0;

          return (
            <article className="scenario-card" key={scenario.scenario}>
              <div className="scenario-topline">
                <strong>{scenario.scenario}</strong>
                <span className={isPositive ? "signal-positive" : "signal-negative"}>
                  {formatCurrency(net)}
                </span>
              </div>

              <div className="roi-axis" aria-hidden="true">
                <span
                  className={isPositive ? "roi-positive" : "roi-negative"}
                  style={{ width }}
                />
              </div>

              <dl className="scenario-details">
                <div>
                  <dt>Point mort</dt>
                  <dd>{formatMonths(scenario.break_even_months)}</dd>
                </div>
                <div>
                  <dt>MAU</dt>
                  <dd>{Number(scenario.monthly_active_users || 0).toLocaleString("fr-FR")}</dd>
                </div>
                <div>
                  <dt>Uplift</dt>
                  <dd>{formatPercent(scenario.uplift)}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RoiScenarios;
