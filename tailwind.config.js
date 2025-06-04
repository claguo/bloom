/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "0.875rem",
        base: "1rem",
        lg: "1.5rem",
        xl: "4rem",
      },
      fontFamily: {
        sans: ["Mori", "sans-serif"],
        mono: "Mondwest",
      },
      colors: {
        "bg-green": "#325636",
        "bg-neutral": "#F6F6FA",
        "bg-selected": "#E8E8E8",
        "bg-hovered": "#EDEDED",
        "bg-pressed": "#E4E3E2",

        "element-green": "#526D4C",

        "text-default": "#0F661B",
        "text-subtle": "#526D4C",
        "text-inverse": "#F6F6FA",
        "text-inverse-subtle": "#BCCCBA",
        "element-neutral": "#E8E8E8",
        blue: "#367BFA",
        "dark-blue": "#0043C5",
        pink: "#ffc2e3",
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
