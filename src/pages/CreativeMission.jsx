import { useMemo, useState } from "react";
import PixelButton from "../components/PixelButton";
import DrawingPad from "../components/DrawingPad";
import { containsBlockedLanguage } from "../utils/contentSafety";
import "../styles/CreativeMission.css";

const locationFacts = {
  Moon: [
    "The Moon is Earth's natural satellite.",
    "The Moon's gravity is about one-sixth of Earth's gravity.",
    "Apollo astronauts used a battery-powered rover to explore the Moon.",
  ],
  Mars: [
    "Iron-rich minerals in Martian rocks and dust help give Mars its red color.",
    "Mars has two small moons named Phobos and Deimos.",
    "NASA's Ingenuity helicopter demonstrated powered flight on Mars.",
  ],
  "Deep Space": [
    "Our Solar System is part of the Milky Way Galaxy.",
    "Voyager 1 entered interstellar space in 2012.",
    "The Voyager spacecraft carry Golden Records with sounds and images from Earth.",
  ],
};

const rescueChoices = [
  { value: "Bring it home to a museum", label: "🏛️ Bring it home to a museum" },
  { value: "Leave it at its historic site", label: "📍 Leave it at its historic site" },
  { value: "Give it a new job", label: "🛠️ Give it a new job" },
];

export default function CreativeMission({ player, mission, onBack, onSave }) {
  const [activity, setActivity] = useState("postcard");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [risk, setRisk] = useState("");
  const [drawingData, setDrawingData] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const missionName = mission?.title || "Space Adventure";
  const location = mission?.id === 1 ? "Moon" : mission?.id === 2 ? "Mars" : "Deep Space";
  const facts = useMemo(() => locationFacts[location], [location]);

  const handleActivityChange = (nextActivity) => {
    setActivity(nextActivity);
    setError("");
    setSaved(false);
  };

  const addFact = (fact) => {
    setContent((current) => `${current}${current.trim() ? "\n\n" : ""}Did you know? ${fact}`);
    setSaved(false);
  };

  const handleSave = () => {
    const textToCheck = activity === "postcard"
      ? `${title} ${content}`
      : `${reason} ${risk}`;

    if (activity === "postcard" && (!title.trim() || !content.trim())) {
      setError("Please add a title and message before saving your postcard.");
      return;
    }
    if (activity === "rescue" && (!decision || !reason.trim() || !risk.trim())) {
      setError("Choose an option, explain your reason, and add one possible risk.");
      return;
    }
    if (containsBlockedLanguage(textToCheck)) {
      setError("Please edit your message so it uses kind, classroom-friendly language.");
      return;
    }

    const creativeWork = {
      id: `work-${Date.now()}`,
      petId: player?.robot?.id || "my-robot",
      missionId: mission?.id || null,
      missionName,
      location,
      type: activity,
      title: activity === "postcard" ? title.trim() : "Rescue or Retire Report",
      content: activity === "postcard" ? content.trim() : reason.trim(),
      decision: activity === "rescue" ? decision : "",
      reason: activity === "rescue" ? reason.trim() : "",
      risk: activity === "rescue" ? risk.trim() : "",
      drawingData: activity === "postcard" ? drawingData : "",
      approved: false,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    onSave?.(creativeWork);
    setSaved(true);
    setError("");
  };

  const downloadPostcard = () => {
    const postcard = `${title || "My Space Postcard"}\nFrom: ${player?.nickname || "Space Explorer"}\nLocation: ${location}\n\n${content}`;
    const blob = new Blob([postcard], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-space-postcard.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="creative-mission-page">
      <section className="creative-mission-card">
        <p className="creative-label">ROBO PET STATION</p>
        <h1>Creative Space Missions</h1>
        <p className="creative-description">
          Hello, {player?.nickname || "Space Explorer"}! Choose an activity and share your ideas.
        </p>

        <div className="creative-activity-options">
          <button type="button" className={activity === "postcard" ? "activity-option active" : "activity-option"} onClick={() => handleActivityChange("postcard")}>
            📨 Message Home
          </button>
          <button type="button" className={activity === "rescue" ? "activity-option active" : "activity-option"} onClick={() => handleActivityChange("rescue")}>
            🚀 Rescue or Retire
          </button>
        </div>

        {activity === "postcard" ? (
          <div className="creative-form">
            <h2>📨 Message Home</h2>
            <p>Imagine you are exploring {location} with your Robo-Pal. Write a postcard to someone at home.</p>
            <p className="creative-prompt"><strong>Try these starters:</strong> "Dear family...", "Today I discovered...", "I wish you could see..."</p>

            <label htmlFor="postcard-title">Postcard title</label>
            <input id="postcard-title" type="text" value={title} onChange={(event) => { setTitle(event.target.value); setSaved(false); }} placeholder="My amazing space adventure" maxLength={60} />

            <label htmlFor="postcard-content">Your postcard message</label>
            <textarea id="postcard-content" value={content} onChange={(event) => { setContent(event.target.value); setSaved(false); }} placeholder="Dear family, today I explored..." rows={6} maxLength={800} />

            <DrawingPad onChange={(imageData) => { setDrawingData(imageData); setSaved(false); }} />

            <div className="fact-chip-section">
              <h3>NASA-inspired fact chips</h3>
              <p>Choose a fact to add to your postcard.</p>
              <div className="fact-chip-list">
                {facts.map((fact) => <button type="button" key={fact} onClick={() => addFact(fact)}>＋ {fact}</button>)}
              </div>
            </div>

            {(title.trim() || content.trim()) && (
              <article className="postcard-preview">
                <p>✉️ SPACE POSTCARD · {location.toUpperCase()}</p>
                <h3>{title || "My space adventure"}</h3>
                <p>{content || "Your postcard message will appear here."}</p>
                {drawingData && <img className="postcard-drawing-preview" src={drawingData} alt="Your postcard drawing" />}
                <small>From your space explorer, {player?.nickname || "Explorer"}</small>
              </article>
            )}
            <div className="creative-actions">
              <PixelButton onClick={downloadPostcard} disabled={!title.trim() || !content.trim()}>Download Postcard</PixelButton>
              <PixelButton onClick={() => window.print()}>Print Postcard</PixelButton>
            </div>
          </div>
        ) : (
          <div className="creative-form">
            <h2>🚀 Rescue or Retire?</h2>
            <p>Imagine a historic space robot has finished its original mission. What should happen next?</p>
            <div className="decision-options">
              {rescueChoices.map((choice) => (
                <label key={choice.value}>
                  <input type="radio" name="decision" value={choice.value} checked={decision === choice.value} onChange={(event) => { setDecision(event.target.value); setSaved(false); }} />
                  {choice.label}
                </label>
              ))}
            </div>

            <label htmlFor="decision-reason">Give at least one reason for your choice</label>
            <p className="creative-prompt">Sentence starter: "I chose this because..."</p>
            <textarea id="decision-reason" value={reason} onChange={(event) => { setReason(event.target.value); setSaved(false); }} placeholder="I chose this because..." rows={4} maxLength={600} />

            <label htmlFor="decision-risk">What is one possible risk or challenge?</label>
            <textarea id="decision-risk" value={risk} onChange={(event) => { setRisk(event.target.value); setSaved(false); }} placeholder="One possible risk is..." rows={3} maxLength={300} />
          </div>
        )}

        {error && <p className="creative-error" role="alert">{error}</p>}
        {saved && <p className="creative-success" role="status">Your work has been saved on this browser and is waiting for review.</p>}

        <div className="creative-actions">
          <PixelButton onClick={handleSave}>Save My Work</PixelButton>
          <PixelButton onClick={onBack}>Back to Mission Archive</PixelButton>
        </div>
      </section>
    </main>
  );
}
