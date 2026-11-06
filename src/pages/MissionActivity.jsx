
import { useState } from "react";
import PixelButton from "../components/PixelButton";
import RobotPet from "../components/RobotPet";

const questions = [
  {
    question: "What is the Moon?",
    options: [
      "A star",
      "Earth's natural satellite",
      "A planet",
      "A comet",
    ],
    answer: "Earth's natural satellite",
    fact: "The Moon is Earth's natural satellite. It travels around Earth!",
  },
  {
    question: "Does the Moon make its own light?",
    options: ["Yes", "No"],
    answer: "No",
    fact: "The Moon reflects light from the Sun. It does not produce its own light.",
  },
  {
    question: "What is the surface of the Moon covered with?",
    options: [
      "Grass and trees",
      "Water and sand",
      "Rocks, dust, and craters",
      "Snow and ice only",
    ],
    answer: "Rocks, dust, and craters",
    fact: "The Moon has a rocky surface with lots of craters caused by impacts.",
  },
];

export default function MissionActivity({ player, onBack, onComplete }) {
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
        <p className="welcome-label">MOON EXPLORER MISSION</p>

        {completed ? (
          <>
            <h1>Mission Complete! 🌙</h1>

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
                ? "Amazing work, Space Explorer! ⭐"
                : score >= 2
                ? "Fantastic effort, Space Explorer! 🚀"
                : "Keep learning, Space Explorer! 💫"}
            </h2>

            <p className="welcome-description">
              You answered {score} out of {questions.length} questions correctly!
            </p>

            <h2>Mission Score: {score}/{questions.length}</h2>

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
            <h1>Moon Challenge</h1>

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
      ></div>
    </div>
  );
}
