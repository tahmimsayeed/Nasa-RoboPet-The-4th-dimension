
import RobotPet from "../components/RobotPet";
import { containsBlockedLanguage } from "../utils/contentSafety";
import { useState } from "react";

export default function Welcome({ onStart, savedPlayers = [], onSelectPlayer }) {
  const [nickname, setNickname] = useState("");
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerNickname = nickname.trim();

    if (!playerNickname) return;
    if (containsBlockedLanguage(playerNickname)) {
      setError("Please choose a kind, classroom-friendly nickname.");
      return;
    }

    setError("");
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
              autoComplete="off"
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
              maxLength={24}
              autoComplete="off"
            />
            <small className="class-code-note">
              Class codes are saved only in this browser and are not checked by a school server.
            </small>
          </div>

          <button type="submit" disabled={!nickname.trim()}>
            Start My Adventure!
          </button>
        </form>

        {savedPlayers.length > 0 && (
          <section className="saved-explorers" aria-labelledby="saved-explorers-title">
            <h2 id="saved-explorers-title">Returning Explorer?</h2>
            <p>Continue a previous adventure without losing its progress.</p>
            <div className="saved-explorer-list">
              {savedPlayers.map((savedPlayer) => (
                <button
                  type="button"
                  className="saved-explorer-button"
                  key={savedPlayer.playerId}
                  onClick={() => onSelectPlayer?.(savedPlayer.playerId)}
                >
                  <span>🚀 {savedPlayer.nickname || "Space Explorer"}</span>
                  <small>
                    {savedPlayer.completedMissions?.length || 0}/3 missions completed
                  </small>
                </button>
              ))}
            </div>
          </section>
        )}

        {error && <p className="creative-error" role="alert">{error}</p>}

        <p className="welcome-note">
          Explorer tip: Use a nickname instead of your real name!
        </p>
      </section>
    </main>
  );
}
