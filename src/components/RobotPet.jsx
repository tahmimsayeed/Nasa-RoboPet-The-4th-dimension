import { useEffect, useRef, useState } from "react";
import "./RobotPet.css";

const PERSONALITY_GREETINGS = {
  Friendly: ["Hello, best friend!", "You're awesome! Let's explore together!", "I'm happy to be your space buddy!"],
  Curious: ["I wonder what's beyond the stars!", "What happens inside a black hole?", "Let's discover something new!"],
  Brave: ["No space mission is too scary!", "I'm ready for any adventure!", "Let's boldly explore the galaxy!"],
  Funny: ["Why did the robot cross the galaxy? Beep-cause!", "I think my circuits are ticklish!", "Beep boop! Did I make you smile?"],
};

const BASES = {
  "apollo-rover": { name: "Apollo Lunar Rover", wheels: 4, className: "rp-apollo", bodyWidth: 154, chassisWidth: 184 },
  sojourner: { name: "Sojourner", wheels: 6, className: "rp-sojourner", bodyWidth: 116, chassisWidth: 164 },
  "spirit-opportunity": { name: "Mars Exploration Rover", wheels: 6, className: "rp-spirit", bodyWidth: 132, chassisWidth: 180 },
  ingenuity: { name: "Ingenuity Mars Helicopter", wheels: 0, className: "rp-ingenuity", bodyWidth: 108, chassisWidth: 0 },
  voyager: { name: "Voyager Spacecraft", wheels: 0, className: "rp-voyager", bodyWidth: 120, chassisWidth: 0 },
};

const TOOL_EMOJIS = {
  Camera: "📷",
  Drill: "🔩",
  "Scientific Sensor": "🔬",
  "Solar Panel": "☀️",
};

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
  const [greeting, setGreeting] = useState(nickname ? `Hi, ${nickname}!` : "Beep boop! Your adventure awaits!");
  const [isWaving, setIsWaving] = useState(false);
  const waveTimer = useRef(null);

  useEffect(() => {
    setGreeting(nickname ? `Hi, ${nickname}!` : "Beep boop! Your adventure awaits!");
  }, [nickname]);

  useEffect(() => () => {
    if (waveTimer.current) window.clearTimeout(waveTimer.current);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const base = BASES[baseId] || BASES["apollo-rover"];
  const greetings = PERSONALITY_GREETINGS[personality] || PERSONALITY_GREETINGS.Friendly;
  const isRover = base.wheels > 0;
  const useLegs = wheelType === "Robot Legs" && isRover;
  const wheelSize = wheelType === "Small Wheels" ? "22px" : "31px";
  const antennaMode = antennaType === "No Antenna" ? "none" : antennaType === "Satellite Antenna" ? "satellite" : "radio";

  const handleRobotClick = () => {
    const message = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(message);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
    setIsWaving(true);
    if (waveTimer.current) window.clearTimeout(waveTimer.current);
    waveTimer.current = window.setTimeout(() => {
      setIsWaving(false);
      waveTimer.current = null;
    }, 1000);
  };

  const renderRunningGear = () => {
    if (useLegs) {
      return (
        <div className="rp-leg-set" aria-label="Robot legs">
          <span className="rp-leg rp-left-leg"><i /></span>
          <span className="rp-leg rp-right-leg"><i /></span>
        </div>
      );
    }
    return (
      <div className={`rp-wheel-row ${wheelType === "Small Wheels" ? "rp-small-wheels" : "rp-large-wheels"}`} style={{ "--rp-wheel-count": base.wheels, "--rp-wheel-size": wheelSize }} aria-label={`${base.wheels} rover wheels`}>
        {Array.from({ length: base.wheels }, (_, index) => <span className="rp-wheel" key={index}><i /></span>)}
      </div>
    );
  };

  return (
    <div className="robot-pet-container rp-container">
      <div className="robot-speech rp-speech" aria-live="polite">{greeting}</div>
      <div className="robot-preview-accessory rp-floating-accessory" aria-hidden="true">{accessory}</div>

      <div
        className={`robot-pet rp-robot ${base.className} ${isWaving ? "rp-waving" : ""}`}
        style={{ "--rp-color": color, "--rp-eye-color": eyeColor, "--rp-body-width": `${base.bodyWidth}px`, "--rp-chassis-width": `${base.chassisWidth}px`, "--rp-wheel-size": wheelSize, "--rp-antenna-mode": antennaMode }}
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
        {/* Each NASA-inspired base has its own recognisable upper hardware. */}
        {baseId === "apollo-rover" && <div className="rp-apollo-mast" aria-hidden="true"><span /><i /><b /></div>}
        {baseId === "sojourner" && <div className="rp-sojourner-mast" aria-hidden="true"><span /><i /></div>}
        {baseId === "spirit-opportunity" && <div className="rp-spirit-mast" aria-hidden="true"><span /><i /><b /></div>}
        {baseId === "ingenuity" && <div className="rp-helicopter-rotor" aria-hidden="true"><span /><i /></div>}
        {baseId === "voyager" && <div className="rp-voyager-dish" aria-hidden="true"><span /></div>}

        <div className="rp-head-assembly">
          <div className="rp-neck" />
          <div className="rp-head">
            <span className="rp-ear rp-ear-left" />
            <div className="rp-face"><i /><i /><b /></div>
            <span className="rp-ear rp-ear-right" />
          </div>
        </div>

        <div className="rp-upper-frame">
          <span className="rp-shoulder rp-shoulder-left" />
          <span className="rp-shoulder rp-shoulder-right" />
          <span className="rp-arm rp-arm-left"><i /></span>
          <span className="rp-arm rp-arm-right"><i /></span>
          <div className="rp-body">
            <span className="rp-panel rp-panel-left" />
            <span className="rp-panel rp-panel-right" />
            <span className="rp-chest-star">★</span>
            <span className="rp-tool" aria-label={`Tool: ${tool}`}>{TOOL_EMOJIS[tool] || "🔧"}</span>
            {baseId === "apollo-rover" && <span className="rp-apollo-detail" />}
            {baseId === "sojourner" && <span className="rp-sojourner-detail" />}
            {baseId === "spirit-opportunity" && <span className="rp-spirit-detail"><i /><i /><i /></span>}
            {baseId === "ingenuity" && <span className="rp-ingenuity-detail" />}
            {baseId === "voyager" && <span className="rp-voyager-boom" />}
          </div>
        </div>

        {baseId === "ingenuity" ? (
          <div className="rp-landing-gear" aria-label="Four helicopter landing legs"><span /><span /><span /><span /></div>
        ) : baseId === "voyager" ? (
          <div className="rp-voyager-panels" aria-hidden="true"><span /><span /></div>
        ) : (
          <>
            <div className="rp-chassis" aria-hidden="true"><span /><span /><span /></div>
            {renderRunningGear()}
          </>
        )}
      </div>

      <p className="robot-name rp-name">{nickname || "ROBO-PAL"}</p>
      <p className="robot-base-name rp-base-name">{base.name}</p>
      <p className="robot-hint rp-hint">CLICK ME FOR A NEW MESSAGE!</p>
    </div>
  );
}
