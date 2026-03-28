import type { Config } from "tailwindcss";

// Tailwind v4 — most config lives in globals.css @theme block
// This file is kept for any plugin additions in the future
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
