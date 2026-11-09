
import { useState } from "react";
import RobotPet from "../components/RobotPet";
import PixelButton from "../components/PixelButton";
import "../styles/MuseumWall.css";

const stickers = ["⭐", "🚀", "👏", "💡", "🌟"];

const filters = ["All", "Moon", "Mars", "Deep Space"];

export default function MuseumWall({
  player,
  onBack,
  onApprove,
  onReject,
  onReact,
}) {
  const [filter, setFilter] = useState("All");
  const [teacherMode, setTeacherMode] = useState(false);

  const creativeWorks = player?.creativeWorks || [];

  const approvedWorks = creativeWorks.filter(
    (work) => work.status === "approved" || work.approved === true
  );

  const pendingWorks = creativeWorks.filter(
    (work) =>
      work.status !== "approved" &&
      work.status !== "rejected" &&
      work.approved !== true
  );

  const visibleWorks = approvedWorks.filter(
    (work) => filter === "All" || work.location === filter
  );

  const getRobotColor = () =>
    player?.robot?.color?.value ||
    player?.robot?.bodyColor ||
    "#55c7ff";

  return (
    <main className="museum-page">
      <section className="museum-container">
        <p className="museum-label">ROBO PET STATION</p>

        <h1>🏛️ Class Museum Wall</h1>

        <p className="museum-description">
          Welcome to our space museum! Explore creative work
          shared by our young space explorers.
        </p>

        <div className="museum-controls">
          <PixelButton onClick={() => setTeacherMode(!teacherMode)}>
            {teacherMode ? "Student View" : "Teacher View (Demo)"}
          </PixelButton>

          <PixelButton onClick={onBack}>
            Back
          </PixelButton>
        </div>

        {teacherMode ? (
          <section className="teacher-section">
            <h2>📋 Submission Approval</h2>

            <p>
              Review creative submissions before they appear
              on the museum wall.
            </p>

            <p className="teacher-notice">
              Demonstration only: this view does not provide
              secure teacher authentication.
            </p>

            {pendingWorks.length === 0 ? (
              <p className="museum-empty">
                There are no pending submissions.
              </p>
            ) : (
              <div className="museum-grid">
                {pendingWorks.map((work) => (
                  <article className="museum-card" key={work.id}>
                    <h3>{work.title}</h3>

                    <p className="museum-mission">
                      {work.missionName} · {work.location}
                    </p>

                    {work.decision && (
                      <p>
                        <strong>Decision:</strong> {work.decision}
                      </p>
                    )}

                    <p>{work.content}</p>

                    <div className="approval-actions">
                      <button
                        type="button"
                        onClick={() => onApprove(work.id)}
                      >
                        ✓ Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => onReject(work.id)}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className="student-section">
            <h2>🌟 Approved Exhibits</h2>

            <div className="museum-filters">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {visibleWorks.length === 0 ? (
              <p className="museum-empty">
                No approved exhibits in this section yet.
                Check back when new space adventures are shared!
              </p>
            ) : (
              <div className="museum-grid">
                {visibleWorks.map((work) => (
                  <article className="museum-card" key={work.id}>
                    <div className="museum-robot">
                      <RobotPet
                        nickname={player.nickname}
                        color={getRobotColor()}
                        accessory={player.robot?.accessory?.emoji || "📡"}
                        personality={player.robot?.personality || "Friendly"}
                        baseId={player.robot?.baseId}
                        wheelType={player.robot?.wheelType}
                        antennaType={player.robot?.antennaType}
                        tool={player.robot?.tool}
                        eyeColor={player.robot?.eyeColor}
                      />
                    </div>

                    <h3>{work.title}</h3>

                    <p className="museum-mission">
                      {work.missionName} · {work.location}
                    </p>

                    {work.decision && (
                      <p>
                        <strong>Decision:</strong> {work.decision}
                      </p>
                    )}

                    <p>{work.content}</p>

                    <div className="museum-reactions">
                      <p>Give this exhibit a sticker:</p>

                      {stickers.map((sticker) => (
                        <button
                          type="button"
                          key={sticker}
                          onClick={() => onReact(work.id, sticker)}
                          aria-label={`React with ${sticker}`}
                        >
                          {sticker}
                        </button>
                      ))}
                    </div>

                    <p className="reaction-count">
                      {stickers
                        .map((sticker) => {
                          const count = (work.reactions || []).filter(
                            (reaction) => reaction === sticker
                          ).length;

                          return count > 0
                            ? `${sticker} ${count}`
                            : null;
                        })
                        .filter(Boolean)
                        .join("  ")}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
