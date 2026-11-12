import { useState } from "react";
import PixelButton from "../components/PixelButton";
import RobotPet from "../components/RobotPet";
import ProgressBar from "../components/ProgressBar";

const questions = [
  {
    question: "When did NASA launch the Voyager spacecraft?",
    options: ["1957", "1969", "1977", "1997"],
    answer: "1977",
    fact: "Voyager 2 launched on August 20, 1977, and Voyager 1 launched on September 5, 1977.",
  },
  {
    question: "What special message do Voyager 1 and 2 carry?",
    options: ["A map of Mars", "The Golden Record", "A robot pet", "A telescope"],
    answer: "The Golden Record",
    fact: "Each Voyager spacecraft carries a Golden Record with sounds and images that introduce life and culture on Earth.",
  },
  {
    question: "Where did Voyager 1 become the first human-made object to enter?",
    options: ["The Moon's orbit", "The asteroid belt", "Interstellar space", "The surface of Mars"],
    answer: "Interstellar space",
    fact: "Voyager 1 crossed into interstellar space in 2012, beyond the Sun's heliosphere.",
  },
];

export default function GalaxyMissionActivity({ player, onBack, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const question = questions[currentQuestion];

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === question.answer) setScore((value) => value + 1);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((value) => value + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const robotColor = player.robot?.color?.value || player.robot?.color || "#55c7ff";
  const robotAccessory = player.robot?.accessory?.emoji || player.robot?.accessory || "📡";

  return (
    <main className="welcome-screen">
      <section className="welcome-card">
        <p className="welcome-label">VOYAGER DEEP SPACE MISSION</p>
        {completed ? (
          <>
            <h1>Voyager Mission Complete! 🌌</h1>
            <p className="welcome-description">Congratulations, {player.nickname}!</p>
            <RobotPet nickname={player.robot?.name || player.nickname} color={robotColor} accessory={robotAccessory} personality={player.robot?.personality} baseId={player.robot?.baseId} />
            <h2>{score === 3 ? "Outstanding deep-space explorer! ⭐" : score >= 2 ? "Fantastic Voyager knowledge! 🚀" : "Keep discovering the universe! 💫"}</h2>
            <p className="welcome-description">You answered {score} out of {questions.length} questions correctly.</p>
            <h2>Mission Score: {score}/{questions.length}</h2>
            <PixelButton onClick={() => { onComplete(score); onBack(); }}>Save Progress & Return</PixelButton>
          </>
        ) : (
          <>
            <h1>Follow Voyager Beyond the Solar System</h1>
            <ProgressBar progress={((currentQuestion + 1) / questions.length) * 100} label={`Question ${currentQuestion + 1} of ${questions.length}`} />
            <h2>{question.question}</h2>
            <div className="mission-options">
              {question.options.map((option) => (
                <button key={option} className="mission-option" aria-pressed={selectedAnswer === option} disabled={showFeedback} onClick={() => setSelectedAnswer(option)}>{option}</button>
              ))}
            </div>
            {showFeedback && <div className="mission-feedback"><h3>{selectedAnswer === question.answer ? "Correct! ⭐" : "Nice try! 🚀"}</h3><p>{question.fact}</p></div>}
            {!showFeedback ? (
              <PixelButton onClick={checkAnswer} disabled={!selectedAnswer}>Check Answer</PixelButton>
            ) : (
              <PixelButton onClick={nextQuestion}>{currentQuestion === questions.length - 1 ? "Finish Mission" : "Next Question"}</PixelButton>
            )}
          </>
        )}
      </section>
    </main>
  );
}
