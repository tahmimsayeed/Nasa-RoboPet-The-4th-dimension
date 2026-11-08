
import { useEffect, useRef, useState } from "react";
import "./RobotPet.css";

export default function RobotPet({
  nickname = "",
  color = "#55c7ff",
  accessory = "📡",
  personality = "Friendly",
  baseId = "apollo-rover",
  wheelType = "Large Wheels",
  antennaType = "Radio Antenna",
  tool = "Camera",
  eyeColor = "#55c7ff",
}) {
  const personalityGreetings = {
    Friendly: [
      "Hello, best friend!",
      "You're awesome! Let's explore together!",
      "I'm happy to be your space buddy!",
    ],
    Curious: [
      "I wonder what's beyond the stars!",
      "What happens inside a black hole?",
      "Let's discover something new!",
    ],
    Brave: [
      "No space mission is too scary!",
      "I'm ready for any adventure!",
      "Let's boldly explore the galaxy!",
    ],
    Funny: [
      "Why did the robot cross the galaxy? Beep-cause!",
      "I think my circuits are ticklish!",
      "Beep boop! Did I make you smile?",
    ],
  };

  const greetings =
    personalityGreetings[personality] || personalityGreetings.Friendly;

  const [greeting, setGreeting] = useState(
    nickname ? `Hi, ${nickname}!` : "Beep boop! Your adventure awaits!"
  );
  const [isWaving, setIsWaving] = useState(false);
  const waveTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (waveTimer.current) {
        clearTimeout(waveTimer.current);
      }
    };
  }, []);

  const handleRobotClick = () => {
    const currentGreetings =
      personalityGreetings[personality] || personalityGreetings.Friendly;

    const randomGreeting =
      currentGreetings[
        Math.floor(Math.random() * currentGreetings.length)
      ];

    setGreeting(randomGreeting);
    setIsWaving(true);

    if (waveTimer.current) {
      clearTimeout(waveTimer.current);
    }

    waveTimer.current = setTimeout(() => {
      setIsWaving(false);
      waveTimer.current = null;
    }, 1000);
  };

  const toolEmojis = {
    Camera: "📷",
    Drill: "🔩",
    "Scientific Sensor": "🔬",
    "Solar Panel": "☀️",
  };

  const baseClasses = {
    "apollo-rover": "design-apollo",
    sojourner: "design-sojourner",
    "spirit-opportunity": "design-spirit",
    ingenuity: "design-ingenuity",
    voyager: "design-voyager",
  };

  const baseNames = {
    "apollo-rover": "Apollo Lunar Rover",
    sojourner: "Sojourner",
    "spirit-opportunity": "Spirit & Opportunity",
    ingenuity: "Ingenuity Helicopter",
    voyager: "Voyager Spacecraft",
  };

  const designClass = baseClasses[baseId] || "design-apollo";
  const baseName = baseNames[baseId] || "Apollo Lunar Rover";

  const antennaClass =
    antennaType === "No Antenna"
      ? "antenna-hidden"
      : antennaType === "Satellite Antenna"
        ? "antenna-satellite"
        : "antenna-radio";

  const wheelClass =
    wheelType === "Small Wheels"
      ? "wheels-small"
      : wheelType === "Robot Legs"
        ? "robot-legs"
        : "wheels-large";

  return (
    <div className="robot-pet-container">
      <div className="robot-speech">{greeting}</div>

      <div className="robot-preview-accessory">{accessory}</div>

      <div
        className={`robot-pet ${designClass} ${isWaving ? "waving" : ""}`}
        style={{
          "--robot-color": color,
          "--eye-color": eyeColor,
        }}
        role="button"
        tabIndex={0}
        aria-label={`Interact with ${nickname || "Robo-Pal"}`}
        onClick={handleRobotClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleRobotClick();
          }
        }}
      >
        <div className={`robot-antenna ${antennaClass}`}>
          <span></span>
        </div>

        <div className="robot-head">
          <div className="robot-ear left"></div>

          <div className="robot-face">
            <span className="robot-eye"></span>
            <span className="robot-eye"></span>
            <span className="robot-smile"></span>
          </div>

          <div className="robot-ear right"></div>
        </div>

        <div className="robot-body">
          <div className="robot-chest">★</div>
          <span className="robot-tool">
            {toolEmojis[tool] || "🔧"}
          </span>
        </div>

        <div className="robot-arm left"></div>
        <div className="robot-arm right"></div>

        <div className={`robot-feet ${wheelClass}`}>
          <span></span>
          <span></span>
        </div>
      </div>

      <p className="robot-name">{nickname || "ROBO-PAL"}</p>
      <p className="robot-base-name">{baseName}</p>
      <p className="robot-hint">CLICK ME TO CHAT!</p>
    </div>
  );
}
