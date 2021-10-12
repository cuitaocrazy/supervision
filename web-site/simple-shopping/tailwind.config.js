const colors=require('tailwindcss/colors')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary:colors.gray,
        secondary:colors.blue,
        error:colors.red
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
