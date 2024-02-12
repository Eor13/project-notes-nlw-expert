/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

