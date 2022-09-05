/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        half: '50%',
      },
      fontFamily: {
        'fancy': ['Lobster'],
        'roboto': ['Roboto', '"Proxima Nova"'],
        'roboto-mono': ['"Roboto Mono"', '"Courier New"', 'sans-serif'],
      },
      height: {
        'top-bar': '3rem',
      },
      listStyleType: {
        alpha: 'lower-alpha',
      },
      maxWidth: {
        image: '90%',
      },
      transitionProperty: {
        border: 'border-color',
        height: 'height',
      },
      // These values match the tailwind CSS media breakpoint values
      width: {
        large: '1024px',
        medium: '768px',
      },
    },
  },
  plugins: [],
};
