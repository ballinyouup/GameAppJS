/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      poppins: ['poppins'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
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
