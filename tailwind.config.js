/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-cyan': '#0891b2',
        'accent-purple': '#7c3aed',
        'accent-pink': '#db2777',
        'accent-green': '#059669',
        'accent-blue': '#2563eb',
        'accent-orange': '#d97706',
        'accent-red': '#dc2626',
      },
    },
  },
  plugins: [
    require('tailwindcss-primeui')
  ],
}
