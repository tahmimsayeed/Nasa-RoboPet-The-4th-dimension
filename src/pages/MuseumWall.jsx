import { useMemo, useState } from "react";
import RobotPet from "../components/RobotPet";
import PixelButton from "../components/PixelButton";
import "../styles/MuseumWall.css";

const stickers = ["⭐", "🚀", "👏", "💡", "🌟"];

export default function MuseumWall({
  players = [],
  onBack,
  onApprove,
  onReject,
  onReact,
  onRemove,
}) {
  const [filter, setFilter] = useState("All");
  const [hardwareFilter, setHardwareFilter] = useState("All");
  const [teacherMode, setTeacherMode] = useState(false);

  const creativeWorks = useMemo(
    () => players.flatMap((owner) =>
      (owner.creativeWorks || []).map((work) => ({
        ...work,
        creatorName: work.creatorName || owner.nickname || "Space Explorer",
        creatorPlayerId: work.creatorPlayerId || owner.playerId,
        robotSnapshot: work.robotSnapshot || owner.robot || null,
      }))
    ),
    [players]
  );

  const approvedWorks = creativeWorks.filter(
    (work) => work.status === "approved" || work.approved === true
  );
  const pendingWorks = creativeWorks.filter(
    (work) =>
      work.status !== "approved" &&
      work.status !== "rejected" &&
      work.approved !== true
  );

  const locations = ["All", ...new Set(approvedWorks.map((work) => work.location).filter(Boolean))];
  const hardwareOptions = [
    "All",
    ...new Set(approvedWorks.map((work) => work.robotSnapshot?.baseId).filter(Boolean)),
  ];

  const visibleWorks = approvedWorks
    .filter((work) => filter === "All" || work.location === filter)
    .filter((work) => hardwareFilter === "All" || work.robotSnapshot?.baseId === hardwareFilter)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const pollOptions = [
    "Bring it home to a museum",
    "Leave it at its historic site",
    "Give it a new job",
  ];
  const pollCounts = pollOptions.map((option) => ({
    option,
    count: creativeWorks.filter((work) => work.type === "rescue" && work.decision === option).length,
  }));

  const renderWorkCard = (work, isPending = false) => {
    const robot = work.robotSnapshot;
    const color = robot?.color?.value || robot?.color || "#55c7ff";
    const accessory = robot?.accessory?.emoji || robot?.accessory || "📡";

    return (
      <article className="museum-card" key={`${work.creatorPlayerId}-${work.id}`}>
        {robot && (
          <div className="museum-robot">
            <RobotPet
              nickname={robot.name || work.creatorName}
              color={color}
              accessory={accessory}
              personality={robot.personality || "Friendly"}
              baseId={robot.baseId}
              wheelType={robot.wheelType}
              antennaType={robot.antenna || robot.antennaType}
              tool={robot.tool}
              eyeColor={robot.eyeColor}
            />
          </div>
        )}
        <p className="museum-creator-plaque">
          Created by <strong>{work.creatorName}</strong>
          {robot?.baseId ? ` · ${robot.baseId.replaceAll("-", " ")}` : ""}
        </p>
        <h3>{work.title}</h3>
        <p className="museum-mission">{work.missionName} · {work.location}</p>
        {work.decision && <p><strong>Decision:</strong> {work.decision}</p>}
        <p className="museum-work-content">{work.content}</p>
        {work.reason && <p><strong>Reason:</strong> {work.reason}</p>}
        {work.risk && <p><strong>Possible risk:</strong> {work.risk}</p>}

        {!isPending && (
          <>
            <div className="museum-reactions">
              <p>Give this exhibit a sticker:</p>
              {stickers.map((sticker) => (
                <button
                  type="button"
                  key={sticker}
                  onClick={() => onReact(work.id, sticker, work.creatorPlayerId)}
                  aria-label={`React with ${sticker}`}
                >
                  {sticker}
                </button>
              ))}
            </div>
            <p className="reaction-count">
              {stickers.map((sticker) => {
                const count = (work.reactions || []).filter((reaction) => reaction === sticker).length;
                return count ? `${sticker} ${count}` : null;
              }).filter(Boolean).join("  ")}
            </p>
          </>
        )}

        {isPending && (
          <div className="approval-actions">
            <button type="button" onClick={() => onApprove(work.id, work.creatorPlayerId)}>✓ Approve</button>
            <button type="button" onClick={() => onReject(work.id, work.creatorPlayerId)}>Hide</button>
            <button type="button" onClick={() => onRemove(work.id, work.creatorPlayerId)}>Remove</button>
          </div>
        )}
      </article>
    );
  };

  return (
    <main className="museum-page">
      <section className="museum-container">
        <p className="museum-label">ROBO PET STATION</p>
        <h1>🏛️ Class Museum Wall</h1>
        <p className="museum-description">
          Explore creative work saved by the explorers on this browser.
        </p>
        <p className="teacher-notice">
          Local demo: exhibits are not shared across different devices or browsers.
        </p>

        <div className="museum-controls">
          <PixelButton onClick={() => setTeacherMode((value) => !value)}>
            {teacherMode ? "Student View" : "Teacher View (Demo)"}
          </PixelButton>
          <PixelButton onClick={() => window.print()}>Print Museum Wall</PixelButton>
          <PixelButton onClick={onBack}>Back</PixelButton>
        </div>

        {teacherMode ? (
          <section className="teacher-section">
            <h2>📋 Submission Approval</h2>
            {pendingWorks.length === 0 ? (
              <p className="museum-empty">There are no pending submissions.</p>
            ) : (
              <div className="museum-grid">
                {pendingWorks.map((work) => renderWorkCard(work, true))}
              </div>
            )}
          </section>
        ) : (
          <section className="student-section">
            <h2>🌟 Approved Exhibits</h2>
            <div className="museum-filters">
              <label>
                Location
                <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                  {locations.map((location) => <option key={location}>{location}</option>)}
                </select>
              </label>
              <label>
                Hardware
                <select value={hardwareFilter} onChange={(event) => setHardwareFilter(event.target.value)}>
                  {hardwareOptions.map((hardware) => <option key={hardware} value={hardware}>
                    {hardware === "All" ? "All hardware" : hardware.replaceAll("-", " ")}
                  </option>)}
                </select>
              </label>
            </div>
            {visibleWorks.length === 0 ? (
              <p className="museum-empty">No approved exhibits match these filters yet.</p>
            ) : (
              <div className="museum-grid">
                {visibleWorks.map((work) => renderWorkCard(work))}
              </div>
            )}

            <section className="museum-poll">
              <h2>📊 Local Class Poll</h2>
              <p>Choices submitted by saved explorers on this browser. This is not synchronized with other devices.</p>
              {pollCounts.map(({ option, count }) => (
                <div className="museum-poll-row" key={option}>
                  <span>{option}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </section>
          </section>
        )}
      </section>
    </main>
  );
}
