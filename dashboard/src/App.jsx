import { useEffect, useState } from "react";
import KpiCards from "./components/KpiCards.jsx";
import BacklogOverview from "./components/BacklogOverview.jsx";
import RoiScenarios from "./components/RoiScenarios.jsx";
import RiskMatrix from "./components/RiskMatrix.jsx";
import RgpdSummary from "./components/RgpdSummary.jsx";
import SprintTimeline from "./components/SprintTimeline.jsx";
import { EMPTY_DATA_MESSAGE, loadDashboardData } from "./data.js";

const DEFAULT_DETAIL = {
  eyebrow: "Vue d'ensemble",
  title: "Pilotage MVP Fashion-Insta",
  summary:
    "Une lecture compacte du cadrage : investissement, effort, ROI, risques, RGPD et trajectoire en 4 sprints.",
  metrics: [
    ["Format", "Dashboard statique"],
    ["Backend", "Aucun"],
    ["Source", "dashboard_data.json"],
  ],
};

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeDetail, setActiveDetail] = useState(DEFAULT_DETAIL);

  useEffect(() => {
    let isMounted = true;

    loadDashboardData()
      .then((data) => {
        if (!isMounted) return;
        setDashboardData(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (!isMounted) return;
        setErrorMessage(error.message || EMPTY_DATA_MESSAGE);
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <main className="screen-shell">
        <section className="empty-state">Chargement des données du dashboard...</section>
      </main>
    );
  }

  if (status === "error" || !dashboardData) {
    return (
      <main className="screen-shell">
        <section className="empty-state">
          <strong>{EMPTY_DATA_MESSAGE}</strong>
          <span>{errorMessage}</span>
        </section>
      </main>
    );
  }

  return (
    <main className="screen-shell">
      <section className="app-frame" aria-label="Dashboard Insight Engine">
        <aside className="brand-rail">
          <div className="brand-mark" aria-hidden="true">
            IE
          </div>
          <div>
            <p className="eyebrow">Portfolio · Live</p>
            <h1>Insight Engine</h1>
            <p className="brand-copy">
              Pilotage MVP Fashion-Insta, construit depuis les exports de cadrage.
            </p>
          </div>
          <div className="rail-status">
            <span>Source active</span>
            <strong>dashboard_data.json</strong>
            <small>Aucun backend · aucune donnée inventée</small>
          </div>
          <button
            className="ghost-button"
            type="button"
            onClick={() => setActiveDetail(DEFAULT_DETAIL)}
          >
            Recentrer la vue
          </button>
        </aside>

        <section className="command-center">
          <header className="topline">
            <div>
              <p className="eyebrow">Cockpit décisionnel</p>
              <h2>Fashion-Insta MVP Analytics</h2>
            </div>
            <div className="topline-meta">
              <span>17 user stories</span>
              <span>4 sprints</span>
              <span>MVP</span>
            </div>
          </header>

          <KpiCards data={dashboardData} onInspect={setActiveDetail} />

          <div className="dashboard-grid">
            <BacklogOverview
              backlog={dashboardData.backlog}
              summary={dashboardData.backlogSummary}
              onInspect={setActiveDetail}
            />
            <RoiScenarios
              scenarios={dashboardData.roiScenarios}
              onInspect={setActiveDetail}
            />
            <RiskMatrix risks={dashboardData.risks} onInspect={setActiveDetail} />
            <RgpdSummary rgpd={dashboardData.rgpd} onInspect={setActiveDetail} />
            <SprintTimeline
              sprints={dashboardData.sprints}
              onInspect={setActiveDetail}
            />
          </div>
        </section>

        <DetailPanel detail={activeDetail} />
      </section>
    </main>
  );
}

function DetailPanel({ detail }) {
  const metrics = detail?.metrics || [];
  const items = detail?.items || [];
  const hasDetails = metrics.length || items.length;

  return (
    <aside className="inspector" aria-live="polite">
      <div className="inspector-glow" aria-hidden="true" />
      <p className="eyebrow">{detail?.eyebrow || "Détail"}</p>
      <h2>{detail?.title || "Lecture détaillée"}</h2>
      <p className="inspector-summary">{detail?.summary || EMPTY_DATA_MESSAGE}</p>

      {metrics.length ? (
        <dl className="inspector-metrics">
          {metrics.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {items.length ? (
        <div className="inspector-list">
          {items.slice(0, 5).map((item) => (
            <article key={`${item.title}-${item.value || item.text}`}>
              <span>{item.title}</span>
              {item.value ? <strong>{item.value}</strong> : null}
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      ) : null}

      {!hasDetails ? (
        <div className="inspector-list inspector-empty-detail">
          <article>
            <span>Lecture</span>
            <p>
              Cliquez sur un KPI, un scénario, un risque ou un sprint pour déployer une
              lecture détaillée dans ce panneau.
            </p>
          </article>
          <article>
            <span>Positionnement</span>
            <p>
              Le dashboard reste volontairement local : il restitue les exports de cadrage
              sans backend, sans données inventées et sans surcouche production-ready.
            </p>
          </article>
        </div>
      ) : null}
    </aside>
  );
}

export default App;
