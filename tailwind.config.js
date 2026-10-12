/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{astro,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF225A',
        secondary: '#18D6CC',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-merriweather)', ...defaultTheme.fontFamily.serif]
      },
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [],
}
