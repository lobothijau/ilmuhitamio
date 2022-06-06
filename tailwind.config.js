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
      },
      colors: {
        'custom-title': '#031b4e',
        'custom-sub-title': '#4d5b7c',
        'custom-toc': '#5b6987',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
