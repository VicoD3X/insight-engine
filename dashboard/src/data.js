export const EMPTY_DATA_MESSAGE = "Donnée non disponible dans l’export actuel.";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1,
});

export async function loadDashboardData() {
  const response = await fetch(`${import.meta.env.BASE_URL}dashboard_data.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(EMPTY_DATA_MESSAGE);
  }

  const data = await response.json();
  return normalizeDashboardData(data);
}

export function normalizeDashboardData(data = {}) {
  return {
    kpis: data.kpis && typeof data.kpis === "object" ? data.kpis : {},
    backlog: ensureArray(data.backlog),
    backlogSummary: ensureArray(data.backlog_summary),
    roiScenarios: ensureArray(data.roi_scenarios),
    risks: ensureArray(data.risks),
    rgpd: ensureArray(data.rgpd),
    sprints: ensureArray(data.sprints),
  };
}

export function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

export function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

export function isNumeric(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function formatCurrency(value) {
  if (!isNumeric(value)) return EMPTY_DATA_MESSAGE;
  return currencyFormatter.format(value);
}

export function formatNumber(value, suffix = "") {
  if (!isNumeric(value)) return EMPTY_DATA_MESSAGE;
  return `${numberFormatter.format(value)}${suffix}`;
}

export function formatMonths(value) {
  if (value === "n/a") return "n/a";
  if (!isNumeric(value)) return EMPTY_DATA_MESSAGE;
  return `${numberFormatter.format(value)} mois`;
}

export function formatPercent(value) {
  if (!isNumeric(value)) return EMPTY_DATA_MESSAGE;
  return percentFormatter.format(value);
}

export function findScenario(scenarios, keyword) {
  return scenarios.find((scenario) =>
    String(scenario.scenario || "").toLowerCase().includes(keyword),
  );
}
