"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = new Audio("/audio/namaste-10min.mp3");
    el.loop = true;
    el.volume = 0.12;
    audioRef.current = el;

    const onInteraction = () => {
      if (audioRef.current && !audioRef.current.paused) return;
      el.play().then(() => setPlaying(true)).catch(() => {});
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("scroll", onInteraction);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };

    el.play().then(() => setPlaying(true)).catch(() => {
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

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <button
      onClick={toggle}
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
      aria-label={playing ? "Pause background music" : "Play background music"}
    >
      {playing ? "🔊" : "▶"}
    </button>
  );
}