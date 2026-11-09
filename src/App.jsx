
import { useState } from "react";
import { GameProvider, useGame } from "./context/GameContext";

import Welcome from "./pages/Welcome";
import PetWorkshop from "./pages/PetWorkshop";
import TradingCard from "./pages/TradingCard";
import MissionArchive from "./pages/MissionArchive";
import MissionActivity from "./pages/MissionActivity";
import MarsMissionActivity from "./pages/MarsMissionActivity";
import GalaxyMissionActivity from "./pages/GalaxyMissionActivity";
import MissionDiscovery from "./pages/MissionDiscovery";
import CreativeMission from "./pages/CreativeMission";
import MuseumWall from "./pages/MuseumWall";

import SpaceBackground from "./components/SpaceBackground";
import PixelButton from "./components/PixelButton";
import ProgressBar from "./components/ProgressBar";
import RobotPet from "./components/RobotPet";

function GameScreen() {
  const {
    player,
    startGame,
    resetGame,
    saveCreativeWork,
    updateCreativeWork,
    addCreativeReaction,
  } = useGame();

  const [showArchive, setShowArchive] = useState(() => {
    return Boolean(
      player?.robot && player?.completedMissions?.length
    );
  });

  const [selectedMission, setSelectedMission] = useState(null);
  const [showTradingCard, setShowTradingCard] = useState(false);
  const [showCreativeMission, setShowCreativeMission] = useState(false);
  const [showMuseumWall, setShowMuseumWall] = useState(false);
  const [showMissionDiscovery, setShowMissionDiscovery] = useState(false);

  const handleMissionComplete = (missionScore) => {
    const missionId = selectedMission.id;
    const completedMissions = player.completedMissions || [];

    const updatedPlayer = {
      ...player,
      lastCompletedMissionId: missionId,
      completedMissions: completedMissions.includes(missionId)
        ? completedMissions
        : [...completedMissions, missionId],
      missionScores: {
        ...(player.missionScores || {}),
        [missionId]: missionScore,
      },
    };

    startGame(updatedPlayer);
    setSelectedMission(null);
    setShowArchive(true);
  };

  const handleReset = () => {
    setShowArchive(false);
    setSelectedMission(null);
    setShowTradingCard(false);
    setShowCreativeMission(false);
    setShowMuseumWall(false);
    setShowMissionDiscovery(false);
    resetGame();
  };

  const handleSaveCreativeWork = (work) => {
    saveCreativeWork(work);
  };

  const handleApproveWork = (workId) => {
    updateCreativeWork(workId, {
      approved: true,
      status: "approved",
    });
  };

  const handleRejectWork = (workId) => {
    updateCreativeWork(workId, {
      approved: false,
      status: "rejected",
    });
  };

  const handleCreativeReaction = (workId, sticker) => {
    addCreativeReaction(workId, sticker);
  };

  const allMissionsCompleted =
    (player?.completedMissions?.length || 0) === 3;

  const tradingCardMissions = {
    1: {
      name: "Moon Explorer",
      location: "The Moon",
      facts: [
        "The Moon is Earth's natural satellite.",
        "The Moon reflects sunlight rather than producing its own light.",
        "The Moon has a rocky surface with craters caused by impacts.",
      ],
    },
    2: {
      name: "Mars Adventure",
      location: "Mars",
      facts: [
        "Iron-rich minerals give Mars its reddish color.",
        "Mars has two moons: Phobos and Deimos.",
        "Olympus Mons is the largest known volcano in our Solar System.",
      ],
    },
    3: {
      name: "Galaxy Guardian",
      location: "The Milky Way Galaxy",
      facts: [
        "Galaxies contain billions or even trillions of stars.",
        "Our Solar System is inside the Milky Way Galaxy.",
        "Black holes have extremely strong gravity.",
      ],
    },
  };

  const lastMissionId =
    player?.lastCompletedMissionId ??
    player?.completedMissions?.at(-1);

  const tradingCardMission = tradingCardMissions[lastMissionId];

  return (
    <SpaceBackground>
      {!player ? (
        <Welcome onStart={startGame} />
      ) : !player.robot ? (
        <PetWorkshop />
      ) : showMissionDiscovery ? (
        <>
          <MissionDiscovery />
          <PixelButton
            onClick={() => setShowMissionDiscovery(false)}
          >
            Back to Mission Archive
          </PixelButton>
        </>
      ) : showMuseumWall ? (
        <MuseumWall
          player={player}
          onBack={() => setShowMuseumWall(false)}
          onApprove={handleApproveWork}
          onReject={handleRejectWork}
          onReact={handleCreativeReaction}
        />
      ) : showCreativeMission ? (
        <CreativeMission
          player={player}
          mission={selectedMission}
          onSave={handleSaveCreativeWork}
          onBack={() => {
            setShowCreativeMission(false);
            setShowArchive(true);
          }}
        />
      ) : showTradingCard && tradingCardMission ? (
        <>
          <TradingCard
            player={player}
            mission={tradingCardMission}
          />
          <PixelButton
            onClick={() => setShowTradingCard(false)}
          >
            Back to Robo-Pal
          </PixelButton>
        </>
      ) : selectedMission ? (
        selectedMission.id === 1 ? (
          <MissionActivity
            player={player}
            onBack={() => setSelectedMission(null)}
            onComplete={handleMissionComplete}
          />
        ) : selectedMission.id === 2 ? (
          <MarsMissionActivity
            player={player}
            onBack={() => setSelectedMission(null)}
            onComplete={handleMissionComplete}
          />
        ) : selectedMission.id === 3 ? (
          <GalaxyMissionActivity
            player={player}
            onBack={() => setSelectedMission(null)}
            onComplete={handleMissionComplete}
          />
        ) : (
          <main className="welcome-screen">
            <section className="welcome-card">
              <h1>Mission Coming Soon!</h1>
              <PixelButton
                onClick={() => setSelectedMission(null)}
              >
                Back to Mission Archive
              </PixelButton>
            </section>
          </main>
        )
      ) : !showArchive && allMissionsCompleted ? (
        <main className="welcome-screen">
          <section className="welcome-card">
            <p className="welcome-label">ROBO PET STATION</p>
            <h1 className="champion-title">
              🏆 Galaxy Champion!
            </h1>
            <h2>Congratulations, {player.nickname}!</h2>

            <p className="welcome-description">
              You completed all three space missions!
              You are now an official Galaxy Guardian!
            </p>

            <ProgressBar
              progress={100}
              label="Adventure Progress: 3/3 — 100%"
            />

            {tradingCardMission && (
              <PixelButton
                onClick={() => setShowTradingCard(true)}
              >
                View My Trading Card
              </PixelButton>
            )}

            <PixelButton onClick={() => setShowArchive(true)}>
              Replay Missions
            </PixelButton>

            <PixelButton onClick={handleReset}>
              Start a New Adventure
            </PixelButton>
          </section>
        </main>
      ) : showArchive ? (
        <MissionArchive
          player={player}
          onStartMission={setSelectedMission}
          onOpenCreativeMission={(mission) => {
            setSelectedMission(mission);
            setShowCreativeMission(true);
          }}
          onOpenMuseumWall={() => setShowMuseumWall(true)}
          onOpenMissionDiscovery={() => setShowMissionDiscovery(true)}
        />
      ) : (
        <main className="welcome-screen">
          <section className="welcome-card">
            <p className="welcome-label">
              NASA ROBO PET STATION
            </p>

            <h1>Meet Your Robo-Pal, {player.nickname}!</h1>

            <RobotPet
              nickname={player.nickname}
              color={player.robot.color.value}
              accessory={player.robot.accessory.emoji}
              personality={player.robot.personality}
              baseId={player.robot.baseId}
              wheelType={player.robot.wheelType}
              antennaType={player.robot.antennaType}
              tool={player.robot.tool}
              eyeColor={player.robot.eyeColor}
            />

            <p className="welcome-description">
              Your robot is ready for its space adventure!
            </p>

            <ProgressBar
              progress={
                ((player.completedMissions?.length || 0) / 3) * 100
              }
              label={`Adventure Progress: ${
                player.completedMissions?.length || 0
              }/3`}
            />

            {tradingCardMission && (
              <PixelButton
                onClick={() => setShowTradingCard(true)}
              >
                View My Trading Card
              </PixelButton>
            )}

            <PixelButton onClick={() => setShowArchive(true)}>
              Continue to Mission Archive
            </PixelButton>

            <PixelButton onClick={handleReset}>
              Start Again
            </PixelButton>
          </section>
        </main>
      )}
    </SpaceBackground>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}
