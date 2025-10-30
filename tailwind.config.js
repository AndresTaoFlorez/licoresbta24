export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#33623d', // Main brand color
            600: '#2d5536',
            700: '#27482f',
            800: '#1f3725',
            900: '#16261b',
          },
          accent: {
            50: '#f0fdf4',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#91d5a0', // Accent color
            600: '#7bc28c',
            700: '#5ca570',
            800: '#468553',
            900: '#2b5e2c',
          },
          dark: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#141b05', // Text dark
            600: '#0f1404',
            700: '#0a0e03',
            800: '#050702',
            900: '#000000',
          },
        },
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'brand': '0 4px 20px rgba(51, 98, 61, 0.15)',
        'brand-lg': '0 8px 30px rgba(51, 98, 61, 0.25)',
      },
      borderRadius: {
        'brand': '1rem',
        'brand-lg': '1.5rem',
      },
    },
  },
  plugins: [],
};
