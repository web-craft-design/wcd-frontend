/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#f5f2fb",
        100: "#ece6f8",
        200: "#cfbfed",
        300: "#b299e1",
        400: "#794dcb",
        DEFAULT: "#3f00b5",
        500: "#3f00b5",
        600: "#3900a3",
        700: "#2f0088",
        800: "#26006d",
        900: "#1f0059",
      },
    },
    extend: {},
  },
  plugins: [],
};
