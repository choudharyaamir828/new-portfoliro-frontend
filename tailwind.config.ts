import type { Config } from 'tailwindcss'

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#07111f',
          elevated: '#0d1b2d',
          glass: 'rgba(11, 22, 37, 0.72)',
        },
        neon: {
          cyan: '#4b8bbe',
          magenta: '#ffd43b',
          violet: '#7fb3d5',
          lime: '#63d2a1',
          amber: '#ffde7a',
        },
        text: {
          primary: '#edf4ff',
          secondary: '#a7b8d0',
          muted: '#667993',
        },
        border: {
          glow: 'rgba(75, 139, 190, 0.26)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(75,139,190,0.3), 0 0 60px rgba(75,139,190,0.16)',
        'glow-magenta': '0 0 24px rgba(255,212,59,0.26), 0 0 60px rgba(255,212,59,0.14)',
        'glow-violet': '0 0 24px rgba(127,179,213,0.25), 0 0 60px rgba(127,179,213,0.14)',
        panel: '0 24px 80px rgba(2, 6, 24, 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.65', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.35)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(120%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)' },
          '20%': { clipPath: 'inset(20% 0 55% 0)' },
          '40%': { clipPath: 'inset(55% 0 15% 0)' },
          '60%': { clipPath: 'inset(10% 0 75% 0)' },
          '80%': { clipPath: 'inset(75% 0 5% 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -18px, 0) scale(1.03)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
        },
        beam: {
          '0%, 100%': { transform: 'translate3d(-8%, 0, 0) scaleX(0.98)', opacity: '0.38' },
          '50%': { transform: 'translate3d(8%, -3%, 0) scaleX(1.04)', opacity: '0.62' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmerx: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        scanline: 'scanline 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        glitch: 'glitch 1.8s steps(2, end) infinite',
        drift: 'drift 7s ease-in-out infinite',
        orbit: 'orbit 12s linear infinite',
        beam: 'beam 10s ease-in-out infinite',
        bob: 'bob 5s ease-in-out infinite',
        shimmerx: 'shimmerx 3.6s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(75,139,190,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(75,139,190,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
