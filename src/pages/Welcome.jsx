import RobotPet from "../components/RobotPet";
import { containsBlockedLanguage } from "../utils/contentSafety";
import { useState } from "react";

const styles = `
/* ===== FULL SCREEN SPACE LOGIN ===== */

.rps-welcome {
  --cyan: #63e5ff;
  --pink: #ff91d2;
  --gold: #ffdf88;

  position: relative !important;
  isolation: isolate;
  width: 100% !important;
  max-width: none !important;
  min-height: 100vh !important;
  min-height: 100svh !important;
  margin: 0 !important;
  padding: 35px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  background:
    radial-gradient(ellipse at 18% 50%, #30265d 0%, transparent 42%),
    linear-gradient(115deg, #10132f, #171638 55%, #101c3c) !important;
  color: white;
}

.rps-welcome * {
  box-sizing: border-box;
}

/* SIMPLE BACKGROUND */

.rps-space {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.rps-stars {
  position: absolute;
  inset: 0;
  opacity: .35;
  background-image:
    radial-gradient(2px 2px at 20% 30%, white 98%, transparent),
    radial-gradient(2px 2px at 70% 70%, #8deaff 98%, transparent),
    radial-gradient(2px 2px at 45% 85%, white 98%, transparent);
  background-size: 180px 170px, 240px 210px, 200px 190px;
}

.rps-planet {
  position: absolute;
  border-radius: 50%;
  animation: rpsFloat 10s ease-in-out infinite;
}

.rps-planet-a {
  width: 105px;
  height: 105px;
  left: 5%;
  top: 15%;
  background: radial-gradient(circle at 30% 30%, #ffb9ed, #a34cb6 65%, #502b80);
  box-shadow: 0 0 35px #c46bea44;
}

.rps-planet-a::after {
  content: "";
  position: absolute;
  width: 145%;
  height: 35%;
  left: -22%;
  top: 35%;
  border: 5px solid #f1b8fa;
  border-radius: 50%;
  transform: rotate(-23deg);
}

.rps-planet-b {
  width: 68px;
  height: 68px;
  right: 8%;
  top: 18%;
  background: radial-gradient(circle at 30% 30%, #d0ffff, #318ad8 65%, #29418c);
  box-shadow: 0 0 30px #55caff55;
  animation-delay: -4s;
}

.rps-planet-c {
  width: 45px;
  height: 45px;
  right: 18%;
  bottom: 12%;
  background: radial-gradient(circle at 30% 30%, #fff2b0, #ed9b4b 70%, #a74c68);
  box-shadow: 0 0 25px #ffbf6555;
  animation-delay: -7s;
}

.rps-satellite {
  position: absolute;
  display: flex;
  align-items: center;
  width: 230px;
  height: 110px;
  filter: drop-shadow(0 5px 15px #0008);
  animation: rpsSatellite 17s ease-in-out infinite;
}

.rps-satellite-left {
  left: 9%;
  bottom: 17%;
}

.rps-satellite-right {
  right: 7%;
  top: 49%;
  transform: scale(1.2);
  animation-delay: -9s;
  animation-duration: 21s;
}

.rps-solar {
  width: 77px;
  height: 68px;
  border: 3px solid #a6ddff;
  background:
    repeating-linear-gradient(
      90deg,
      #2853a2 0 12px,
      #6b9ce3 13px 15px
    );
}

.rps-satellite-core {
  position: relative;
  width: 65px;
  height: 63px;
  flex-shrink: 0;
  border: 3px solid #e5e1ff;
  border-radius: 10px;
  background: linear-gradient(140deg, #ffe19a, #a37bd2);
  z-index: 1;
}

.rps-satellite-core::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #66eaff;
  left: 22px;
  top: 21px;
  box-shadow: 0 0 15px #66eaff;
}

.rps-mini-star {
  position: absolute;
  color: #ffe49a;
  font-size: 30px;
  animation: rpsFloat 7s ease-in-out infinite;
}

.rps-star-a {
  top: 15%;
  left: 42%;
}

.rps-star-b {
  bottom: 13%;
  left: 40%;
  color: #83eaff;
}

/* MAIN TWO-COLUMN LAYOUT */

.rps-layout {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1020px;
  min-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 35px;
}

/* ROBOT SIDE */

.rps-character {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 15px;
  min-width: 0;
}

.rps-brand {
  color: var(--gold);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 4px;
  margin-bottom: 20px;
}

.rps-robot {
  width: 100%;
  max-width: 390px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.rps-robot > * {
  max-width: 100%;
}

.rps-character-name {
  margin-top: 10px;
  color: var(--cyan);
  font-weight: 900;
  letter-spacing: 4px;
  font-size: 15px;
}

.rps-character-description {
  color: #d0c9f0;
  font-size: 14px;
  margin-top: 7px;
}

.rps-speech {
  position: relative;
  display: inline-block;
  padding: 13px 22px;
  margin-bottom: 13px;
  border: 2px solid var(--cyan);
  border-radius: 16px;
  background: #25234d;
  color: white;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 5px 20px #0004;
}

.rps-speech::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 17px;
  height: 17px;
  background: #25234d;
  border-right: 2px solid var(--cyan);
  border-bottom: 2px solid var(--cyan);
  transform: translateX(-50%) rotate(45deg);
}

/* LOGIN CARD */

.rps-login {
  width: 100%;
  max-width: 440px;
  justify-self: center;
  padding: 29px 30px;
  border: 1px solid #7777c5;
  border-radius: 23px;
  background: linear-gradient(145deg, #282750ee, #191a3bee);
  box-shadow:
    0 18px 55px #0006,
    0 0 30px #927aff16,
    inset 0 1px 0 #ffffff20;
  backdrop-filter: blur(12px);
}

.rps-login-header {
  margin-bottom: 22px;
}

.rps-login-header .rps-eyebrow {
  color: var(--cyan);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 3px;
  margin-bottom: 9px;
}

.rps-login-header h1 {
  color: #fff0ad;
  font-size: 31px;
  line-height: 1.2;
  margin: 0 0 10px;
}

.rps-login-header p {
  color: #d1d4f0;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* INPUTS */

.rps-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rps-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.rps-field label {
  color: #fff0c5;
  font-size: 14px;
  font-weight: 800;
}

.rps-field label span {
  color: #a9afd1;
  font-weight: 400;
}

.rps-field input {
  width: 100%;
  min-height: 46px;
  padding: 12px 14px;
  border: 1px solid #7777ae;
  border-radius: 10px;
  outline: none;
  background: #11142f;
  color: white;
  font-size: 15px;
}

.rps-field input::placeholder {
  color: #969abb;
}

.rps-field input:focus {
  border-color: var(--cyan);
  box-shadow: 0 0 0 3px #63e5ff20;
}

.rps-field small {
  color: #aeb9dc;
  font-size: 12px;
  line-height: 1.5;
}

/* START BUTTON */

.rps-start {
  width: 100%;
  min-height: 49px;
  margin-top: 3px;
  border: 0;
  border-radius: 11px;
  background: linear-gradient(100deg, #b34f9f, #e56caa, #9865db);
  color: white;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 5px 20px #d45d9c44;
  transition: transform .2s, filter .2s;
}

.rps-start:hover:not(:disabled) {
  transform: translateY(-3px);
  filter: brightness(1.15);
}

.rps-start:disabled {
  opacity: .5;
  cursor: not-allowed;
}

/* RETURNING PLAYERS */

.rps-returning {
  margin-top: 21px;
  padding-top: 17px;
  border-top: 1px solid #555580;
}

.rps-returning h2 {
  color: var(--gold);
  font-size: 16px;
  margin: 0 0 6px;
}

.rps-returning > p {
  color: #c7cbea;
  font-size: 13px;
  margin: 0 0 11px;
}

.rps-player-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 130px;
  overflow-y: auto;
}

.rps-player-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #66699d;
  border-radius: 9px;
  background: #25274d;
  color: white;
  cursor: pointer;
  text-align: left;
  font-size: 11px;
}

.rps-player-button:hover {
  border-color: var(--cyan);
  background: #34365f;
}

.rps-player-button small {
  color: #9feaff;
}

.rps-error {
  color: #ffb3c8;
  font-size: 12px;
  margin-top: 12px;
}

.rps-tip {
  text-align: center;
  color: #b6c0e2;
  font-size: 10px;
  margin: 18px 0 0;
}

/* ANIMATIONS */

@keyframes rpsFloat {
  0%, 100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -22px;
  }
}

@keyframes rpsSatellite {
  0%, 100% {
    transform: translate(0, 0) rotate(-8deg);
  }
  25% {
    transform: translate(25px, -18px) rotate(5deg);
  }
  50% {
    transform: translate(10px, 18px) rotate(10deg);
  }
  75% {
    transform: translate(-18px, 8px) rotate(-4deg);
  }
}

/* TABLET */

@media (max-width: 800px) {
  .rps-welcome {
    padding: 25px 18px !important;
  }

  .rps-layout {
    gap: 15px;
  }

  .rps-login {
    padding: 24px 20px;
  }

  .rps-login-header h1 {
    font-size: 24px;
  }

  .rps-robot {
    max-width: 300px;
  }

  .rps-satellite {
    scale: .75;
  }
}

/* MOBILE */

@media (max-width: 600px) {
  .rps-welcome {
    padding: 22px 15px 35px !important;
    align-items: flex-start;
  }

  .rps-layout {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 440px;
    margin: auto;
  }

  .rps-character {
    padding: 0;
  }

  .rps-brand {
    margin-bottom: 8px;
    font-size: 11px;
  }

  .rps-speech {
    padding: 9px 17px;
    font-size: 11px;
    margin-bottom: 8px;
  }

  .rps-robot {
    max-width: 190px;
  }

  .rps-character-name {
    font-size: 12px;
    margin-top: 0;
  }

  .rps-character-description {
    margin: 4px 0;
    font-size: 10px;
  }

  .rps-login {
    padding: 22px 19px;
    border-radius: 17px;
  }

  .rps-login-header {
    margin-bottom: 15px;
  }

  .rps-login-header h1 {
    font-size: 25px;
  }

  .rps-satellite {
    scale: .48;
    opacity: .7;
  }

  .rps-satellite-left {
    left: -90px;
    bottom: 15%;
  }

  .rps-satellite-right {
    right: -100px;
    top: 35%;
  }

  .rps-planet-a {
    left: -40px;
    top: 10%;
    scale: .6;
  }

  .rps-planet-b {
    right: -25px;
    top: 42%;
    scale: .7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rps-welcome *,
  .rps-welcome *::before,
  .rps-welcome *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;

export default function Welcome({
  onStart,
  savedPlayers = [],
  onSelectPlayer,
}) {
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
    <>
      <style>{styles}</style>

      <main className="rps-welcome">

        {/* Background decorations */}
        <div className="rps-space" aria-hidden="true">
          <div className="rps-stars" />

          <div className="rps-planet rps-planet-a" />
          <div className="rps-planet rps-planet-b" />
          <div className="rps-planet rps-planet-c" />

          <div className="rps-satellite rps-satellite-left">
            <div className="rps-solar" />
            <div className="rps-satellite-core" />
            <div className="rps-solar" />
          </div>

          <div className="rps-satellite rps-satellite-right">
            <div className="rps-solar" />
            <div className="rps-satellite-core" />
            <div className="rps-solar" />
          </div>

          <div className="rps-mini-star rps-star-a">✦</div>
          <div className="rps-mini-star rps-star-b">✧</div>
        </div>

        <div className="rps-layout">

          {/* LEFT: ROBOT */}
          <section className="rps-character">

            <div className="rps-brand">
              ✦ NASA ROBO PET STATION ✦
            </div>

            <div className="rps-speech">
              Hi, Space Explorer! Ready for an adventure?
            </div>

            <div className="rps-robot">
              <RobotPet nickname={nickname} />
            </div>

            <div className="rps-character-name">
              LUNA
            </div>

            <p className="rps-character-description">
              Your robotic friend and space adventure companion!
            </p>

          </section>

          {/* RIGHT: LOGIN */}
          <section className="rps-login">

            <header className="rps-login-header">
              <div className="rps-eyebrow">
                🚀 YOUR MISSION STARTS HERE
              </div>

              <h1>Welcome, Explorer!</h1>

              <p>
                Create your explorer identity and get ready to
                discover amazing NASA missions with your Robo-Pet.
              </p>
            </header>

            <form className="rps-form" onSubmit={handleSubmit}>

              <div className="rps-field">
                <label htmlFor="nickname">
                  Explorer nickname
                </label>

                <input
                  id="nickname"
                  type="text"
                  placeholder="What should we call you?"
                  value={nickname}
                  onChange={(event) => {
                    setNickname(event.target.value);
                    setError("");
                  }}
                  maxLength={20}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="rps-field">
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

                <small>
                  Class codes are stored only in this browser and
                  are not checked by a school server.
                </small>
              </div>

              <button
                className="rps-start"
                type="submit"
                disabled={!nickname.trim()}
              >
                🚀 START MY ADVENTURE!
              </button>

            </form>

            {savedPlayers.length > 0 && (
              <section className="rps-returning">
                <h2>🌟 Returning Explorer?</h2>

                <p>Continue a previous adventure.</p>

                <div className="rps-player-list">
                  {savedPlayers.map((savedPlayer) => (
                    <button
                      type="button"
                      className="rps-player-button"
                      key={savedPlayer.playerId}
                      onClick={() =>
                        onSelectPlayer?.(savedPlayer.playerId)
                      }
                    >
                      <span>
                        🚀 {savedPlayer.nickname || "Space Explorer"}
                      </span>

                      <small>
                        {savedPlayer.completedMissions?.length || 0}/3
                        missions
                      </small>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {error && (
              <p className="rps-error" role="alert">
                {error}
              </p>
            )}

            <p className="rps-tip">
              ✨ Tip: Use a nickname instead of your real name!
            </p>

          </section>

        </div>
      </main>
    </>
  );
}