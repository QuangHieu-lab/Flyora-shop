/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FC8A06',
      },
      fontFamily: {
      genos: ['Genos', 'sans-serif'],
    },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
