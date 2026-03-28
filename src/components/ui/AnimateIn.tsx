"use client";

import { useEffect, useRef } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

const KEYFRAME: Record<string, string> = {
  up: "animate-in-up",
  down: "animate-in-down",
  left: "animate-in-left",
  right: "animate-in-right",
  none: "animate-in-none",
};

const INITIAL_TRANSFORM: Record<string, string> = {
  up: "translateY(28px)",
  down: "translateY(-28px)",
  left: "translateX(28px)",
  right: "translateX(-28px)",
  none: "none",
};

export default function AnimateIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `${KEYFRAME[direction]} 0.65s cubic-bezier(0.25,0.1,0.25,1) ${delay}s forwards`;
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: INITIAL_TRANSFORM[direction] === "none" ? undefined : INITIAL_TRANSFORM[direction],
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
