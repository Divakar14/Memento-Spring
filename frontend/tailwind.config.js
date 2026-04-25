export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        plum: {
          DEFAULT: '#2D1B2E',
          light: '#3d2540',
          shadow: '#241623',
        },
        coral: {
          DEFAULT: '#F76C6C',
          hover: '#f55252',
          light: '#fde8e8',
        },
        // Surfaces
        ivory: {
          DEFAULT: '#F5EDE5',
          dark: '#ece0d4',
        },
        // Borders & UI
        ash: '#CFCFCF',
        lavender: '#C3BABA',
        // Text
        graphite: '#2E2E2E',
        muted: '#888888',
        // Accents
        dusty: '#FFC93C',
        // Status
        'soft-green': '#7FB77E',
        'warm-red': '#D9534F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideUp: 'slideUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
