import PixelButton from "../components/PixelButton";
import ProgressBar from "../components/ProgressBar";

const missions = [
  {
    id: 1,
    title: "Moon Explorer",
    description: "Help the Apollo 15 Lunar Roving Vehicle explore the Moon.",
    emoji: "🌙",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Mars Adventure",
    description: "Investigate Mars with NASA's robotic rover explorers.",
    emoji: "🔴",
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "Galaxy Guardian",
    description: "Follow Voyager on its journey beyond the Solar System.",
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
  onOpenTradingCard,
  onStartNewGame,
}) {
  const completedCount = player.completedMissions?.length || 0;
  const progress = Math.min(100, (completedCount / missions.length) * 100);
  const creativeCount = player.creativeWorks?.length || 0;

  const journeyStages = [
    { label: "Build", done: Boolean(player.robot) },
    { label: "Learn", done: completedCount > 0 },
    { label: "Create", done: creativeCount > 0 },
    { label: "Share", done: (player.creativeWorks || []).some((work) => work.status === "approved") },
  ];

  return (
    <main className="welcome-screen">
      <section className="welcome-card mission-archive">
        <p className="welcome-label">NASA ROBO PET STATION</p>
        <h1>Mission Archive</h1>
        <p className="welcome-description">
          Hello, {player.nickname}! Choose a mission for you and your Robo-Pal.
        </p>

        <ProgressBar progress={progress} label={`Mission Progress: ${completedCount}/3`} />

        <ol className="journey-stages" aria-label="Adventure journey">
          {journeyStages.map((stage) => (
            <li className={stage.done ? "complete" : ""} key={stage.label}>
              <span aria-hidden="true">{stage.done ? "✓" : "○"}</span>
              {stage.label}
            </li>
          ))}
        </ol>

        <div className="mission-list">
          {missions.map((mission) => (
            <article className="mission-card" key={mission.id}>
              <div className="mission-emoji" aria-hidden="true">{mission.emoji}</div>
              <h2>{mission.title}</h2>
              <p>{mission.description}</p>
              <span className="mission-difficulty">{mission.difficulty}</span>

              {player.completedMissions?.includes(mission.id) && (
                <div className="mission-completed">
                  ✓ Completed!
                  <p>Score: {player.missionScores?.[mission.id] ?? 0}/3</p>
                </div>
              )}

              <PixelButton onClick={() => onStartMission(mission)}>
                {player.completedMissions?.includes(mission.id) ? "Replay Mission" : "Explore Mission"}
              </PixelButton>
              <PixelButton onClick={() => onOpenCreativeMission(mission)}>
                🎨 Creative Activities
              </PixelButton>
            </article>
          ))}
        </div>

        <div className="museum-navigation">
          <PixelButton onClick={onOpenMissionDiscovery}>🚀 NASA Mission Discovery</PixelButton>
          <PixelButton onClick={onOpenMuseumWall}>🏛️ Visit Class Museum</PixelButton>
          <PixelButton onClick={onOpenTradingCard}>🪪 My NASA Trading Card</PixelButton>
        </div>

        <div className="new-game-navigation">
          <p>Your progress is saved on this browser.</p>
          <PixelButton onClick={onStartNewGame}>＋ Start a New Game</PixelButton>
        </div>
      </section>
    </main>
  );
}
