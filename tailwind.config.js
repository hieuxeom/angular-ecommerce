/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#ff5b5b",
        sub: "#999",
        disabled: "#666",
        gray: "#f0f0f0",
        danger: "#ff3333",
        success: "#01ab31",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
    },
  },
  plugins: [],
};
