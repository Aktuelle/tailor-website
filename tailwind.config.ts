import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Klin Clothing palette - Teal/Dark Green & White
        primary: { DEFAULT: '#2D5A5A', light: '#4A7C7C', dark: '#1F3F3F' },
        accent:  { DEFAULT: '#FFFFFF', light: '#F5F5F5', dark: '#E8E8E8' },
        gold:    { DEFAULT: '#D4AF37', light: '#F0C94A', dark: '#A0832A' },
        earth:   { DEFAULT: '#8B5E3C', light: '#B07D52', dark: '#5E3E27' },
        cream:   { DEFAULT: '#FAF3E0', dark: '#EDE0C8' },
        charcoal:{ DEFAULT: '#1C1C1E', light: '#2E2E30' },
        wax: {
          red:    '#C0392B',
          blue:   '#1A6FA8',
          orange: '#E67E22',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wax-pattern': "url('/images/wax-pattern.svg')",
      },
      animation: {
        'fade-in':     'fadeIn 0.6s ease-out forwards',
        'slide-up':    'slideUp 0.6s ease-out forwards',
        'float':       'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' },               '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}
export default config
