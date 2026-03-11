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
        cream:    "#FFFFFF",
        offwhite: "#F8F9FA",
        mist:     "#EEEFF1",
        charcoal: "#222222",
        mid:      "#555555",
        soft:     "#888888",
        accent:      "#D10000",
        "accent-dark":  "#A80000",
        "accent-light": "#FF2222",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'Poppins'", "sans-serif"],
        sans:    ["'Poppins'", "sans-serif"],
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(rgba(34,34,34,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,34,34,0.04)_1px,transparent_1px)",
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
          "0%,100%": { boxShadow: "0 0 20px rgba(209,0,0,0.25)"  },
          "50%":      { boxShadow: "0 0 40px rgba(209,0,0,0.5), 0 0 80px rgba(209,0,0,0.15)" },
        },
        "scan-line": {
          "0%":   { top: "-2px"  },
          "100%": { top: "100%"  },
        },
      },
      boxShadow: {
        "accent-sm":  "0 0 16px rgba(209,0,0,0.2)",
        "accent-md":  "0 0 32px rgba(209,0,0,0.35)",
        "accent-lg":  "0 0 64px rgba(209,0,0,0.5)",
        "card":    "0 4px 24px rgba(0,0,0,0.08)",
        "card-lg": "0 8px 48px rgba(0,0,0,0.12)",
        "glass":   "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
      },
      dropShadow: {
        accent: "0 0 12px rgba(209,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
