/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navbar:"#1f201d",
        background:"#2B2C28",
        textColour:"#EEEEEE",
        boxColour:"#009FFD"
      },
      fontFamily:{
        Raleway: ["Raleway", 'system-ui']
      }

    },
  },
  plugins: [],
}