/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbf0',
          100: '#fef5d6',
          200: '#fce7a8',
          300: '#f9d270',
          400: '#f5b938',
          500: '#d49419',
          600: '#b87510',
          700: '#935510',
          800: '#794314',
          900: '#673715',
        },
        royal: {
          maroon: '#680c1d',
          crimson: '#8b1329',
          ruby: '#580816',
          deepGold: '#c59a3f',
          saffron: '#e86a17',
          sky: '#1e6bb8',
          ivory: '#faf6f0',
          parchment: '#f7f1e5',
        }
      },
      fontFamily: {
        devanagari: ['"Yatra One"', '"Tiro Devanagari Hindi"', '"Rozha One"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cinzelDeco: ['"Cinzel Decorative"', 'serif'],
        garamond: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
