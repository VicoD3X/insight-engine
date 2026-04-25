import { EMPTY_DATA_MESSAGE, formatNumber } from "../data.js";

function BacklogOverview({ backlog = [], summary = [], onInspect }) {
  if (!backlog.length) {
    return (
      <section className="panel panel-backlog">
        <h3>Backlog MVP</h3>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const totalEffort = backlog.reduce((sum, item) => sum + (item.effort_days || 0), 0);
  const rows = summary.length ? summary : buildSummary(backlog);
  const maxEffort = Math.max(...rows.map((row) => row.effort_days || 0), 1);
  const preview = backlog.slice(0, 6);

  return (
    <section className="panel panel-backlog">
      <PanelHeader
        eyebrow="Backlog"
        title="Périmètre MVP"
        action={`${backlog.length} US`}
        onClick={() =>
          onInspect({
            eyebrow: "Backlog",
            title: "17 user stories cadrées",
            summary:
              "Le backlog reste volontairement MVP : photo, analyse visuelle, recommandation, feedback, RGPD et pilotage.",
            metrics: [
              ["Total", `${backlog.length} stories`],
              ["Effort", formatNumber(totalEffort, " JH")],
              ["Priorités", rows.map((row) => row.moscow).join(" / ")],
            ],
            items: backlog.map((item) => ({
              title: `${item.id} · ${item.moscow}`,
              value: formatNumber(item.effort_days, " JH"),
              text: item.description,
            })),
          })
        }
      />

      <div className="backlog-score">
        <strong>{formatNumber(totalEffort, " JH")}</strong>
        <span>effort avant marge</span>
      </div>

      <div className="bar-list compact">
        {rows.map((row) => (
          <div className="bar-row" key={row.moscow}>
            <div className="bar-row-label">
              <strong>{row.moscow}</strong>
              <span>
                {row.user_stories} items · {formatNumber(row.effort_days, " JH")}
              </span>
            </div>
            <div className="bar-track" aria-hidden="true">
              <span style={{ width: `${((row.effort_days || 0) / maxEffort) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="story-stack" aria-label="Aperçu des user stories">
        {preview.map((item) => (
          <button
            className="story-row"
            key={item.id}
            type="button"
            onClick={() =>
              onInspect({
                eyebrow: item.id,
                title: item.theme || "User story",
                summary: item.description,
                metrics: [
                  ["Priorité", item.moscow || "n/a"],
                  ["Effort", formatNumber(item.effort_days, " JH")],
                  ["Sprint", item.sprint || "n/a"],
                ],
                items: [
                  {
                    title: "Valeur métier",
                    text: item.business_value || EMPTY_DATA_MESSAGE,
                  },
                  {
                    title: "Critères d'acceptation",
                    text: item.acceptance_criteria || EMPTY_DATA_MESSAGE,
                  },
                ],
              })
            }
          >
            <span>{item.id}</span>
            <strong>{item.theme}</strong>
            <em>{formatNumber(item.effort_days, " JH")}</em>
          </button>
        ))}
        {backlog.length > preview.length ? (
          <button
            className="story-row story-row-more"
            type="button"
            onClick={() =>
              onInspect({
                eyebrow: "Backlog complet",
                title: `${backlog.length} user stories`,
                summary:
                  "Le détail complet est conservé dans l'export phase 1. Cette vue met en avant les premiers blocs du MVP pour rester lisible.",
                items: backlog.slice(preview.length).map((item) => ({
                  title: `${item.id} · ${item.moscow}`,
                  value: formatNumber(item.effort_days, " JH"),
                  text: item.description,
                })),
              })
            }
          >
            <span>+</span>
            <strong>{backlog.length - preview.length} user stories restantes</strong>
            <em>ouvrir</em>
          </button>
        ) : null}
      </div>
    </section>
  );
}

function PanelHeader({ eyebrow, title, action, onClick }) {
  return (
    <div className="panel-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
      </div>
      <button className="panel-action" type="button" onClick={onClick}>
        {action}
      </button>
    </div>
  );
}

function buildSummary(backlog) {
  const summary = new Map();
  backlog.forEach((item) => {
    const key = item.moscow || "n/a";
    const current = summary.get(key) || { moscow: key, user_stories: 0, effort_days: 0 };
    current.user_stories += 1;
    current.effort_days += item.effort_days || 0;
    summary.set(key, current);
  });
  return Array.from(summary.values());
}

export default BacklogOverview;
