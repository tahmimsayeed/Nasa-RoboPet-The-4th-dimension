
import { useState } from "react";
import RobotPet from "../components/RobotPet";
import { useGame } from "../context/GameContext";
import "../styles/PetWorkshop.css";

// Five robot bases inspired by real NASA hardware
const robotBases = [
  {
    id: "apollo-rover",
    name: "Apollo Lunar Rover",
    emoji: "🚙",
    description: "A vehicle designed to help astronauts explore the Moon.",
    inspiration: "Inspired by NASA's Apollo Lunar Roving Vehicle."
  },
  {
    id: "sojourner",
    name: "Sojourner",
    emoji: "🤖",
    description: "A small robotic explorer designed to investigate Mars.",
    inspiration: "Inspired by NASA's first Mars rover, Sojourner."
  },
  {
    id: "spirit-opportunity",
    name: "Mars Exploration Rover",
    emoji: "🔴",
    description: "A robotic explorer built to study the surface of Mars.",
    inspiration: "Inspired by NASA's Spirit and Opportunity rovers."
  },
  {
    id: "ingenuity",
    name: "Ingenuity",
    emoji: "🚁",
    description: "A small helicopter designed to fly on Mars.",
    inspiration: "Inspired by NASA's Ingenuity Mars Helicopter."
  },
  {
    id: "voyager",
    name: "Voyager Spacecraft",
    emoji: "🛰️",
    description: "A spacecraft designed to explore the outer Solar System.",
    inspiration: "Inspired by NASA's Voyager spacecraft."
  }
];

// Available body colors
const colors = [
  { name: "Cosmic Blue", value: "#55c7ff" },
  { name: "Galaxy Purple", value: "#b58aff" },
  { name: "Rocket Red", value: "#ff7373" },
  { name: "Star Yellow", value: "#ffd76a" },
  { name: "Space Orange", value: "#ff994d" },
  { name: "Silver", value: "#c0c0c0" }
];

const wheelOptions = [
  "Small Wheels",
  "Large Wheels",
  "Robot Legs"
];

const antennaOptions = [
  "Radio Antenna",
  "Satellite Antenna",
  "No Antenna"
];

const toolOptions = [
  "Camera",
  "Drill",
  "Scientific Sensor",
  "Solar Panel"
];

const eyeOptions = [
  "Blue Eyes",
  "Green Eyes",
  "Purple Eyes"
];

export default function PetWorkshop() {
  // Access the shared application state
  const { player, startGame } = useGame();

  // Restore previously saved robot information when available
  const savedRobot = player?.robot;

  const [petName, setPetName] = useState(
    savedRobot?.name || "Luna"
  );

  const [selectedBase, setSelectedBase] = useState(
    robotBases.find((base) => base.id === savedRobot?.baseId) ||
    robotBases[0]
  );

  const [selectedColor, setSelectedColor] = useState(() => {
    const savedColor = savedRobot?.color;

    return (
      colors.find((color) =>
        color.name === (typeof savedColor === "string"
          ? savedColor
          : savedColor?.name)
      ) ||
      colors.find((color) => color.value === savedColor?.value) ||
      colors[0]
    );
  });

  const [wheelType, setWheelType] = useState(
    savedRobot?.wheelType || "Large Wheels"
  );

  const [antenna, setAntenna] = useState(
    savedRobot?.antenna || "Radio Antenna"
  );

  const [tool, setTool] = useState(
    savedRobot?.tool || "Camera"
  );

  const [eyes, setEyes] = useState(
    savedRobot?.eyeColor || "Blue Eyes"
  );

  // Save the customized robot in shared player state
  const handleSaveRobot = () => {
    const newRobot = {
      id: player?.robot?.id || "pet-001",
      name: petName.trim() || "My Robo-Pal",
      baseId: selectedBase.id,
      color: selectedColor,
      accessory: {
        name: selectedBase.name,
        emoji: selectedBase.emoji
      },
      personality: "Friendly",
      bodyColor: selectedColor.name,
      wheelType: wheelType,
      antenna: antenna,
      tool: tool,
      eyeColor: eyes
    };

    startGame({
      ...player,
      robot: newRobot
    });

    alert("Your Robo-Pal has been saved!");
  };

  // Convert eye-color selection into a display color
  const eyeColorValue =
    eyes === "Blue Eyes"
      ? "#55c7ff"
      : eyes === "Green Eyes"
        ? "#50dc8c"
        : "#b58aff";

  return (
    <main className="pet-workshop">

      <header className="pet-workshop-header">
        <p>NASA ROBO PET STATION</p>
        <h1>Build Your Robo-Pal!</h1>
        <p>
          Choose your robot's design and create your own space explorer.
        </p>
      </header>

      <div className="pet-workshop-layout">

        {/* LEFT SIDE: Robot Preview */}
        <section className="pet-preview-section">
          <h2>Your Robo-Pal</h2>

          <div className="pet-preview">
            <RobotPet
              nickname={petName}
              color={selectedColor.value}
              accessory={selectedBase.emoji}
              personality="Friendly"
              wheelType={wheelType}
              antennaType={antenna}
              tool={tool}
              eyeColor={eyeColorValue}
            />
          </div>

          <div className="pet-preview-details">
            <h3>{petName || "Your Robo-Pal"}</h3>
            <p>{selectedBase.name}</p>
            <p>{selectedBase.inspiration}</p>
            <p>Body color: {selectedColor.name}</p>
            <p>Wheels / Legs: {wheelType}</p>
            <p>Antenna: {antenna}</p>
            <p>Tool: {tool}</p>
            <p>Eyes: {eyes}</p>
          </div>
        </section>

        {/* RIGHT SIDE: Customization */}
        <section className="pet-customization-section">

          <h2>1. Name Your Robo-Pal</h2>

          <input
            type="text"
            value={petName}
            onChange={(event) => setPetName(event.target.value)}
            placeholder="Enter your pet's name"
            maxLength={20}
          />

          <h2>2. Choose a Robot Base</h2>

          <div className="pet-base-options">
            {robotBases.map((base) => (
              <button
                key={base.id}
                type="button"
                className={
                  selectedBase.id === base.id
                    ? "pet-option selected"
                    : "pet-option"
                }
                onClick={() => setSelectedBase(base)}
              >
                <span>{base.emoji}</span>
                <strong>{base.name}</strong>
                <small>{base.description}</small>
              </button>
            ))}
          </div>

          <h2>3. Choose a Body Color</h2>

          <div className="pet-color-options">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={
                  selectedColor.name === color.name
                    ? "pet-color selected"
                    : "pet-color"
                }
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color)}
                aria-label={color.name}
                title={color.name}
              />
            ))}
          </div>

          <p>Selected: {selectedColor.name}</p>

          <h2>4. Choose Wheels or Legs</h2>

          <select
            value={wheelType}
            onChange={(event) => setWheelType(event.target.value)}
          >
            {wheelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <h2>5. Choose an Antenna</h2>

          <select
            value={antenna}
            onChange={(event) => setAntenna(event.target.value)}
          >
            {antennaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <h2>6. Choose a Tool</h2>

          <select
            value={tool}
            onChange={(event) => setTool(event.target.value)}
          >
            {toolOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <h2>7. Choose Eye Color</h2>

          <select
            value={eyes}
            onChange={(event) => setEyes(event.target.value)}
          >
            {eyeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* SAVE ROBOT BUTTON */}
          <button
            type="button"
            className="save-pet-button"
            onClick={handleSaveRobot}
          >
            Save My Robo-Pal
          </button>

        </section>
      </div>
    </main>
  );
}
