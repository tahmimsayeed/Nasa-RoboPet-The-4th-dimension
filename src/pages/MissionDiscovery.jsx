import { useState } from "react";
import { getAllMissions } from "../services/missionService";
import "../styles/MissionDiscovery.css";

function formatLaunchDate(value) {
  if (!value) return "Not listed";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(date);
}

export default function MissionDiscovery() {
  const missions = getAllMissions();
  const [selectedMission, setSelectedMission] = useState(null);

  return (
    <main className="mission-discovery">
      <header className="mission-discovery-header">
        <p className="mission-discovery-label">ROBO PET STATION</p>
        <h1>NASA Mission Discovery</h1>
        <p>
          Explore real spacecraft and robotic explorers. Read about their goals,
          discoveries, and the science they helped us understand.
        </p>
      </header>

      <section className="mission-discovery-grid" aria-label="NASA missions">
        {missions.map((mission) => (
          <article className="mission-card" key={mission.id}>
            <div className="mission-card-content">
              <span className="mission-card-status">{mission.status}</span>
              <h2>{mission.name}</h2>
              <p className="mission-card-location">{mission.location}</p>
              <p>{mission.purpose}</p>
              <button
                type="button"
                className="mission-card-button"
                onClick={() => setSelectedMission(mission)}
                aria-label={`Explore details about ${mission.name}`}
              >
                Explore Mission
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectedMission && (
        <div className="mission-modal-overlay" onClick={() => setSelectedMission(null)}>
          <section
            className="mission-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="mission-modal-close"
              onClick={() => setSelectedMission(null)}
              aria-label="Close mission details"
            >
              ×
            </button>
            <h2 id="mission-modal-title">{selectedMission.name}</h2>
            <p><strong>Location:</strong> {selectedMission.location}</p>
            <p><strong>Launch date:</strong> {formatLaunchDate(selectedMission.launchDate)}</p>
            <p><strong>Purpose:</strong> {selectedMission.purpose}</p>
            <p><strong>Status in this learning guide:</strong> {selectedMission.status}</p>

            <h3>Discoveries</h3>
            <ul>{selectedMission.discoveries.map((item) => <li key={item}>{item}</li>)}</ul>

            <h3>Did you know?</h3>
            <ul>{selectedMission.facts.map((item) => <li key={item}>{item}</li>)}</ul>

            {Array.isArray(selectedMission.source) && selectedMission.source.length > 0 && (
              <section className="mission-sources">
                <h3>NASA and mission sources</h3>
                <ul>
                  {selectedMission.source.map((url) => (
                    <li key={url}>
                      <a href={url} target="_blank" rel="noreferrer noopener">
                        {new URL(url).hostname.replace(/^www\./, "")}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
