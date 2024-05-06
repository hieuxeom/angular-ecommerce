/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#999",
        disabled: "#666",
        gray: "#f0f0f0",
        danger: "#ff3333",
        success: "#01ab31",
      },
    },
  },
  plugins: [],
};
