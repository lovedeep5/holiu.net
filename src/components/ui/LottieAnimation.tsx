"use client";

import { useEffect, useRef } from "react";

interface LottieAnimationProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function LottieAnimation({ src, style, className }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: { destroy: () => void } | null = null;

    import("lottie-web").then((lottie) => {
      if (!containerRef.current) return;
      animation = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: src,
      });
    });

    return () => {
      animation?.destroy();
    };
  }, [src]);

  return <div ref={containerRef} style={style} className={className} />;
}
