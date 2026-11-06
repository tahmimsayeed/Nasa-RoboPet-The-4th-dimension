import { GameProvider, useGame } from "./context/GameContext";
import Welcome from "./pages/Welcome";
import Workshop from "./pages/Workshop";
import SpaceBackground from "./components/SpaceBackground";
import PixelButton from "./components/PixelButton";
import ProgressBar from "./components/ProgressBar";
import RobotPet from "./components/RobotPet";
function GameScreen() {
  const { player, startGame, resetGame } = useGame();

  const handleWorkshopComplete = (updatedPlayer) => {
    startGame(updatedPlayer);
  };

  return (
    <SpaceBackground>
      {!player ? (
        <Welcome onStart={startGame} />
      ) : !player.robot ? (
        <Workshop
          player={player}
          onComplete={handleWorkshopComplete}
        />
      ) : (
        <main className="welcome-screen">
          <section className="welcome-card">
            <p className="welcome-label">NASA ROBO PET STATION</p>

            <h1>Meet Your Robo-Pal, {player.nickname}!</h1>

            <p className="welcome-description">
              Your robot is ready for its space adventure!
            </p>
            <RobotPet
              nickname={player.nickname}
              color={player.robot.color.value}
              accessory={player.robot.accessory.emoji}
              personality={player.robot.personality}
            />

            <p className="welcome-description">
              Color: {player.robot.color.name}
            </p>

            <p className="welcome-description">
              Accessory: {player.robot.accessory.emoji}{" "}
              {player.robot.accessory.name}
            </p>

            <p className="welcome-description">
              Personality: {player.robot.personality}
            </p>

            <ProgressBar
              progress={0}
              label="Adventure Progress"
            />

            <PixelButton onClick={resetGame}>
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