import { useEffect, useState } from "react";

export default function AccessibilityTools() {
  const [highContrast, setHighContrast] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    return () => document.documentElement.classList.remove("high-contrast");
  }, [highContrast]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const readPage = () => {
    if (!("speechSynthesis" in window)) {
      setMessage("Read aloud is not supported by this browser.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setMessage("Reading stopped.");
      return;
    }

    const content = document.querySelector(".space-content")?.innerText || "";
    const utterance = new SpeechSynthesisUtterance(content.slice(0, 12000));
    utterance.rate = 0.92;
    utterance.onend = () => {
      setSpeaking(false);
      setMessage("Finished reading.");
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setMessage("Read aloud could not finish.");
    };
    setSpeaking(true);
    setMessage("Reading page content aloud.");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <aside className="accessibility-tools" aria-label="Accessibility tools">
      <button
        type="button"
        onClick={() => setHighContrast((value) => !value)}
        aria-pressed={highContrast}
      >
        {highContrast ? "Standard contrast" : "High contrast"}
      </button>
      <button type="button" onClick={readPage}>
        {speaking ? "Stop reading" : "Read page aloud"}
      </button>
      <details>
        <summary>Space glossary</summary>
        <dl>
          <dt>Rover</dt>
          <dd>A vehicle that explores the surface of another world.</dd>
          <dt>Atmosphere</dt>
          <dd>A layer of gases surrounding a planet or moon.</dd>
          <dt>Orbit</dt>
          <dd>The path one object follows around another in space.</dd>
          <dt>Solar System</dt>
          <dd>The Sun and all the objects that travel around it.</dd>
        </dl>
      </details>
      {message && <span className="accessibility-status" role="status">{message}</span>}
    </aside>
  );
}
