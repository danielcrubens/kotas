import defaultTheme from 'tailwindcss/defaultTheme'

const colors =require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
       'lato': ['Lato', 'sans-serif'],
       sans: ["Lato", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'blue': {
        DEFAULT: '#003088',
      },
      'gray': {
        DEFAULT:'#E5E5E5',
        100: '#333',
      },
      'orange': {
        DEFAULT:'#f9ba02',
      },
      'link': {
        DEFAULT: '#007bff',
      },
       
      },
    },
    plugins: [],
  }
}