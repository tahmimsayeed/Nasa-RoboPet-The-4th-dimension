
export default function PixelButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`pixel-button ${className}`}
    >
      {children}
    </button>
  );
}

