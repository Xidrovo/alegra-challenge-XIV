/** @type {import('tailwindcss').Config} */
export default {
  // content: [],
  content: ['./Layouts/*.{html,js,vue}', './components/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01b19f',
          dark: '#009786'
        },
        secondary: {
          light: '#e9b4a8',
          DEFAULT: '#d36148',
          dark: '#a43f28'
        }
      }
    }
  },
  plugins: []
}
