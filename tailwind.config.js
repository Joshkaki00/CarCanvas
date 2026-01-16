/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern EV Theme
        automotive: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#7C3AED',  // Electric purple
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3B0764',
        },
        dashboard: {
          bg: '#F9FAFB',        // Light gray background
          card: '#FFFFFF',      // Pure white cards
          border: '#E5E7EB',    // Subtle borders
          muted: '#9CA3AF',     // Gray for muted text
        },
        gauge: {
          bg: '#F3F4F6',        // Light gauge background
          ring: '#E5E7EB',      // Light gauge ring
        },
        alert: {
          danger: '#EF4444',    // Red for warnings
          success: '#10B981',   // Emerald green (eco)
          warning: '#F59E0B',   // Amber
        },
        metallic: {
          silver: '#6B7280',    // Medium gray
          chrome: '#111827',    // Dark text
          dark: '#9CA3AF',      // Light gray
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
