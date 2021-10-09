const colors=require('tailwindcss/colors')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      primaryColor:colors.gray,
      secondaryColor:colors.blue,
      errorColor:colors.red,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
