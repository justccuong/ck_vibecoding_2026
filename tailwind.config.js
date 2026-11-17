/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        starbucks: {
          green: '#006241',         // Primary Starbucks Green
          accent: '#00754A',        // Accent Green
          dark: '#1E3932',          // Deep Forest / House Green
          mint: '#D4E9E2',          // Light Mint Green
          mintLight: '#F1F8F5',     // Soft Mint Background
          cream: '#F7F5F0',         // Warm Cream Background
          warmNeutral: '#F2F0EB',   // Redesign Warm Neutral
          lime: '#7EC518',          // Redesign Vibrant Lime Green
          darkGray: '#78797B',      // Redesign Dark Gray
          gray: '#A9A9A9',          // Redesign Gray
          gold: '#D4AF37',          // Starbucks Gold
          goldDark: '#AA820A',
          goldLight: '#F3E5AB',
          bronze: '#8C5A3C',
          bronzeDark: '#5C3A21',
          silver: '#94A3B8',
          silverDark: '#475569',
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
