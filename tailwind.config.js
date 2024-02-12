import defaultTheme from 'tailwindcss/defaultTheme'


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
       'mulish': ['Mulish', 'sans-serif'],
       sans: ["Mulish", ...defaultTheme.fontFamily.sans]
      },
    },
    plugins: [],
  }
}