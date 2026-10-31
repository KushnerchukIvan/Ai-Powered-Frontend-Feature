import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#191919',
        muted: '#77756f',
        paper: '#f7f6f2',
        line: '#e7e5df',
        accent: '#526b54',
      },
      fontFamily: { sans: ['Arial', 'Helvetica', 'sans-serif'], serif: ['Georgia', 'serif'] },
    },
  },
  plugins: [],
};
export default config;
