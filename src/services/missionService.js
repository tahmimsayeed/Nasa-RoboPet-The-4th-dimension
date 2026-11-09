// Import the local NASA mission database
import missions from "../data/missions.json" with { type: "json" };

/**
 * Returns all available NASA mission records.
 */
export function getAllMissions() {
  return missions;
}

/**
 * Returns one NASA mission using its unique ID.
 *
 * @param {string} id - The unique mission ID.
 * @returns {Object|null} The mission record or null if not found.
 */
export function getMissionById(id) {
  const mission = missions.find((item) => item.id === id);

  return mission ?? null;
}