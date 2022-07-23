/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'fancy': ['Lobster'],
        'roboto': ['Roboto'],
        'roboto-mono': ['"Roboto Mono"']
      },
      listStyleType: {
        'alpha': 'lower-alpha',
      },
      height: {
        'top-bar': '3rem'
      },
      transitionProperty: {
        'border': 'border-color',
        'height': 'height'
      }
    },
  },
  plugins: [],
}
