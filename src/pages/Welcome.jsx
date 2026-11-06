
import RobotPet from "../components/RobotPet";
import { useState } from "react";

export default function Welcome({ onStart }) {
  const [nickname, setNickname] = useState("");
  const [classCode, setClassCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerNickname = nickname.trim();

    if (!playerNickname) return;

    onStart?.({
      nickname: playerNickname,
      classCode: classCode.trim(),
    });
  };

  return (
    <main className="welcome-screen">
      <section className="welcome-card">
        <RobotPet nickname={nickname} />
        <p className="welcome-label">NASA ROBO PET STATION</p>

        <h1>Welcome, Space Explorer!</h1>

        <p className="welcome-description">
          Your space adventure is about to begin.
          Create your explorer identity and meet your robotic pet!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickname">Choose your nickname</label>

            <input
              id="nickname"
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              maxLength={20}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="classCode">
              Class code <span>(Optional)</span>
            </label>

            <input
              id="classCode"
              type="text"
              placeholder="Enter your class code"
              value={classCode}
              onChange={(event) => setClassCode(event.target.value)}
            />
          </div>

          <button type="submit" disabled={!nickname.trim()}>
            Start My Adventure!
          </button>
        </form>

        <p className="welcome-note">
          Explorer tip: Use a nickname instead of your real name!
        </p>
      </section>
    </main>
  );
}
