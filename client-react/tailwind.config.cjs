/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bc-s-darkblue": "#282A3A",
        "bc-m-darkblue": "#1E202D",
        "bc-darkblue": "#0B0B15",
        "bc-violet": {
          500: "#5F7CD9",
          900: "#5F7CF9",
        },
        "bc-danger": "#CA4343",
        "bc-white": "#FFFFFF",
      },
      ringColor: {
        DEFAULT: "",
      },
    },
  },
  plugins: [],
};
