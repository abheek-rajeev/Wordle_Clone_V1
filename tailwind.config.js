/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "spin-y": {
          from: { transform: "rotateX(0deg)" },
          to: { transform: "rotateX(360deg)" },
        },
      },
      animation: {
        "spin-y": "spin-y 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
