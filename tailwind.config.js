module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        _blue: "#185adb",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      fontWeight: ["hover", "group-hover"],
    },
  },
  plugins: [],
};
