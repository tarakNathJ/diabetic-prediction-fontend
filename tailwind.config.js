/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        breathing: 'breathing 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'card-enter': 'cardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'card-exit': 'cardExit 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'brightness(1) blur(20px)' },
          '50%': { filter: 'brightness(1.2) blur(25px)' },
        },
        cardEnter: {
          from: { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        cardExit: {
          from: { opacity: '1', transform: 'translateY(0) scale(1)' },
          to: { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};