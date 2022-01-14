const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.gray,
        secondary: colors.blue,
        error: colors.red,
      },
      screens: {
        sm1: '414px',
        sm2: '375px',
        sm3: '320px',
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme, variants }) {
      const keys = ['primary', 'secondary']
      const styles = {}

      for (const key of keys) {
        for (const no in theme('colors')[key]) {
          const match = theme('colors')[key][no].match(/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/)
          const r = parseInt(match[1], 16)
          const g = parseInt(match[2], 16)
          const b = parseInt(match[3], 16)

          styles[`.glow-${key}-${no}`] = {
            '--tw-shadow': `0 0 10px rgba(${r}, ${g}, ${b}, var(--tw-bg-opacity))`,
            'box-shadow': 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
          }
        }
      }
      addUtilities(styles, { variants: ['hover', 'focus'] })
    }),

  ],
}
