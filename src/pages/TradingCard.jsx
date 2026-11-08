
import RobotPet from "../components/RobotPet";
import "../styles/TradingCard.css";

const hardwareDetails = {
  "apollo-rover": {
    name: "Apollo Lunar Roving Vehicle",
    inspiration: "Inspired by the lunar vehicle used by astronauts during Apollo missions.",
  },
  sojourner: {
    name: "Sojourner Mars Rover",
    inspiration: "Inspired by NASA's first successful Mars rover.",
  },
  "spirit-opportunity": {
    name: "Spirit and Opportunity Mars Rovers",
    inspiration: "Inspired by the twin rovers that explored the surface of Mars.",
  },
  ingenuity: {
    name: "Ingenuity Mars Helicopter",
    inspiration: "Inspired by the helicopter that demonstrated powered flight on Mars.",
  },
  voyager: {
    name: "Voyager Spacecraft",
    inspiration: "Inspired by NASA's spacecraft that explored the outer Solar System.",
  },
};

export default function TradingCard({ player, mission }) {
  const robot = player?.robot;

  if (!robot || !mission) {
    return (
      <main className="trading-card-page">
        <h1>Your Trading Card</h1>
        <p>
          Your robot and mission information will appear here once they
          are available.
        </p>
      </main>
    );
  }

  const hardware = hardwareDetails[robot.baseId] || {
    name: "Space Explorer Robot",
    inspiration: "Inspired by real space exploration technology.",
  };

  const robotColor =
    typeof robot.color === "string"
      ? robot.color
      : robot.color?.value || "#55c7ff";

  const colorName =
    typeof robot.color === "object"
      ? robot.color?.name || "Custom Color"
      : robot.color || "Default Color";

  const robotAccessory =
    typeof robot.accessory === "string"
      ? robot.accessory
      : robot.accessory?.emoji || "📡";

  const accessoryName =
    typeof robot.accessory === "object"
      ? robot.accessory?.name || "Accessory"
      : robot.accessory || "Accessory";

  const wheelType = robot.wheelType || "Large Wheels";
  const antenna = robot.antenna || "Radio Antenna";
  const tool = robot.tool || "Camera";
  const eyeColor = robot.eyeColor || "#55c7ff";

  const facts = Array.isArray(mission.facts)
    ? mission.facts.slice(0, 3)
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
          <h2>{robot.name || "My Robo-Pal"}</h2>

          <p>
            Created by: {player.nickname || "Space Explorer"}
          </p>

          <RobotPet
            nickname={robot.name || player.nickname}
            color={robotColor}
            accessory={robotAccessory}
            personality={robot.personality || "Friendly"}
            baseId={robot.baseId}
            wheelType={wheelType}
            antennaType={antenna}
            tool={tool}
            eyeColor={eyeColor}
          />
        </section>

        <section className="trading-card-hardware">
          <h3>Real NASA Inspiration</h3>
          <h4>{hardware.name}</h4>
          <p>{hardware.inspiration}</p>
        </section>

        <section className="trading-card-details">
          <h3>My Robot's Design</h3>

          <ul>
            <li><strong>Body Color:</strong> {colorName}</li>
            <li><strong>Eye Color:</strong> {eyeColor}</li>
            <li><strong>Wheels / Movement:</strong> {wheelType}</li>
            <li><strong>Antenna:</strong> {antenna}</li>
            <li><strong>Tool:</strong> {tool}</li>
            <li><strong>Accessory:</strong> {accessoryName} {robotAccessory}</li>
            <li><strong>Personality:</strong> {robot.personality || "Friendly"}</li>
          </ul>
        </section>

        <section className="trading-card-mission">
          <h3>Mission Information</h3>
          <h4>{mission.name}</h4>
          <p>
            <strong>Location:</strong>{" "}
            {mission.location || "Not available"}
          </p>
        </section>

        <section className="trading-card-facts">
          <h3>Mission Facts</h3>

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
