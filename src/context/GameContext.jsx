
import { createContext, useContext, useState } from "react";
import { storageService } from "../services/storageService";

// Create a shared game context
const GameContext = createContext(null);

// Provider makes game information available to other components
export function GameProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    return storageService.getPlayer();
  });

  // Save player information and update the application
  const startGame = (playerInfo) => {
    storageService.savePlayer(playerInfo);
    setPlayer(playerInfo);
  };

  // Clear player information
  const resetGame = () => {
    storageService.clearPlayer();
    setPlayer(null);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        startGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for accessing game information
export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }

  return context;
}
