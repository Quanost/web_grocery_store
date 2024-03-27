/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Roboto', 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor:{
        main:'#469c4b'
      },
      color:{
        main:'#469c4b',
        primary: "#4A3AFF",
      }
    },
  },
  plugins: [],
  variants:{
    extend:{
      display:["focus-group"]
    }
  }
}