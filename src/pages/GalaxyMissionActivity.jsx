import { useState } from "react";
import PixelButton from "../components/PixelButton";
import RobotPet from "../components/RobotPet";

const questions = [
  {
    question: "What is a galaxy?",
    options: [
      "A single planet",
      "A huge collection of stars, gas, and dust",
      "A type of rocket",
      "A small moon",
    ],
    answer: "A huge collection of stars, gas, and dust",
    fact: "Galaxies contain billions or even trillions of stars, along with gas and dust!",
  },
  {
    question: "What galaxy contains our Solar System?",
    options: [
      "Andromeda Galaxy",
      "Milky Way Galaxy",
      "Whirlpool Galaxy",
      "Sombrero Galaxy",
    ],
    answer: "Milky Way Galaxy",
    fact: "Our Solar System is located inside the Milky Way Galaxy.",
  },
  {
    question: "What is a black hole?",
    options: [
      "A hole in space you can fall through",
      "A region with extremely strong gravity",
      "A dark-colored planet",
      "A type of starship",
    ],
    answer: "A region with extremely strong gravity",
    fact: "A black hole has gravity so strong that objects must move extremely fast to escape from it.",
  },
];

export default function GalaxyMissionActivity({
  player,
  onBack,
  onComplete,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }

    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  return (
    <main className="welcome-screen">
      <section className="welcome-card">
        <p className="welcome-label">GALAXY GUARDIAN MISSION</p>

        {completed ? (
          <>
            <h1>Mission Complete! 🌌</h1>

            <p className="welcome-description">
              Congratulations, {player.nickname}!
            </p>

            <RobotPet
              nickname={player.nickname}
              color={player.robot.color.value}
              accessory={player.robot.accessory.emoji}
              personality={player.robot.personality}
            />

            <h2>
              {score === questions.length
                ? "Amazing work, Galaxy Guardian! ⭐"
                : score >= 2
                ? "Fantastic effort, Galaxy Guardian! 🚀"
                : "Keep exploring the universe, Space Explorer! 💫"}
            </h2>

            <p className="welcome-description">
              You answered {score} out of {questions.length} questions correctly!
            </p>

            <h2>
              Mission Score: {score}/{questions.length}
            </h2>

            <PixelButton
              onClick={() => {
                onComplete(score);
                onBack();
              }}
            >
              Save Progress & Return
            </PixelButton>
          </>
        ) : (
          <>
            <h1>Galaxy Challenge</h1>

            <p className="welcome-description">
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <ProgressBarPlaceholder
              progress={((currentQuestion + 1) / questions.length) * 100}
            />

            <h2>{question.question}</h2>

            <div className="mission-options">
              {question.options.map((option) => (
                <button
                  key={option}
                  className="mission-option"
                  aria-pressed={selectedAnswer === option}
                  disabled={showFeedback}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="mission-feedback">
                <h3>
                  {selectedAnswer === question.answer
                    ? "Correct! ⭐"
                    : "Nice try! 🚀"}
                </h3>

                <p>{question.fact}</p>
              </div>
            )}

            {!showFeedback ? (
              <PixelButton
                onClick={checkAnswer}
                disabled={!selectedAnswer}
              >
                Check Answer
              </PixelButton>
            ) : (
              <PixelButton onClick={nextQuestion}>
                {currentQuestion === questions.length - 1
                  ? "Finish Mission"
                  : "Next Question"}
              </PixelButton>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function ProgressBarPlaceholder({ progress }) {
  return (
    <div className="mission-progress">
      <div
        className="mission-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}