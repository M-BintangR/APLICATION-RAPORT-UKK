/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "hard-purple": "#06133B",
        "light-with": "rgba(255,255,255,0.18)",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
