import { useState } from "react";
import { getAllMissions } from "../services/missionService";
import "../styles/MissionDiscovery.css";

function MissionDiscovery() {
  const missions = getAllMissions();
  const [selectedMission, setSelectedMission] = useState(null);

  return (
    <main className="mission-discovery">
      <header className="mission-discovery-header">
        <p className="mission-discovery-label">ROBO PET STATION</p>
        <h1>NASA Mission Discovery</h1>
        <p>
          Explore the incredible machines that have travelled beyond Earth.
          Discover their missions, achievements, and scientific discoveries!
        </p>
      </header>

      <section className="mission-discovery-grid">
        {missions.map((mission) => (
          <article className="mission-card" key={mission.id}>
            <div className="mission-card-content">
              <span className="mission-card-status">{mission.status}</span>

              <h2>{mission.name}</h2>

              <p className="mission-card-location">
                {mission.location}
              </p>

              <p>{mission.purpose}</p>

              <button
                type="button"
                className="mission-card-button"
                onClick={() => setSelectedMission(mission)}
              >
                Explore Mission
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectedMission && (
        <div className="mission-modal-overlay">
          <section
            className="mission-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-modal-title"
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
            <p><strong>Launch Date:</strong> {selectedMission.launchDate}</p>
            <p><strong>Purpose:</strong> {selectedMission.purpose}</p>
            <p><strong>Status:</strong> {selectedMission.status}</p>

            <h3>Discoveries</h3>
            <ul>
              {selectedMission.discoveries.map((discovery, index) => (
                <li key={index}>{discovery}</li>
              ))}
            </ul>

            <h3>Fun Facts</h3>
            <ul>
              {selectedMission.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}

export default MissionDiscovery;