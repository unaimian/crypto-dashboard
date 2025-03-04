/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'alert-cheap': '#8a5cf7', // Purple color for cheap alerts
        'alert-solid': '#10b981', // Green color for solid alerts
        'alert-big': '#c026d3', // Magenta color for big alerts
      },
    },
  },
  plugins: [],
};
