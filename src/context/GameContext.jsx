
import { createContext, useContext, useState } from "react";
import { storageService } from "../services/storageService";

// Create a shared game context
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    return storageService.getPlayer();
  });

  // Save player information and update the application
  const startGame = (playerInfo) => {
    storageService.savePlayer(playerInfo);
    setPlayer(playerInfo);
  };

  // Update player information and save it
  const updatePlayer = (updatedPlayer) => {
    if (!updatedPlayer) return;

    storageService.savePlayer(updatedPlayer);
    setPlayer(updatedPlayer);
  };

  // Save a new creative submission
  const saveCreativeWork = (work) => {
    if (!player) return;

    const updatedPlayer = {
      ...player,
      creativeWorks: [
        ...(player.creativeWorks || []),
        work,
      ],
    };

    updatePlayer(updatedPlayer);
  };

  // Update an existing creative submission
  const updateCreativeWork = (workId, updates) => {
    if (!player) return;

    const updatedPlayer = {
      ...player,
      creativeWorks: (player.creativeWorks || []).map((work) =>
        work.id === workId
          ? { ...work, ...updates }
          : work
      ),
    };

    updatePlayer(updatedPlayer);
  };

  // Add a sticker reaction to a creative submission
  const addCreativeReaction = (workId, sticker) => {
    if (!player) return;

    const updatedPlayer = {
      ...player,
      creativeWorks: (player.creativeWorks || []).map((work) =>
        work.id === workId
          ? {
              ...work,
              reactions: [
                ...(work.reactions || []),
                sticker,
              ],
            }
          : work
      ),
    };

    updatePlayer(updatedPlayer);
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
        saveCreativeWork,
        updateCreativeWork,
        addCreativeReaction,
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
