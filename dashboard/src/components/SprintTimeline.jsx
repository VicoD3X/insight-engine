import { EMPTY_DATA_MESSAGE } from "../data.js";

const FALLBACK_SPRINTS = [
  {
    sprint: 1,
    title: "Photo + qualité + consentement",
    summary: "Prise/import, contrôle qualité et consentement.",
  },
  {
    sprint: 2,
    title: "Analyse + signature",
    summary: "Catégorie, couleurs et signature visuelle.",
  },
  {
    sprint: 3,
    title: "Recommandation + affichage",
    summary: "Top-N, filtres et fiche produit.",
  },
  {
    sprint: 4,
    title: "Finalisation + pilotage",
    summary: "Feedback, KPI, risques et préparation lancement.",
  },
];

function SprintTimeline({ sprints = [] }) {
  const timeline = sprints.length ? sprints : FALLBACK_SPRINTS;

  if (!timeline.length) {
    return (
      <section className="panel">
        <h2>Timeline MVP</h2>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Planning</p>
          <h2>Timeline 4 sprints</h2>
        </div>
      </div>

      <ol className="timeline">
        {timeline.map((sprint) => (
          <li key={sprint.sprint}>
            <span>Sprint {sprint.sprint}</span>
            <strong>{sprint.title || EMPTY_DATA_MESSAGE}</strong>
            <p>{sprint.summary || EMPTY_DATA_MESSAGE}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default SprintTimeline;
