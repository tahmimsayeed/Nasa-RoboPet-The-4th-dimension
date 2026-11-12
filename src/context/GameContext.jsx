import { createContext, useContext, useState } from "react";
import { storageService } from "../services/storageService";

const GameContext = createContext(null);

function createPlayerId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `player-${crypto.randomUUID()}`;
  }
  return `player-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function GameProvider({ children }) {
  const [players, setPlayers] = useState(() => storageService.getPlayers());
  const [player, setPlayer] = useState(() => storageService.getPlayer());

  const refreshPlayers = () => setPlayers(storageService.getPlayers());

  const startGame = (playerInfo) => {
    if (!playerInfo) return null;
    const savedPlayer = storageService.savePlayer({
      ...playerInfo,
      playerId: playerInfo.playerId || createPlayerId(),
    });
    if (!savedPlayer) return null;
    setPlayer(savedPlayer);
    refreshPlayers();
    return savedPlayer;
  };

  const updatePlayer = (updatedPlayer) => {
    if (!updatedPlayer) return null;
    const savedPlayer = storageService.savePlayer(updatedPlayer);
    if (!savedPlayer) return null;
    setPlayer(savedPlayer);
    refreshPlayers();
    return savedPlayer;
  };

  const startNewGame = () => {
    storageService.clearPlayer();
    setPlayer(null);
  };

  const switchPlayer = (playerId) => {
    const savedPlayer = storageService.setActivePlayer(playerId);
    if (!savedPlayer) return;
    setPlayer(savedPlayer);
    refreshPlayers();
  };

  const updatePlayerById = (playerId, updater) => {
    const target = storageService.getPlayers().find((item) => item.playerId === playerId);
    if (!target) return;

    const updated = storageService.savePlayer(updater(target));
    if (!updated) return;

    if (player?.playerId === playerId) setPlayer(updated);
    refreshPlayers();
  };

  const saveCreativeWork = (work) => {
    if (!player) return;
    updatePlayer({
      ...player,
      creativeWorks: [
        ...(player.creativeWorks || []),
        {
          ...work,
          creatorName: player.nickname,
          creatorPlayerId: player.playerId,
          robotSnapshot: player.robot || null,
        },
      ],
    });
  };

  const updateCreativeWork = (workId, updates, ownerPlayerId = player?.playerId) => {
    if (!ownerPlayerId) return;
    updatePlayerById(ownerPlayerId, (owner) => ({
      ...owner,
      creativeWorks: (owner.creativeWorks || []).map((work) =>
        work.id === workId ? { ...work, ...updates } : work
      ),
    }));
  };

  const removeCreativeWork = (workId, ownerPlayerId = player?.playerId) => {
    if (!ownerPlayerId) return;
    updatePlayerById(ownerPlayerId, (owner) => ({
      ...owner,
      creativeWorks: (owner.creativeWorks || []).filter((work) => work.id !== workId),
    }));
  };

  const addCreativeReaction = (workId, sticker, ownerPlayerId = player?.playerId) => {
    if (!ownerPlayerId) return;
    updatePlayerById(ownerPlayerId, (owner) => ({
      ...owner,
      creativeWorks: (owner.creativeWorks || []).map((work) =>
        work.id === workId
          ? { ...work, reactions: [...(work.reactions || []), sticker] }
          : work
      ),
    }));
  };

  return (
    <GameContext.Provider
      value={{
        player,
        players,
        startGame,
        updatePlayer,
        resetGame: startNewGame,
        startNewGame,
        switchPlayer,
        saveCreativeWork,
        updateCreativeWork,
        addCreativeReaction,
        removeCreativeWork,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
}
