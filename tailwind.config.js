module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'epilogue': ['Epilogue', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains-mono': ['Jetbrains Mono', 'monospace']
      },
      colors: {
        'custom-title': '#031b4e',
        'custom-subtitle': '#021335',
        'custom-toc': '#5b6987',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
