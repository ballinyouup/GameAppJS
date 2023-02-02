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
      poppins: ['Poppins', 'Inter', 'system-ui'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      keyframes: {
        slideright: {
          '0%': { backgroundPosition: '1000px 0px' },
          '100%': { backgroundPosition: '0px 0px' }
        },
        slideup: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        }
      },
      animation: {
        slideright: 'slideright 20s linear infinite',
        slideup: 'slideup 200ms'
      },
      backgroundImage: {
        'bg-main': "url('/background.png')"
      }
    }
  },
  plugins: []
}
