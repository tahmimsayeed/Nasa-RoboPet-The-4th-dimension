
export default function ProgressBar({
  progress = 0,
  label = "Game Progress",
}) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>{label}</span>
        <span>{safeProgress}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-fill"
          style={{ width: `${safeProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
