/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Automotive Dashboard Theme - IMPROVED CONTRAST
        automotive: {
          50: '#E0F4FF',
          100: '#B8E6FF',
          200: '#8DD8FF',
          300: '#5EC9FF',
          400: '#2BB9FF',
          500: '#0EA5E9',  // Brighter primary blue
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        dashboard: {
          bg: '#0F172A',        // Lighter dark blue (better contrast)
          card: '#1E293B',      // Lighter card background
          border: '#334155',    // Much lighter borders (visible)
          muted: '#475569',     // Lighter muted elements
        },
        gauge: {
          bg: '#1E293B',        // Gauge background
          ring: '#334155',      // Gauge ring
        },
        alert: {
          danger: '#EF4444',    // Brighter red
          success: '#10B981',   // Brighter green
          warning: '#F59E0B',   // Brighter amber
        },
        metallic: {
          silver: '#E2E8F0',    // Much lighter silver
          chrome: '#F1F5F9',    // Nearly white
          dark: '#94A3B8',      // Lighter gray
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
