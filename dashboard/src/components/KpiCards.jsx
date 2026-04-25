import {
  EMPTY_DATA_MESSAGE,
  findScenario,
  formatCurrency,
  formatMonths,
  formatNumber,
} from "../data.js";

function KpiCards({ data }) {
  const kpis = data?.kpis || {};
  const optimistic = findScenario(data?.roiScenarios || [], "optimiste");
  const pessimistic = findScenario(data?.roiScenarios || [], "pessimiste");

  const cards = [
    {
      label: "Investissement initial",
      value: formatCurrency(kpis.investment_initial),
      hint: "Budget one-shot MVP",
    },
    {
      label: "Coût mensuel",
      value: formatCurrency(kpis.recurring_monthly_cost),
      hint: "Cloud + maintenance",
    },
    {
      label: "Effort MVP",
      value: formatNumber(kpis.mvp_effort_days, " JH"),
      hint: "Avant marge",
    },
    {
      label: "Effort avec marge",
      value: formatNumber(kpis.effort_with_buffer_days, " JH"),
      hint: "Buffer inclus",
    },
    {
      label: "Point mort optimiste",
      value: formatMonths(kpis.break_even_optimistic_months),
      hint: "Si adoption + uplift au rendez-vous",
    },
    {
      label: "Net mensuel optimiste",
      value: formatCurrency(optimistic?.monthly_net_benefit),
      hint: "Après coûts récurrents",
      tone: "positive",
    },
    {
      label: "Net mensuel pessimiste",
      value: formatCurrency(pessimistic?.monthly_net_benefit),
      hint: "Après coûts récurrents",
      tone: "negative",
    },
  ];

  if (!cards.length) {
    return <section className="empty-state">{EMPTY_DATA_MESSAGE}</section>;
  }

  return (
    <section className="kpi-grid" aria-label="KPI principaux">
      {cards.map((card) => (
        <article className={`kpi-card ${card.tone || ""}`} key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.hint}</small>
        </article>
      ))}
    </section>
  );
}

export default KpiCards;
