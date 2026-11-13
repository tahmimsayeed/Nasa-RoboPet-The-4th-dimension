import { useState } from "react";
import PixelButton from "../components/PixelButton";
import RobotPet from "../components/RobotPet";
import ProgressBar from "../components/ProgressBar";

const questions = [
  {
    question: "What was Sojourner famous for?",
    options: ["First rover to operate on Mars", "First spacecraft to orbit Jupiter", "First helicopter on the Moon", "First human-made object in space"],
    answer: "First rover to operate on Mars",
    fact: "NASA's Sojourner rover explored Mars in 1997 as part of the Mars Pathfinder mission.",
  },
  {
    question: "What did Spirit and Opportunity help scientists find evidence of?",
    options: ["Ancient forests", "Past water on Mars", "Active volcanoes", "Oceans full of fish"],
    answer: "Past water on Mars",
    fact: "The twin rovers found rocks and minerals that showed liquid water had existed on Mars long ago.",
  },
  {
    question: "What is Perseverance collecting on Mars?",
    options: ["Seashells", "Rock and soil samples", "Meteorites from Earth", "Ice cubes for astronauts"],
    answer: "Rock and soil samples",
    fact: "Perseverance collects and stores carefully selected rock samples to help scientists study Mars.",
  },
];

export default function MarsMissionActivity({ player, onBack, onComplete }) {
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
        <p className="welcome-label">MARS ROVER MISSION</p>
        {completed ? (
          <>
            <h1>Mars Mission Complete! 🔴</h1>
            <p className="welcome-description">Congratulations, {player.nickname}!</p>
            <RobotPet nickname={player.robot?.name || player.nickname} color={robotColor} accessory={robotAccessory} personality={player.robot?.personality} baseId={player.robot?.baseId} />
            <h2>{score === 3 ? "Amazing Mars research! ⭐" : score >= 2 ? "Fantastic rover work! 🚀" : "Keep exploring and learning! 💫"}</h2>
            <p className="welcome-description">You answered {score} out of {questions.length} questions correctly.</p>
            <h2>Mission Score: {score}/{questions.length}</h2>
            <PixelButton onClick={() => { onComplete(score); onBack(); }}>Save Progress & Return</PixelButton>
          </>
        ) : (
          <>
            <h1>Investigate the Red Planet</h1>
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
