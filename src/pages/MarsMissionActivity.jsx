import { useState } from "react";
import PixelButton from "../components/PixelButton";
import RobotPet from "../components/RobotPet";

const questions = [
  {
    question: "Why is Mars called the Red Planet?",
    options: [
      "It is covered in red paint",
      "Iron in its soil gives it a reddish color",
      "It is always on fire",
      "The Sun makes it red",
    ],
    answer: "Iron in its soil gives it a reddish color",
    fact: "Mars looks red because iron-rich minerals in its soil have rusted.",
  },
  {
    question: "How many moons does Mars have?",
    options: ["0", "1", "2", "10"],
    answer: "2",
    fact: "Mars has two small moons named Phobos and Deimos.",
  },
  {
    question: "What is the name of the largest volcano in our Solar System?",
    options: [
      "Mount Everest",
      "Olympus Mons",
      "Mauna Loa",
      "Mars Mountain",
    ],
    answer: "Olympus Mons",
    fact: "Olympus Mons is a giant volcano on Mars and is the largest known volcano in our Solar System!",
  },
];

export default function MarsMissionActivity({
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
        <p className="welcome-label">MARS ADVENTURE MISSION</p>

        {completed ? (
          <>
            <h1>Mission Complete! 🔴</h1>

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
                ? "Amazing work, Mars Explorer! ⭐"
                : score >= 2
                ? "Fantastic effort, Mars Explorer! 🚀"
                : "Keep exploring Mars, Space Explorer! 💫"}
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
            <h1>Mars Challenge</h1>

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