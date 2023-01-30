/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx}'],
  theme: {
    extend: {
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        }
      },
      animation: {
        slideup: 'slideup 1000ms'
      }
    }
  },
  plugins: []
}
