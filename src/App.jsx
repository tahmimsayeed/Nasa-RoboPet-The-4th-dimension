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
import AccessibilityTools from "./components/AccessibilityTools";
import { getMissionById } from "./services/missionService";

const robotMissionIds = {
  "apollo-rover": "apollo-lrv",
  sojourner: "sojourner",
  "spirit-opportunity": "spirit",
  ingenuity: "ingenuity",
  voyager: "voyager-1",
};

function GameScreen() {
  const {
    player,
    players,
    startGame,
    startNewGame,
    switchPlayer,
    saveCreativeWork,
    updateCreativeWork,
    addCreativeReaction,
    removeCreativeWork,
  } = useGame();

  const [showArchive, setShowArchive] = useState(() => Boolean(player?.robot));
  const [showChampion, setShowChampion] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showTradingCard, setShowTradingCard] = useState(false);
  const [showCreativeMission, setShowCreativeMission] = useState(false);
  const [showMuseumWall, setShowMuseumWall] = useState(false);
  const [showMissionDiscovery, setShowMissionDiscovery] = useState(false);

  const resetNavigation = () => {
    setShowArchive(false);
    setShowChampion(false);
    setSelectedMission(null);
    setShowTradingCard(false);
    setShowCreativeMission(false);
    setShowMuseumWall(false);
    setShowMissionDiscovery(false);
  };

  const handleStartNewGame = () => {
    resetNavigation();
    startNewGame();
  };

  const handleSwitchPlayer = (playerId) => {
    resetNavigation();
    switchPlayer(playerId);
    setShowArchive(true);
  };

  const handleMissionComplete = (missionScore) => {
    if (!selectedMission || !player) return;

    const missionId = selectedMission.id;
    const completedMissions = player.completedMissions || [];
    const alreadyCompleted = completedMissions.includes(missionId);
    const nextCompleted = alreadyCompleted
      ? completedMissions
      : [...completedMissions, missionId];

    startGame({
      ...player,
      lastCompletedMissionId: missionId,
      completedMissions: nextCompleted,
      missionScores: {
        ...(player.missionScores || {}),
        [missionId]: missionScore,
      },
    });

    setSelectedMission(null);
    if (!alreadyCompleted && nextCompleted.length >= 3) {
      setShowArchive(false);
      setShowChampion(true);
    } else {
      setShowArchive(true);
      setShowChampion(false);
    }
  };

  const handleSaveCreativeWork = (work) => saveCreativeWork(work);

  const allMissionsCompleted =
    (player?.completedMissions?.length || 0) >= 3;

  const tradingCardMissionId =
    robotMissionIds[player?.robot?.baseId] || "apollo-lrv";
  const tradingCardMission = getMissionById(tradingCardMissionId);

  return (
    <SpaceBackground>
      <AccessibilityTools />
      {!player ? (
        <Welcome
          onStart={startGame}
          savedPlayers={players}
          onSelectPlayer={handleSwitchPlayer}
        />
      ) : !player.robot ? (
        <PetWorkshop onSaved={() => setShowArchive(true)} />
      ) : showMissionDiscovery ? (
        <>
          <MissionDiscovery />
          <div className="screen-navigation">
            <PixelButton onClick={() => setShowMissionDiscovery(false)}>
              Back to Mission Archive
            </PixelButton>
          </div>
        </>
      ) : showMuseumWall ? (
        <MuseumWall
          players={players}
          onBack={() => setShowMuseumWall(false)}
          onApprove={(workId, ownerId) =>
            updateCreativeWork(workId, { approved: true, status: "approved" }, ownerId)
          }
          onReject={(workId, ownerId) =>
            updateCreativeWork(workId, { approved: false, status: "rejected" }, ownerId)
          }
          onReact={(workId, sticker, ownerId) =>
            addCreativeReaction(workId, sticker, ownerId)
          }
          onRemove={(workId, ownerId) => removeCreativeWork(workId, ownerId)}
        />
      ) : showCreativeMission ? (
        <CreativeMission
          player={player}
          mission={selectedMission}
          onSave={handleSaveCreativeWork}
          onBack={() => {
            setSelectedMission(null);
            setShowCreativeMission(false);
            setShowArchive(true);
          }}
        />
      ) : showTradingCard ? (
        <>
          <TradingCard player={player} mission={tradingCardMission} />
          <div className="screen-navigation">
            <PixelButton onClick={() => setShowTradingCard(false)}>
              Back to Mission Archive
            </PixelButton>
          </div>
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
              <PixelButton onClick={() => setSelectedMission(null)}>
                Back to Mission Archive
              </PixelButton>
            </section>
          </main>
        )
      ) : showChampion && allMissionsCompleted ? (
        <main className="welcome-screen">
          <section className="welcome-card">
            <p className="welcome-label">ROBO PET STATION</p>
            <h1 className="champion-title">🏆 Galaxy Champion!</h1>
            <h2>Congratulations, {player.nickname}!</h2>
            <p className="welcome-description">
              You completed all three space missions! You are now an official Galaxy Guardian!
            </p>
            <ProgressBar progress={100} label="Adventure Progress: 3/3 — 100%" />
            <PixelButton onClick={() => setShowTradingCard(true)}>
              View My NASA Trading Card
            </PixelButton>
            <PixelButton onClick={() => {
              setShowChampion(false);
              setShowArchive(true);
            }}>
              Replay Missions
            </PixelButton>
            <PixelButton onClick={handleStartNewGame}>
              Start a New Game
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
          onOpenTradingCard={() => setShowTradingCard(true)}
          onStartNewGame={handleStartNewGame}
        />
      ) : (
        <main className="welcome-screen">
          <section className="welcome-card">
            <p className="welcome-label">NASA ROBO PET STATION</p>
            <h1>Meet Your Robo-Pal, {player.nickname}!</h1>
            <RobotPet
              nickname={player.robot.name || player.nickname}
              color={player.robot.color?.value || player.robot.color || "#55c7ff"}
              accessory={player.robot.accessory?.emoji || player.robot.accessory || "📡"}
              personality={player.robot.personality || "Friendly"}
              baseId={player.robot.baseId}
              wheelType={player.robot.wheelType}
              antennaType={player.robot.antenna || player.robot.antennaType}
              tool={player.robot.tool}
              eyeColor={player.robot.eyeColor}
            />
            <p className="welcome-description">
              Your robot is ready for its space adventure!
            </p>
            <ProgressBar
              progress={((player.completedMissions?.length || 0) / 3) * 100}
              label={`Adventure Progress: ${player.completedMissions?.length || 0}/3`}
            />
            <PixelButton onClick={() => setShowTradingCard(true)}>
              View My NASA Trading Card
            </PixelButton>
            <PixelButton onClick={() => setShowArchive(true)}>
              Continue to Mission Archive
            </PixelButton>
            <PixelButton onClick={handleStartNewGame}>
              Start a New Game
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
