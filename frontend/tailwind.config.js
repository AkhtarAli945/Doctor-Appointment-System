

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e0e7ff",
          200: "#a5b4fc",
          300: "#818cf8",
          400: "#6366f1",
          500: "#45f",
          600: "#3a3edb",
          700: "#5f6FFF",
        },
      },

      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};