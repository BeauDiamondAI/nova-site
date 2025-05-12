/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-headline)'],
      },
      animation: {
        'fade-in': 'fadeIn 4s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-up-fast': 'slideUp 0.5s ease-out forwards',
        'fadeInOut': 'fadeInOut 4s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '60%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
