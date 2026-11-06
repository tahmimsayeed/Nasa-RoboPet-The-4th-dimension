
const STORAGE_KEY = "roboPetPlayer";

export const storageService = {
  // Save player information in the browser
  savePlayer(player) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch (error) {
      console.error("Unable to save player information:", error);
    }
  },

  // Retrieve saved player information
  getPlayer() {
    try {
      const savedPlayer = localStorage.getItem(STORAGE_KEY);
      return savedPlayer ? JSON.parse(savedPlayer) : null;
    } catch (error) {
      console.error("Unable to retrieve player information:", error);
      return null;
    }
  },

  // Remove saved player information
  clearPlayer() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Unable to clear player information:", error);
    }
  },
};
