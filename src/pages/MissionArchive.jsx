
import PixelButton from "../components/PixelButton";
import ProgressBar from "../components/ProgressBar";

const missions = [
  {
    id: 1,
    title: "Moon Explorer",
    description: "Travel to the Moon and discover its secrets.",
    emoji: "🌙",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Mars Adventure",
    description: "Explore the red planet and learn about Mars.",
    emoji: "🔴",
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "Galaxy Guardian",
    description: "Travel across the galaxy and protect space.",
    emoji: "🌌",
    difficulty: "Advanced",
  },
];

export default function MissionArchive({
  player,
  onStartMission,
  onOpenCreativeMission,
  onOpenMuseumWall,
  onOpenMissionDiscovery,
}) {
  const completedCount = player.completedMissions?.length || 0;
  const progress = (completedCount / missions.length) * 100;

  return (
    <main className="welcome-screen">
      <section className="welcome-card mission-archive">
        <p className="welcome-label">NASA ROBO PET STATION</p>

        <h1>Mission Archive</h1>

        <p className="welcome-description">
          Hello, {player.nickname}! Choose a mission for you and your Robo-Pal.
        </p>

        <ProgressBar
          progress={progress}
          label={`Mission Progress: ${completedCount}/${missions.length}`}
        />

        <div className="mission-list">
          {missions.map((mission) => (
            <article className="mission-card" key={mission.id}>
              <div className="mission-emoji">{mission.emoji}</div>

              <h2>{mission.title}</h2>

              <p>{mission.description}</p>

              <span className="mission-difficulty">
                {mission.difficulty}
              </span>

              {player.completedMissions?.includes(mission.id) && (
                <div className="mission-completed">
                  ✓ Completed!
                  <p>
                    Score: {player.missionScores?.[mission.id] ?? 0}/3
                  </p>
                </div>
              )}

              <PixelButton onClick={() => onStartMission(mission)}>
                {player.completedMissions?.includes(mission.id)
                  ? "Replay Mission"
                  : "Explore Mission"}
              </PixelButton>

              <PixelButton
                onClick={() => onOpenCreativeMission(mission)}
              >
                🎨 Creative Activities
              </PixelButton>
            </article>
          ))}
        </div>

               <div className="museum-navigation">
          <PixelButton onClick={onOpenMissionDiscovery}>
            🚀 NASA Mission Discovery
          </PixelButton>

          <PixelButton onClick={onOpenMuseumWall}>
            🏛️ Visit Class Museum
          </PixelButton>
        </div>
      </section>
    </main>
  );
}