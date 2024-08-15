/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        texts:[ "Poppins", 'sans-serif'],
      },
      colors:{
        textColour:'#2C2C2C'
      }
    },
  },
  plugins: [],
}