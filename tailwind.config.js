/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF3E6',
        brown: {
          dark: '#554641',
          deep: '#5A2B20',
        },
        gold: {
          muted: '#C9A961',
          light: '#FBD8B1',
        },
        accent: '#E5C7A4',
        text: '#E7E7E7',
      },
      fontFamily: {
        serif: ['Yeseva One', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
