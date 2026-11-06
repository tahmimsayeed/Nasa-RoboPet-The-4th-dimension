
import { useState } from "react";

export default function RobotPet({ nickname = "" }) {
  const [greeting, setGreeting] = useState(
    nickname
      ? `Hi, ${nickname}! Ready for space?`
      : "Beep boop! Your adventure awaits!"
  );

  const [isWaving, setIsWaving] = useState(false);

  const greetings = [
    "Beep boop! You're awesome!",
    "Let's explore the galaxy!",
    "I am your space buddy!",
    "Ready for an amazing adventure?",
    "To infinity and beyond!"
  ];

  const handleRobotClick = () => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    setGreeting(randomGreeting);
    setIsWaving(true);

    setTimeout(() => {
      setIsWaving(false);
    }, 1000);
  };

  return (
    <div className="robot-pet-container">
      <div className="robot-speech">
        {greeting}
      </div>

      <div
        className={`robot-pet ${isWaving ? "waving" : ""}`}
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
        <div className="robot-antenna">
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
        </div>

        <div className="robot-arm left"></div>
        <div className="robot-arm right"></div>

        <div className="robot-feet">
          <span></span>
          <span></span>
        </div>
      </div>

      <p className="robot-name">ROBO-PAL</p>
      <p className="robot-hint">CLICK ME TO CHAT!</p>
    </div>
  );
}
