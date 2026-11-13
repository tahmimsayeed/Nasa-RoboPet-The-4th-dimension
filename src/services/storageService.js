const PLAYERS_KEY = "roboPetPlayers";
const ACTIVE_PLAYER_KEY = "roboPetActivePlayerId";
const LEGACY_PLAYER_KEY = "roboPetPlayer";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);
    return fallback;
  }
}

function makePlayerId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `player-${crypto.randomUUID()}`;
  }
  return `player-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizePlayer(player) {
  if (!player || typeof player !== "object") return null;

  return {
    ...player,
    playerId: player.playerId || makePlayerId(),
    completedMissions: Array.isArray(player.completedMissions)
      ? player.completedMissions
      : [],
    missionScores:
      player.missionScores && typeof player.missionScores === "object"
        ? player.missionScores
        : {},
    creativeWorks: Array.isArray(player.creativeWorks)
      ? player.creativeWorks
      : [],
  };
}

function readPlayers() {
  const stored = readJson(PLAYERS_KEY, null);

  if (Array.isArray(stored)) {
    return stored.map(normalizePlayer).filter(Boolean);
  }

  // Safe one-time migration: keep the old key as a backup until the
  // multi-player save has been written successfully.
  const legacyPlayer = readJson(LEGACY_PLAYER_KEY, null);
  if (legacyPlayer && typeof legacyPlayer === "object") {
    const migrated = normalizePlayer(legacyPlayer);
    try {
      localStorage.setItem(PLAYERS_KEY, JSON.stringify([migrated]));
      localStorage.setItem(ACTIVE_PLAYER_KEY, migrated.playerId);
    } catch (error) {
      console.error("Unable to migrate the saved player:", error);
    }
    return [migrated];
  }

  return [];
}

function writePlayers(players) {
  try {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    return true;
  } catch (error) {
    console.error("Unable to save player profiles:", error);
    return false;
  }
}

export const storageService = {
  getPlayers() {
    return readPlayers();
  },

  getPlayer() {
    try {
      const players = readPlayers();
      const activeId = localStorage.getItem(ACTIVE_PLAYER_KEY);
      return players.find((item) => item.playerId === activeId) || null;
    } catch (error) {
      console.error("Unable to retrieve the active player:", error);
      return null;
    }
  },

  savePlayer(player) {
    const normalized = normalizePlayer(player);
    if (!normalized) return null;

    const players = readPlayers();
    const existingIndex = players.findIndex(
      (item) => item.playerId === normalized.playerId
    );

    const updatedPlayers = [...players];
    if (existingIndex >= 0) {
      updatedPlayers[existingIndex] = normalized;
    } else {
      updatedPlayers.push(normalized);
    }

    if (!writePlayers(updatedPlayers)) return null;

    try {
      localStorage.setItem(ACTIVE_PLAYER_KEY, normalized.playerId);
    } catch (error) {
      console.error("Unable to select the active player:", error);
      return null;
    }

    return normalized;
  },

  setActivePlayer(playerId) {
    const player = readPlayers().find((item) => item.playerId === playerId);
    if (!player) return null;

    try {
      localStorage.setItem(ACTIVE_PLAYER_KEY, player.playerId);
      return player;
    } catch (error) {
      console.error("Unable to switch player:", error);
      return null;
    }
  },

  // Starting a new game only clears the active selection. It does not
  // delete the saved profile or any of its creative work.
  clearPlayer() {
    try {
      localStorage.removeItem(ACTIVE_PLAYER_KEY);
    } catch (error) {
      console.error("Unable to start a new player session:", error);
    }
  },
};
