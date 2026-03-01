export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // للعادي
        mono: ['Roboto Mono', 'monospace'], // للأرقام لو عايزة monospaced
        display: ['Poppins', 'sans-serif'], // للعناوين الكبيرة
      },
    },
  },
  plugins: [],
}