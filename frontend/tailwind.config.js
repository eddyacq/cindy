/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff', 100: '#e0effe', 200: '#bae0fd', 300: '#7cc8fb',
          400: '#36abf6', 500: '#0c8ee7', 600: '#0171c5', 700: '#01599f',
          800: '#064c83', 900: '#0b406d', 950: '#072849',
        },
        accent: {
          50: '#fff8f0', 100: '#ffefd4', 200: '#ffdba8', 300: '#ffc070',
          400: '#ff9a37', 500: '#ff7d10', 600: '#f06006', 700: '#c74807',
          800: '#9e390d', 900: '#7f300f', 950: '#451604',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
