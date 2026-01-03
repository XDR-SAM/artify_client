import daisyui from 'daisyui';
import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#f3b519',
          dark: '#d9a515',
          soft: '#f8e3a6',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f7f7fb',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        display: ['"Poppins"', ...fontFamily.sans],
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'noise-light': 'radial-gradient(circle at 1px 1px, rgba(243,181,25,0.12) 1px, transparent 0)',
        'noise-dark': 'radial-gradient(circle at 1px 1px, rgba(243,181,25,0.18) 1px, transparent 0)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
  },
} satisfies Config;

export default config;

