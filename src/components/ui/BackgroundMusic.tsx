"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = new Audio("/audio/namaste-10min.mp3");
    el.loop = true;
    el.volume = 0.12;
    audioRef.current = el;

    const onInteraction = () => {
      if (audioRef.current && !audioRef.current.paused) return;
      el.play().then(() => setStarted(true)).catch(() => {});
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("scroll", onInteraction);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };

    el.play().then(() => setStarted(true)).catch(() => {
      document.addEventListener("click", onInteraction, { once: true });
      document.addEventListener("scroll", onInteraction, { once: true });
      document.addEventListener("touchstart", onInteraction, { once: true });
      document.addEventListener("keydown", onInteraction, { once: true });
    });

    return () => {
      el.pause();
      el.src = "";
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("scroll", onInteraction);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };
  }, []);

  function handleButtonClick() {
    const el = audioRef.current;
    if (!el) return;
    el.play().then(() => setStarted(true)).catch(() => {});
  }

  return (
    <>
      {!started && (
        <button
          onClick={handleButtonClick}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            background: "#a38d51",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            cursor: "pointer",
            fontSize: 20,
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Play background music"
        >
          ▶
        </button>
      )}
    </>
  );
}