import { EMPTY_DATA_MESSAGE, formatNumber } from "../data.js";

function BacklogOverview({ backlog = [], summary = [] }) {
  if (!backlog.length) {
    return (
      <section className="panel">
        <h2>Backlog MVP</h2>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  const totalEffort = backlog.reduce((sum, item) => sum + (item.effort_days || 0), 0);
  const rows = summary.length ? summary : buildSummary(backlog);
  const maxEffort = Math.max(...rows.map((row) => row.effort_days || 0), 1);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Backlog</p>
          <h2>Périmètre MVP</h2>
        </div>
        <span className="metric-chip">{backlog.length} user stories</span>
      </div>

      <div className="summary-strip">
        <span>{formatNumber(totalEffort, " JH")}</span>
        <small>effort total avant marge</small>
      </div>

      <div className="bar-list">
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

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Priorité</th>
              <th>Thème</th>
              <th>User story</th>
              <th>Effort</th>
            </tr>
          </thead>
          <tbody>
            {backlog.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <span className={`priority-pill ${String(item.moscow).toLowerCase()}`}>
                    {item.moscow || "n/a"}
                  </span>
                </td>
                <td>{item.theme || EMPTY_DATA_MESSAGE}</td>
                <td>{item.description || EMPTY_DATA_MESSAGE}</td>
                <td>{formatNumber(item.effort_days, " JH")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
