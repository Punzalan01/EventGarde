/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6E41E2',
          hover: '#5833B5',
        },
        lavender: {
          DEFAULT: '#F0EBFF',
          text: '#5833B5',
        },
        peach: {
          DEFAULT: '#FFF1E8',
        },
        heading: {
          DEFAULT: '#111827',
        },
      },
      boxShadow: {
        soft: '0 20px 40px -10px rgba(0,0,0,0.08), 0 10px 15px -5px rgba(0,0,0,0.03)',
        'soft-lg':
          '0 30px 60px -15px rgba(0,0,0,0.1), 0 15px 25px -8px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
