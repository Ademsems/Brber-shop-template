import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: { "60": "60" },
      colors: {
        navy:  "#0A192F",
        aqua:  "#00FFFF",
        slate: "#8892B0",
      },
      fontFamily: {
        display: ["'Bebas Neue'",   "sans-serif"],
        body:    ["'Space Grotesk'","sans-serif"],
        sans:    ["'Space Grotesk'","sans-serif"],
      },
      backgroundImage: {
        "grid-aqua": "linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)",
      },
      backgroundSize: {
        "grid-60": "60px 60px",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scan":       "scan-line 4s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%,100%": { boxShadow: "0 0 20px rgba(0,255,255,0.3)"  },
          "50%":      { boxShadow: "0 0 40px rgba(0,255,255,0.6), 0 0 80px rgba(0,255,255,0.2)" },
        },
        "scan-line": {
          "0%":   { top: "-2px"  },
          "100%": { top: "100%"  },
        },
      },
      boxShadow: {
        "aqua-sm": "0 0 16px rgba(0,255,255,0.3)",
        "aqua-md": "0 0 32px rgba(0,255,255,0.45)",
        "aqua-lg": "0 0 64px rgba(0,255,255,0.6)",
        "glass":   "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      dropShadow: {
        aqua: "0 0 12px rgba(0,255,255,0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
