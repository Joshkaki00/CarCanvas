/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Automotive Dashboard Theme
        automotive: {
          50: '#E6F7FF',
          100: '#BAE7FF',
          200: '#91D5FF',
          300: '#69C0FF',
          400: '#40A9FF',
          500: '#00A8FF',  // Primary electric blue
          600: '#0089D0',
          700: '#006BA1',
          800: '#004D73',
          900: '#003044',
        },
        dashboard: {
          bg: '#0C0F13',        // Near-black background
          card: '#1A1D23',      // Card background
          border: '#2A2D35',    // Borders
          muted: '#3A3D45',     // Muted elements
        },
        gauge: {
          bg: '#1E2228',        // Gauge background
          ring: '#2A2D35',      // Gauge ring
        },
        alert: {
          danger: '#FF3860',    // Red for warnings
          success: '#00E676',   // Green for success/eco
          warning: '#FFB020',   // Amber for caution
        },
        metallic: {
          silver: '#C0C0C0',
          chrome: '#E8E8E8',
          dark: '#8A8A8A',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 168, 255, 0.5)',
        'glow-blue-sm': '0 0 10px rgba(0, 168, 255, 0.3)',
        'glow-red': '0 0 15px rgba(255, 56, 96, 0.5)',
        'glow-green': '0 0 15px rgba(0, 230, 118, 0.5)',
        'dashboard': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        digital: ['"Orbitron"', '"Rajdhani"', 'monospace'],
        display: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dashboard': 'linear-gradient(135deg, #0C0F13 0%, #1A1D23 100%)',
      },
    },
  },
}
