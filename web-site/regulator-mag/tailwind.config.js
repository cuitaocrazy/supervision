const colors=require('tailwindcss/colors')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors:{
        primary:colors.gray,
        secondary:colors.blue,
        error:colors.red,
      }
    },
  },
  plugins: [],
}
