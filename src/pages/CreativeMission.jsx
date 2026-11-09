
import { useState } from "react";
import PixelButton from "../components/PixelButton";
import "../styles/CreativeMission.css";

export default function CreativeMission({
  player,
  mission,
  onBack,
  onSave,
}) {
  const [activity, setActivity] = useState("postcard");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [saved, setSaved] = useState(false);

  const missionName = mission?.title || "Space Adventure";

  const location =
    mission?.id === 1
      ? "Moon"
      : mission?.id === 2
        ? "Mars"
        : "Deep Space";

  const handleActivityChange = (newActivity) => {
    setActivity(newActivity);
    setTitle("");
    setContent("");
    setDecision("");
    setReason("");
    setSaved(false);
  };

  const handleSave = () => {
    if (activity === "postcard" && (!title.trim() || !content.trim())) {
      return;
    }

    if (
      activity === "rescue" &&
      (!decision || !reason.trim())
    ) {
      return;
    }

    const creativeWork = {
      id: `${Date.now()}`,
      petId: player?.robot?.id || "my-robot",
      missionId: mission?.id || null,
      missionName,
      location,
      type: activity,
      title:
        activity === "postcard"
          ? title.trim()
          : "Rescue or Retire",
      content:
        activity === "postcard"
          ? content.trim()
          : reason.trim(),
      decision: activity === "rescue" ? decision : "",
      approved: false,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (onSave) {
      onSave(creativeWork);
      setSaved(true);
    }
  };

  return (
    <main className="creative-mission-page">
      <section className="creative-mission-card">
        <p className="creative-label">ROBO PET STATION</p>

        <h1>Creative Space Missions</h1>

        <p className="creative-description">
          Hello, {player?.nickname || "Space Explorer"}!
          Choose a creative activity and share your ideas.
        </p>

        <div className="creative-activity-options">
          <button
            type="button"
            className={
              activity === "postcard" ? "activity-option active" : "activity-option"
            }
            onClick={() => handleActivityChange("postcard")}
          >
            📨 Message Home
          </button>

          <button
            type="button"
            className={
              activity === "rescue" ? "activity-option active" : "activity-option"
            }
            onClick={() => handleActivityChange("rescue")}
          >
            🚀 Rescue or Retire
          </button>
        </div>

        {activity === "postcard" ? (
          <div className="creative-form">
            <h2>📨 Message Home</h2>

            <p>
              Imagine you are exploring {location} with your Robo-Pal.
              Write a postcard to someone at home!
            </p>

            <label htmlFor="postcard-title">
              Postcard title
            </label>

            <input
              id="postcard-title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setSaved(false);
              }}
              placeholder="My amazing space adventure"
              maxLength={60}
            />

            <label htmlFor="postcard-content">
              Your postcard message
            </label>

            <textarea
              id="postcard-content"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                setSaved(false);
              }}
              placeholder="Dear family, today I explored..."
              rows={6}
              maxLength={500}
            />
          </div>
        ) : (
          <div className="creative-form">
            <h2>🚀 Rescue or Retire?</h2>

            <p>
              Imagine a space robot has an old piece of equipment.
              It may still be useful, or it may need to be retired.
              What would you decide?
            </p>

            <div className="decision-options">
              <label>
                <input
                  type="radio"
                  name="decision"
                  value="Rescue"
                  checked={decision === "Rescue"}
                  onChange={(event) => {
                    setDecision(event.target.value);
                    setSaved(false);
                  }}
                />
                🛠️ Rescue it and try to repair it
              </label>

              <label>
                <input
                  type="radio"
                  name="decision"
                  value="Retire"
                  checked={decision === "Retire"}
                  onChange={(event) => {
                    setDecision(event.target.value);
                    setSaved(false);
                  }}
                />
                🌟 Retire it and use a replacement
              </label>
            </div>

            <label htmlFor="decision-reason">
              Why did you make this decision?
            </label>

            <textarea
              id="decision-reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                setSaved(false);
              }}
              placeholder="I chose this because..."
              rows={5}
              maxLength={500}
            />
          </div>
        )}

        {saved && (
          <p className="creative-success">
            Your creative work has been submitted for teacher approval!
          </p>
        )}

        <div className="creative-actions">
          <PixelButton onClick={handleSave}>
            Save My Work
          </PixelButton>

          <PixelButton onClick={onBack}>
            Back
          </PixelButton>
        </div>
      </section>
    </main>
  );
}
