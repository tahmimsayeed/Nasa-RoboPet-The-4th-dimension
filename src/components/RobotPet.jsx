import { useEffect, useState } from "react";

export default function RobotPet({
  nickname = "",
  color = "#55c7ff",
  accessory = "📡",
  personality = "Friendly",
}) {
  const [greeting, setGreeting] = useState(
    nickname
      ? `Hi, ${nickname}!`
      : "Beep boop! Your adventure awaits!"
  );

  const [isWaving, setIsWaving] = useState(false);

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
useEffect(() => {
  const greetings = personalityGreetings[personality];
  setGreeting(greetings[0]);
}, [personality]);

  const handleRobotClick = () => {
    const greetings = personalityGreetings[personality];

    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    setGreeting(randomGreeting);
    setIsWaving(true);

    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <div className="robot-pet-container">
      <div className="robot-speech">{greeting}</div>

      <div className="robot-preview-accessory">{accessory}</div>

      <div
        className={`robot-pet ${isWaving ? "waving" : ""}`}
        style={{ "--robot-color": color }}
        role="button"
        tabIndex={0}
        aria-label="Click Robo-Pal to interact"
        onClick={handleRobotClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleRobotClick();
          }
        }}
      >
        <div className="robot-antenna"><span></span></div>
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
        </div>
        <div className="robot-arm left"></div>
        <div className="robot-arm right"></div>
        <div className="robot-feet"><span></span><span></span></div>
      </div>

      <p className="robot-name">ROBO-PAL</p>
      <p className="robot-hint">CLICK ME TO CHAT!</p>
    </div>
  );
}