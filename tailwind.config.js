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
      colors:{
        'dark-purple': '#081A51',
        'light-white': 'rgba(255, 255, 255, 0.18)',
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