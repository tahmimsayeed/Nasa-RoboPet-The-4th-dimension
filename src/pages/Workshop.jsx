import { useState } from "react";
import RobotPet from "../components/RobotPet";
import PixelButton from "../components/PixelButton";

const robotColors = [
  { name: "Cosmic Blue", value: "#55c7ff" },
  { name: "Galaxy Purple", value: "#b58aff" },
  { name: "Rocket Red", value: "#ff7373" },
  { name: "Star Yellow", value: "#ffd76a" },
];

const accessories = [
  { name: "Antenna", emoji: "📡" },
  { name: "Star", emoji: "⭐" },
  { name: "Planet", emoji: "🪐" },
  { name: "Rocket", emoji: "🚀" },
];

const personalities = [
  "Friendly",
  "Curious",
  "Brave",
  "Funny",
];

export default function Workshop({ player, onComplete }) {
  const [selectedColor, setSelectedColor] = useState(robotColors[0]);
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0]);
  const [selectedPersonality, setSelectedPersonality] =
    useState("Friendly");

  const saveRobot = () => {
    onComplete({
      ...player,
      robot: {
        color: selectedColor,
        accessory: selectedAccessory,
        personality: selectedPersonality,
      },
    });
  };

  return (
    <main className="welcome-screen">
      <section className="welcome-card workshop-card">
        <p className="welcome-label">NASA ROBO PET WORKSHOP</p>

        <h1>Build Your Robo-Pal!</h1>

        <p className="welcome-description">
          Choose your robot's color, accessory, and personality.
        </p>
       <RobotPet
          color={selectedColor.value}
          accessory={selectedAccessory.emoji}
          personality={selectedPersonality}
       />

        <h2>1. Choose a Color</h2>

        <div className="workshop-options">
          {robotColors.map((color) => (
            <button
              key={color.name}
              className="workshop-choice"
              style={{
                borderColor: color.value,
                backgroundColor: selectedColor.name === color.name
                  ? color.value
                  : "transparent",
              }}
              onClick={() => setSelectedColor(color)}
              aria-pressed={selectedColor.name === color.name}
            >
              {color.name}
            </button>
          ))}
        </div>

        <h2>2. Choose an Accessory</h2>

        <div className="workshop-options">
          {accessories.map((accessory) => (
            <button
              key={accessory.name}
              className="workshop-choice"
              onClick={() => setSelectedAccessory(accessory)}
              aria-pressed={
                selectedAccessory.name === accessory.name
              }
            >
              {accessory.emoji} {accessory.name}
            </button>
          ))}
        </div>

        <h2>3. Choose a Personality</h2>

        <div className="workshop-options">
          {personalities.map((personality) => (
            <button
              key={personality}
              className="workshop-choice"
              onClick={() => setSelectedPersonality(personality)}
              aria-pressed={selectedPersonality === personality}
            >
              {personality}
            </button>
          ))}
        </div>

        <PixelButton onClick={saveRobot}>
          Save My Robo-Pal!
        </PixelButton>
      </section>
    </main>
  );
}