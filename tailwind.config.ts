import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        paper: "hsl(var(--paper))",
        "paper-2": "hsl(var(--paper-2))",
        ink: "hsl(var(--ink))",
        faded: "hsl(var(--faded))",
        accent: "hsl(var(--accent))",
        line: "hsl(var(--line))",
      },
      borderColor: { DEFAULT: "hsl(var(--line))" },
      divideColor: { DEFAULT: "hsl(var(--line))" },
    },
  },
  plugins: [],
};
export default config;
