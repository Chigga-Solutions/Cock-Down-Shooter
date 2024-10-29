import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      ringWidth: {
        16: "16px",
      },
      keyframes: {
        shake: {
          from: { transform: 'rotate(-15deg)' },
          to:   { transform: 'rotate(15deg)' }
        }
      },
      animation: {
        shake: 'shake 1s linear infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;
