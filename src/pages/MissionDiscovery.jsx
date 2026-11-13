import { useMemo, useState } from "react";
import { getAllMissions } from "../services/missionService";
import "../styles/MissionDiscovery.css";
import apollo15Image from "../assets/missions/apollo15.jpg";
import sojournerImage from "../assets/missions/sojourner.jpg";
import spiritImage from "../assets/missions/spirit.jpg";
import opportunityImage from "../assets/missions/opportunity.jpg";
import curiosityImage from "../assets/missions/curiosity.jpg";
import perseveranceImage from "../assets/missions/perseverance.jpg";
import ingenuityImage from "../assets/missions/ingenuity.jpg";
import voyager1Image from "../assets/missions/voyager1.jpg";
function formatLaunchDate(value) {
  if (!value) return "Not listed";

  const date = new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(date);
}

function formatLocation(location) {
  return location === "Interstellar Space" ? "Deep Space" : location;
}
const missionImages = {
  "Apollo 15 Lunar Roving Vehicle": apollo15Image,
  Sojourner: sojournerImage,
  Spirit: spiritImage,
  Opportunity: opportunityImage,
  Curiosity: curiosityImage,
  Perseverance: perseveranceImage,
  Ingenuity: ingenuityImage,
  "Voyager 1": voyager1Image,
};

export default function MissionDiscovery() {
  const missions = getAllMissions();

  const [selectedMission, setSelectedMission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [hardwareFilter, setHardwareFilter] = useState("All");

  const hardwareTypes = useMemo(
    () => ["All", ...new Set(missions.map((mission) => mission.hardwareType).filter(Boolean))],
    [missions]
  );

  const filteredMissions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return missions.filter((mission) => {
      const matchesLocation =
        locationFilter === "All" || mission.location === locationFilter;

      const matchesHardware =
        hardwareFilter === "All" || mission.hardwareType === hardwareFilter;

      const searchableText = [
        mission.name,
        mission.location,
        mission.purpose,
        mission.hardwareType,
        mission.hardwareStory,
        mission.scientificImpact,
      ].join(" ").toLowerCase();

      return (
        matchesLocation &&
        matchesHardware &&
        (!search || searchableText.includes(search))
      );
    });
  }, [missions, searchTerm, locationFilter, hardwareFilter]);

  return (
    <main className="mission-discovery">
      <header className="mission-discovery-header">
        <p className="mission-discovery-label">ROBO PET STATION</p>
        <h1>NASA Mission Discovery</h1>
        <p>
          Meet the machines that explored our Solar System.
          Discover where they travelled, what they found, and how
          their work changed our understanding of space.
        </p>
      </header>

      <section className="mission-discovery-controls" aria-label="Mission filters">
        <label htmlFor="mission-search">Search missions and hardware</label>
        <input
          id="mission-search"
          type="search"
          placeholder="Try rover, helicopter, Moon..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="mission-filter-row">
          <label>
            Location
            <select
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
            >
              <option value="All">All locations</option>
              <option value="Moon">Moon</option>
              <option value="Mars">Mars</option>
              <option value="Interstellar Space">Deep Space</option>
            </select>
          </label>

          <label>
            Hardware
            <select
              value={hardwareFilter}
              onChange={(event) => setHardwareFilter(event.target.value)}
            >
              {hardwareTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All hardware" : type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mission-results-count" aria-live="polite">
          Showing {filteredMissions.length} of {missions.length} explorers
        </p>
      </section>

 <section className="mission-discovery-grid" aria-label="NASA missions">
  {filteredMissions.map((mission) => (
    <article className="mission-card" key={mission.id}>
      <div className="mission-card-visual">
        <img
          className="mission-card-image"
          src={missionImages[mission.name]}
          alt={`${mission.name} space hardware`}
          loading="lazy"
        />

        <span className="mission-card-visual-location">
          {formatLocation(mission.location)}
        </span>
      </div>

      <div className="mission-card-content">
        <span className="mission-card-status">{mission.status}</span>

        <h2>{mission.name}</h2>

        <p className="mission-card-location">
          {formatLocation(mission.location)}
        </p>

        <p className="mission-hardware-type">
          {mission.hardwareType}
        </p>

        <p>{mission.hardwareStory}</p>

        <button
          type="button"
          className="mission-card-button"
          onClick={() => setSelectedMission(mission)}
          aria-label={`Explore details about ${mission.name}`}
        >
          Discover Its Story
        </button>
      </div>
    </article>
  ))}
</section>

{filteredMissions.length === 0 && (
  <p className="mission-empty-state">
    No explorers match your search. Try another name or filter.
  </p>
)}

      {selectedMission && (
        <div
          className="mission-modal-overlay"
          onClick={() => setSelectedMission(null)}
        >
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

            <p>
              <strong>Location:</strong>{" "}
              {formatLocation(selectedMission.location)}
            </p>

            <p>
              <strong>Launch date:</strong>{" "}
              {formatLaunchDate(selectedMission.launchDate)}
            </p>

            <p>
              <strong>Mission status:</strong> {selectedMission.status}
            </p>

            <h3>Meet the Hardware</h3>
            <p>
              <strong>Type:</strong> {selectedMission.hardwareType}
            </p>
            <p>{selectedMission.hardwareStory}</p>

            <h3>Where Is It Now?</h3>
            <p>{selectedMission.hardwareLocation}</p>

            <h3>Why Does Its Work Matter?</h3>
            <p>{selectedMission.scientificImpact}</p>

            <h3>Mission Purpose</h3>
            <p>{selectedMission.purpose}</p>

            <h3>Discoveries</h3>
            <ul>
              {selectedMission.discoveries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Did You Know?</h3>
            <ul>
              {selectedMission.facts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {Array.isArray(selectedMission.source) &&
              selectedMission.source.length > 0 && (
                <section className="mission-sources">
                  <h3>Mission Sources</h3>
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

            {Array.isArray(selectedMission.hardwareSources) &&
              selectedMission.hardwareSources.length > 0 && (
                <section className="mission-sources">
                  <h3>Hardware References</h3>
                  <ul>
                    {selectedMission.hardwareSources.map((url) => (
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
