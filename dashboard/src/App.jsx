import { useEffect, useState } from "react";
import KpiCards from "./components/KpiCards.jsx";
import BacklogOverview from "./components/BacklogOverview.jsx";
import RoiScenarios from "./components/RoiScenarios.jsx";
import RiskMatrix from "./components/RiskMatrix.jsx";
import RgpdSummary from "./components/RgpdSummary.jsx";
import SprintTimeline from "./components/SprintTimeline.jsx";
import { EMPTY_DATA_MESSAGE, loadDashboardData } from "./data.js";

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

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
      <main className="page-shell">
        <section className="empty-state">Chargement des données du dashboard…</section>
      </main>
    );
  }

  if (status === "error" || !dashboardData) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <strong>{EMPTY_DATA_MESSAGE}</strong>
          <span>{errorMessage}</span>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Dashboard local · Phase 2</p>
          <h1>Insight Engine — Pilotage MVP Fashion-Insta</h1>
          <p className="hero-copy">
            Visualisation locale des données issues de la phase 1 : cadrage MVP,
            backlog, budget, ROI, risques et conformité RGPD. Aucun backend, aucune
            donnée inventée.
          </p>
        </div>
        <aside className="hero-panel" aria-label="Résumé du périmètre">
          <span>Source</span>
          <strong>dashboard_data.json</strong>
          <small>Pipeline analytique → dashboard React local</small>
        </aside>
      </header>

      <KpiCards data={dashboardData} />

      <div className="section-grid">
        <BacklogOverview
          backlog={dashboardData.backlog}
          summary={dashboardData.backlogSummary}
        />
        <RoiScenarios scenarios={dashboardData.roiScenarios} />
      </div>

      <RiskMatrix risks={dashboardData.risks} />

      <div className="section-grid section-grid-bottom">
        <RgpdSummary rgpd={dashboardData.rgpd} />
        <SprintTimeline sprints={dashboardData.sprints} />
      </div>
    </main>
  );
}

export default App;
