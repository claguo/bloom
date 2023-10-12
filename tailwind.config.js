/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.75rem',
        base: '1rem',
        lg: '1.5rem',
        xl: '4rem'
      },
      fontFamily: {
        'sans': 'poppins',
        'mono': 'azeret mono'
      },
      colors: {
        'dark-gray': '#CDCAC8',
        'mid-gray': '#DDD9D5',
        'light-gray': '#ECE9E6',
        'blue': '#367BFA',
        'dark-blue': '#0043C5',
        'pink': '#ffc2e3'
      }
    },
  },
  plugins: [],
}

