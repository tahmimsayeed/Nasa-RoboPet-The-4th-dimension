
import RobotPet from "../components/RobotPet";
import "../styles/TradingCard.css";

const hardwareDetails = {
  "apollo-rover": {
    name: "Apollo Lunar Roving Vehicle",
    inspiration: "Inspired by the vehicle astronauts used to explore the Moon."
  },
  sojourner: {
    name: "Sojourner Mars Rover",
    inspiration: "Inspired by NASA's first successful Mars rover."
  },
  "spirit-opportunity": {
    name: "Mars Exploration Rover",
    inspiration: "Inspired by NASA's Spirit and Opportunity rovers."
  },
  ingenuity: {
    name: "Ingenuity Mars Helicopter",
    inspiration: "Inspired by the helicopter that demonstrated powered flight on Mars."
  },
  voyager: {
    name: "Voyager Spacecraft",
    inspiration: "Inspired by NASA's spacecraft that explored the outer Solar System."
  }
};

export default function TradingCard({ player, mission }) {
  const robot = player?.robot;

  if (!robot || !mission) {
    return (
      <main className="trading-card-page">
        <h1>Your Trading Card</h1>
        <p>
          Your robot and mission information will appear here
          once they are available.
        </p>
      </main>
    );
  }

  const hardware = hardwareDetails[robot.baseId] || {
    name: "Space Explorer Robot",
    inspiration: "Inspired by real space exploration technology."
  };

  const robotColor =
    typeof robot.color === "string"
      ? robot.color
      : robot.color?.value || "#55c7ff";

  const robotAccessory =
    typeof robot.accessory === "string"
      ? robot.accessory
      : robot.accessory?.emoji || "📡";

  const wheelLabels = {
    small: "Small Wheels",
    large: "Large Wheels",
    legs: "Robot Legs"
  };

  const antennaLabels = {
    radio: "Radio Antenna",
    satellite: "Satellite Antenna",
    none: "No Antenna"
  };

  const toolLabels = {
    camera: "Camera",
    drill: "Drill",
    sensor: "Scientific Sensor",
    solar: "Solar Panel"
  };

  const facts = Array.isArray(mission.facts)
    ? mission.facts.slice(0, 2)
    : [];

  return (
    <main className="trading-card-page">
      <header className="trading-card-header">
        <p>NASA ROBO PET STATION</p>
        <h1>My Space Explorer Card</h1>
        <p>A special card for your robotic space explorer!</p>
      </header>

      <article className="trading-card">
        <div className="trading-card-top">
          <span>ROBO PET COLLECTIBLE</span>
          <span>★ SPACE EXPLORER ★</span>
        </div>

        <section className="trading-card-pet">
          <h2>{robot.name || player.nickname || "My Robo-Pal"}</h2>

          <RobotPet
            nickname={robot.name || player.nickname}
            color={robotColor}
            accessory={robotAccessory}
            personality={robot.personality || "Friendly"}
            wheelType={wheelLabels[robot.wheelType] || robot.wheelType || "Large Wheels"}
            antennaType={antennaLabels[robot.antenna] || robot.antenna || "Radio Antenna"}
            tool={toolLabels[robot.tool] || robot.tool || "Camera"}
          />
        </section>

        <section className="trading-card-hardware">
          <h3>Real NASA Inspiration</h3>
          <h4>{hardware.name}</h4>
          <p>{hardware.inspiration}</p>
        </section>

        <section className="trading-card-mission">
          <h3>Mission Information</h3>
          <h4>{mission.name}</h4>
          <p>
            <strong>Location:</strong> {mission.location || "Not available"}
          </p>
        </section>

        <section className="trading-card-facts">
          <h3>Two Amazing Mission Facts</h3>

          {facts.length > 0 ? (
            <ul>
              {facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          ) : (
            <p>Mission facts will appear here when available.</p>
          )}
        </section>

        <footer className="trading-card-footer">
          NASA ROBO PET STATION · SPACE EXPLORER COLLECTION
        </footer>
      </article>

      <button
        type="button"
        className="print-card-button"
        onClick={() => window.print()}
      >
        Print My Trading Card
      </button>
    </main>
  );
}
