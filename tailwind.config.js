/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#9F2B68',
          dark: '#7A1E4E'
        },
        cream: {
          DEFAULT: '#FFF8E1'
        },
        mint: {
          DEFAULT: '#98D8C8'
        },
        gold: {
          DEFAULT: '#F9A826'
        }
      }
    },
  },
  plugins: [],
};