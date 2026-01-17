/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tribute-paper': '#fdfdfb',   // The off-white background
        'tribute-olive': '#5a6254',   // The dark green text
        'tribute-sage': '#717d6a',    // The button color
        'tribute-sage-dark': '#5e6958', // Button hover color
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}