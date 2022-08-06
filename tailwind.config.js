const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,astro,ts,svelte}'],
  theme: {
    screens: {
      xs: '320px',
      ...screens
    },
    extend: {
      fontFamily: {
        monserrat: ['Montserrat', 'sans-serif']
      }
    }
  }
}
