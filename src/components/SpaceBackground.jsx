
export default function SpaceBackground({ children }) {
  return (
    <div className="space-background">

      {/* Star layers */}
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-large"></div>

      {/* Floating space objects */}
      <div className="floating-object planet planet-one" aria-hidden="true">
        🪐
      </div>

      <div className="floating-object planet planet-two" aria-hidden="true">
        🌎
      </div>

      <div className="floating-object moon" aria-hidden="true">
        🌙
      </div>

      <div className="floating-object asteroid asteroid-one" aria-hidden="true">
        ☄️
      </div>

      <div className="floating-object satellite" aria-hidden="true">
        🛰️
      </div>

      <div className="floating-object rocket" aria-hidden="true">
        🚀
      </div>

      <div className="floating-object sparkle sparkle-one" aria-hidden="true">
        ✨
      </div>

      <div className="floating-object sparkle sparkle-two" aria-hidden="true">
        ⭐
      </div>

      {/* Application content */}
      <div className="space-content">
        {children}
      </div>

    </div>
  );
}
