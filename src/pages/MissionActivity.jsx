import { useState } from "react";
import PixelButton from "../components/PixelButton";
import RobotPet from "../components/RobotPet";
import ProgressBar from "../components/ProgressBar";

const questions = [
  {
    question: "Which Apollo mission first used the Lunar Roving Vehicle on the Moon?",
    options: ["Apollo 11", "Apollo 15", "Apollo 13", "Apollo 17"],
    answer: "Apollo 15",
    fact: "Apollo 15 astronauts David Scott and James Irwin drove the first Lunar Roving Vehicle on the Moon in 1971.",
  },
  {
    question: "What powered the Apollo Lunar Roving Vehicle?",
    options: ["Petrol", "Wind", "Batteries", "A steam engine"],
    answer: "Batteries",
    fact: "The lunar rover used batteries and helped astronauts travel farther from their landing site.",
  },
  {
    question: "How many wheels did the Apollo Lunar Roving Vehicle have?",
    options: ["Two", "Four", "Six", "Eight"],
    answer: "Four",
    fact: "The Lunar Roving Vehicle had four wheels designed to travel across the Moon's dusty, uneven surface.",
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
        <p className="welcome-label">APOLLO LUNAR ROVER MISSION</p>
        {completed ? (
          <>
            <h1>Moon Mission Complete! 🌙</h1>
            <p className="welcome-description">Congratulations, {player.nickname}!</p>
            <RobotPet nickname={player.robot?.name || player.nickname} color={robotColor} accessory={robotAccessory} personality={player.robot?.personality} baseId={player.robot?.baseId} />
            <h2>{score === 3 ? "Amazing rover research! ⭐" : score >= 2 ? "Fantastic lunar exploring! 🚀" : "Every explorer learns something new! 💫"}</h2>
            <p className="welcome-description">You answered {score} out of {questions.length} questions correctly.</p>
            <h2>Mission Score: {score}/{questions.length}</h2>
            <PixelButton onClick={() => { onComplete(score); onBack(); }}>Save Progress & Return</PixelButton>
          </>
        ) : (
          <>
            <h1>Help the Apollo 15 Rover Explore</h1>
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
