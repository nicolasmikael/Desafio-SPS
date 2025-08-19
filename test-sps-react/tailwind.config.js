/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007bff",
          50: "#e3f2ff",
          100: "#bde0ff",
          200: "#94cdff",
          300: "#6bbaff",
          400: "#42a7ff",
          500: "#007bff",
          600: "#006ee6",
          700: "#0061cc",
          800: "#0054b3",
          900: "#003d82",
        },
        success: {
          DEFAULT: "#28a745",
          50: "#f0f9f1",
          100: "#d7f0db",
          200: "#b9e5c1",
          300: "#97d9a7",
          400: "#72cd8d",
          500: "#28a745",
          600: "#20963d",
          700: "#1e8235",
          800: "#1c6e2c",
          900: "#165a24",
        },
        danger: {
          DEFAULT: "#dc3545",
          50: "#fdf2f3",
          100: "#fbe2e4",
          200: "#f7c8cd",
          300: "#f2a3ab",
          400: "#ec7584",
          500: "#dc3545",
          600: "#c8293a",
          700: "#b01e30",
          800: "#921926",
          900: "#7a151d",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
    },
  },
  plugins: [],
};
