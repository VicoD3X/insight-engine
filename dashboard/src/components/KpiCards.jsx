import {
  EMPTY_DATA_MESSAGE,
  findScenario,
  formatCurrency,
  formatMonths,
  formatNumber,
} from "../data.js";

function KpiCards({ data, onInspect }) {
  const kpis = data?.kpis || {};
  const optimistic = findScenario(data?.roiScenarios || [], "optimiste");
  const pessimistic = findScenario(data?.roiScenarios || [], "pessimiste");

  const cards = [
    {
      label: "Investissement",
      value: formatCurrency(kpis.investment_initial),
      hint: "Budget initial",
      detail: "Investissement initial du MVP, issu du cadrage financier phase 1.",
    },
    {
      label: "Coût mensuel",
      value: formatCurrency(kpis.recurring_monthly_cost),
      hint: "Run cloud + maintenance",
      detail: "Coût récurrent mensuel consolidé : cloud, maintenance et exploitation.",
    },
    {
      label: "Effort total",
      value: formatNumber(kpis.effort_with_buffer_days, " JH"),
      hint: `${formatNumber(kpis.mvp_effort_days, " JH")} avant marge`,
      detail: "Effort MVP avec buffer de cadrage, sans refonte produit ni industrialisation lourde.",
    },
    {
      label: "Point mort",
      value: formatMonths(kpis.break_even_optimistic_months),
      hint: "Scénario optimiste",
      detail: "Délai théorique de retour sur investissement dans le scénario optimiste.",
      tone: "focus",
    },
    {
      label: "Net optimiste",
      value: formatCurrency(optimistic?.monthly_net_benefit),
      hint: "Bénéfice mensuel",
      detail: "Bénéfice net mensuel lu depuis le scénario ROI optimiste.",
      tone: "positive",
    },
    {
      label: "Net pessimiste",
      value: formatCurrency(pessimistic?.monthly_net_benefit),
      hint: "Bénéfice mensuel",
      detail: "Bénéfice net mensuel lu depuis le scénario ROI pessimiste.",
      tone: "negative",
    },
  ];

  if (!cards.length) {
    return <section className="empty-state">{EMPTY_DATA_MESSAGE}</section>;
  }

  return (
    <section className="kpi-grid" aria-label="KPI principaux">
      {cards.map((card) => (
        <button
          className={`kpi-card ${card.tone || ""}`}
          key={card.label}
          type="button"
          onClick={() =>
            onInspect({
              eyebrow: "KPI",
              title: card.label,
              summary: card.detail,
              metrics: [
                ["Valeur", card.value],
                ["Lecture", card.hint],
              ],
            })
          }
        >
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.hint}</small>
        </button>
      ))}
    </section>
  );
}

export default KpiCards;
