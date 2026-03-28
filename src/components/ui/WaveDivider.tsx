interface WaveDividerProps {
  /** color of the wave fill — use the NEXT section's background color */
  fill?: string;
  /** background color of the container — use the CURRENT section's background color */
  background?: string;
  /** which way the wave faces */
  flip?: boolean;
  /** wave style */
  variant?: "wave" | "curve" | "tilt";
  className?: string;
}

export default function WaveDivider({
  fill = "#ffffff",
  background = "transparent",
  flip = false,
  variant = "wave",
  className = "",
}: WaveDividerProps) {
  const paths: Record<string, string> = {
    wave: "M0,64 C180,120 360,0 540,64 C720,128 900,0 1080,64 C1260,128 1440,64 1440,64 L1440,120 L0,120 Z",
    curve: "M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z",
    tilt: "M0,0 L1440,80 L1440,120 L0,120 Z",
  };

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ background, transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
