
import { GameProvider, useGame } from "./context/GameContext";
import Welcome from "./pages/Welcome";
import SpaceBackground from "./components/SpaceBackground";
import PixelButton from "./components/PixelButton";
import ProgressBar from "./components/ProgressBar";

function GameScreen() {
  const { player, startGame, resetGame } = useGame();

  return (
    <SpaceBackground>
      {player ? (
        <main className="welcome-screen">
          <section className="welcome-card">
            <p className="welcome-label">
              NASA ROBO PET STATION
            </p>

            <h1>Welcome, {player.nickname}!</h1>

            <p className="welcome-description">
              Your space adventure is ready to begin!
              Your robotic pet is waiting for you.
            </p>

            {player.classCode && (
              <p className="welcome-description">
                Class Code: {player.classCode}
              </p>
            )}

            <ProgressBar
              progress={0}
              label="Adventure Progress"
            />

            <PixelButton onClick={resetGame}>
              Start Again
            </PixelButton>
          </section>
        </main>
      ) : (
        <Welcome onStart={startGame} />
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
