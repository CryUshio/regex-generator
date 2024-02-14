/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#303133',
        },
        sky: {
          100: '#66B1FF',
          200: '#409EFF',
          300: '#3375B9',
          400: '#3375B9',
          500: '#2A598A',
          600: '#2A598A',
          700: '#213D5B',
          800: '#1D3043',
          900: '#18222C',
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
