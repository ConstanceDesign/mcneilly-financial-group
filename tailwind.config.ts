module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Ensure Vite knows which files to scan for Tailwind CSS classes
  ],
  theme: {
    extend: { 
      colors: {
        'brand-darkgreen': '#0f5028',
        'brand-lightgreen': '#8cbe3f',
        'brand-gray': '#9b9da0',
      },
},
  },
  plugins: [],
}
