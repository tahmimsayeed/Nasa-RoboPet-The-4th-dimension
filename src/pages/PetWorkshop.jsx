
import { useState } from "react";
import RobotPet from "../components/RobotPet";
import { useGame } from "../context/GameContext";
import "../styles/PetWorkshop.css";

// Five NASA-inspired robot bases
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

// Six body colors
const colors = [
  { name: "Cosmic Blue", value: "#55c7ff" },
  { name: "Galaxy Purple", value: "#b58aff" },
  { name: "Rocket Red", value: "#ff7373" },
  { name: "Star Yellow", value: "#ffd76a" },
  { name: "Space Orange", value: "#ff994d" },
  { name: "Silver", value: "#c0c0c0" }
];

// Four independent accessories
const accessoryOptions = [
  { name: "Antenna", emoji: "📡" },
  { name: "Star", emoji: "⭐" },
  { name: "Planet", emoji: "🪐" },
  { name: "Rocket", emoji: "🚀" }
];

// Four personalities
const personalityOptions = [
  "Friendly",
  "Curious",
  "Brave",
  "Funny"
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
  { name: "Blue Eyes", value: "#55c7ff" },
  { name: "Green Eyes", value: "#50dc8c" },
  { name: "Purple Eyes", value: "#b58aff" }
];

export default function PetWorkshop() {
  const { player, startGame } = useGame();

  const savedRobot = player?.robot;

  // Restore previously saved customization
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
        color.name === (
          typeof savedColor === "string"
            ? savedColor
            : savedColor?.name
        )
      ) ||
      colors.find((color) => color.value === savedColor?.value) ||
      colors[0]
    );
  });

  const [selectedAccessory, setSelectedAccessory] = useState(() => {
    const savedAccessory = savedRobot?.accessory;

    return (
      accessoryOptions.find((item) =>
        item.name === savedAccessory?.name
      ) ||
      accessoryOptions.find((item) =>
        item.emoji === savedAccessory?.emoji
      ) ||
      accessoryOptions[0]
    );
  });

  const [personality, setPersonality] = useState(
    personalityOptions.includes(savedRobot?.personality)
      ? savedRobot.personality
      : "Friendly"
  );

  const [wheelType, setWheelType] = useState(
    savedRobot?.wheelType || "Large Wheels"
  );

  const [antenna, setAntenna] = useState(
    savedRobot?.antenna || "Radio Antenna"
  );

  const [tool, setTool] = useState(
    savedRobot?.tool || "Camera"
  );

  const [eyeColor, setEyeColor] = useState(() => {
    const savedEyeColor = savedRobot?.eyeColor;

    return (
      eyeOptions.find((eye) => eye.value === savedEyeColor)?.value ||
      eyeOptions.find((eye) => eye.name === savedEyeColor)?.value ||
      eyeOptions[0].value
    );
  });

  // Save every customization in the shared player object
  const handleSaveRobot = () => {
    const newRobot = {
      id: player?.robot?.id || "pet-001",
      name: petName.trim() || "My Robo-Pal",
      baseId: selectedBase.id,
      color: selectedColor,
      accessory: selectedAccessory,
      personality,
      wheelType,
      antenna,
      tool,
      eyeColor
    };

    startGame({
      ...player,
      robot: newRobot
    });

    alert("Your Robo-Pal has been saved!");
  };

  const selectedEyeName =
    eyeOptions.find((eye) => eye.value === eyeColor)?.name || "Blue Eyes";

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

        {/* LEFT SIDE: LIVE ROBOT PREVIEW */}
        <section className="pet-preview-section">
          <h2>Your Robo-Pal</h2>

          <div className="pet-preview">
            <RobotPet
              nickname={petName}
              color={selectedColor.value}
              accessory={selectedAccessory.emoji}
              personality={personality}
              baseId={selectedBase.id}
              wheelType={wheelType}
              antennaType={antenna}
              tool={tool}
              eyeColor={eyeColor}
            />
          </div>

          <div className="pet-preview-details">
            <h3>{petName || "Your Robo-Pal"}</h3>
            <p>{selectedBase.name}</p>
            <p>{selectedBase.inspiration}</p>
            <p>Accessory: {selectedAccessory.name}</p>
            <p>Personality: {personality}</p>
            <p>Body color: {selectedColor.name}</p>
            <p>Wheels / Legs: {wheelType}</p>
            <p>Antenna: {antenna}</p>
            <p>Tool: {tool}</p>
            <p>Eyes: {selectedEyeName}</p>
          </div>
        </section>

        {/* RIGHT SIDE: CUSTOMIZATION */}
        <section className="pet-customization-section">

          <h2>1. Name Your Robo-Pal</h2>

          <input
            type="text"
            value={petName}
            onChange={(event) => setPetName(event.target.value)}
            placeholder="Enter your pet's name"
            maxLength={20}
          />

          {/* ROBOT BASE */}
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
                aria-pressed={selectedBase.id === base.id}
                onClick={() => setSelectedBase(base)}
              >
                <span>{base.emoji}</span>
                <strong>{base.name}</strong>
                <small>{base.description}</small>
              </button>
            ))}
          </div>

          {/* BODY COLOR */}
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
                aria-label={color.name}
                aria-pressed={selectedColor.name === color.name}
                title={color.name}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <p>Selected: {selectedColor.name}</p>

          {/* INDEPENDENT ACCESSORY */}
          <h2>4. Choose an Accessory</h2>

          <div className="pet-accessory-options">
            {accessoryOptions.map((accessory) => (
              <button
                key={accessory.name}
                type="button"
                className={
                  selectedAccessory.name === accessory.name
                    ? "pet-accessory-option selected"
                    : "pet-accessory-option"
                }
                aria-pressed={
                  selectedAccessory.name === accessory.name
                }
                onClick={() => setSelectedAccessory(accessory)}
              >
                <span>{accessory.emoji}</span>
                <strong>{accessory.name}</strong>
              </button>
            ))}
          </div>

          {/* PERSONALITY */}
          <h2>5. Choose a Personality</h2>

          <div className="pet-personality-options">
            {personalityOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  personality === option
                    ? "pet-personality-option selected"
                    : "pet-personality-option"
                }
                aria-pressed={personality === option}
                onClick={() => setPersonality(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* WHEELS OR LEGS */}
          <h2>6. Choose Wheels or Legs</h2>

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

          {/* ANTENNA */}
          <h2>7. Choose an Antenna Type</h2>

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

          {/* TOOL */}
          <h2>8. Choose a Tool</h2>

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

          {/* EYE COLOR */}
          <h2>9. Choose Eye Color</h2>

          <div className="pet-eye-options">
            {eyeOptions.map((eye) => (
              <button
                key={eye.name}
                type="button"
                className={
                  eyeColor === eye.value
                    ? "pet-eye-option selected"
                    : "pet-eye-option"
                }
                aria-pressed={eyeColor === eye.value}
                onClick={() => setEyeColor(eye.value)}
              >
                <span
                  className="pet-eye-swatch"
                  style={{ backgroundColor: eye.value }}
                />
                {eye.name}
              </button>
            ))}
          </div>

          {/* SAVE BUTTON */}
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
