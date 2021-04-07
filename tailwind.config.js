module.exports = {
  purge: [
    "./components/**/*.tsx",
    "./src/**/*.tsx",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./pages/**/*.tsx",
    "./pages/**/*.js",
  ],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
