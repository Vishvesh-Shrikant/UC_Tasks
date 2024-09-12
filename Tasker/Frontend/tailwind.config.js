/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:"#1E212B",
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