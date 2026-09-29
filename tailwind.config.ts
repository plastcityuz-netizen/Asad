import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0a0a0b', soft: '#16171a', mute: '#5c6066' },
        paper: { DEFAULT: '#ffffff', soft: '#f7f7f8', line: '#e7e8ea' },
      },
      fontFamily: { sans: ['var(--font-sans)', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,11,.04), 0 12px 32px -12px rgba(10,10,11,.14)',
        lift: '0 2px 4px rgba(10,10,11,.05), 0 28px 60px -20px rgba(10,10,11,.22)',
      },
      maxWidth: { shell: '1280px' },
    },
  },
  plugins: [],
};
export default config;
