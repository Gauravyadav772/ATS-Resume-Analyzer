/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#00D4FF",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
