import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#7A8574",
          dark: "#5E685A",
        },
        offwhite: "#F7F4ED",
        beige: "#EFE8DD",
        gold: "#C9AF73",
        ink: "#2D2D2D",
        brand: {
          sage: "#7A8574",
          "sage-dark": "#5E685A",
          offwhite: "#F7F4ED",
          beige: "#EFE8DD",
          gold: "#C9AF73",
          ink: "#2D2D2D",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        subtitle: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(45, 45, 45, 0.08)",
        card: "0 8px 30px -12px rgba(45, 45, 45, 0.12)",
        gold: "0 4px 20px -4px rgba(201, 175, 115, 0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(110deg, #C9AF73 0%, #E4D4A8 40%, #C9AF73 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
