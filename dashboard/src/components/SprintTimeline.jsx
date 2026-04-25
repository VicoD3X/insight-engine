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

function SprintTimeline({ sprints = [], onInspect }) {
  const timeline = sprints.length ? sprints : FALLBACK_SPRINTS;

  if (!timeline.length) {
    return (
      <section className="panel panel-sprints">
        <h3>Timeline MVP</h3>
        <p className="empty-inline">{EMPTY_DATA_MESSAGE}</p>
      </section>
    );
  }

  return (
    <section className="panel panel-sprints">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Timeline</p>
          <h3>4 sprints</h3>
        </div>
        <button
          className="panel-action"
          type="button"
          onClick={() =>
            onInspect({
              eyebrow: "Planning MVP",
              title: "Timeline 4 sprints",
              summary:
                "Une trajectoire volontairement courte pour cadrer, tester et piloter le MVP sans transformer le projet en produit production-ready.",
              items: timeline.map((sprint) => ({
                title: `Sprint ${sprint.sprint}`,
                value: sprint.title,
                text: sprint.summary,
              })),
            })
          }
        >
          Voir
        </button>
      </div>

      <div className="timeline-rail" aria-label="Timeline des sprints">
        {timeline.map((sprint) => (
          <button
            key={sprint.sprint}
            type="button"
            onClick={() =>
              onInspect({
                eyebrow: `Sprint ${sprint.sprint}`,
                title: sprint.title || EMPTY_DATA_MESSAGE,
                summary: sprint.summary || EMPTY_DATA_MESSAGE,
                metrics: [["Durée", `${sprint.duration_weeks || 2} semaines`]],
              })
            }
          >
            <span>{sprint.sprint}</span>
            <strong>{sprint.title}</strong>
            <small>{sprint.duration_weeks || 2} sem.</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SprintTimeline;
