import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeDark: {
          DEFAULT: '#18181b'
        },
        themeLight: {
          DEFAULT: '#EDF1F8',
          secondary: '#B0B0B0'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
