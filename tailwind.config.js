/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#505050',
        'custom-orange': '#F94E33',

      },
      fontFamily: {
        gothic: ['Fondamento', 'sans-serif'],
        glory: ['Gloria Hallelujah', 'cursive'], 
      },
    },
  },
  plugins: [],
};