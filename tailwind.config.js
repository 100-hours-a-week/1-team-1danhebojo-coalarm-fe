/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translate(-50%, -20px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translate(-50%, 0)" },
          "100%": { opacity: "0", transform: "translate(-50%, -20px)" },
        },
        progress: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeOut: "fadeOut 0.3s ease-in forwards",
        progress: "progress 10000ms linear forwards",
      },
    },
  },
  plugins: [],
};
