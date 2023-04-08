/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ['"cabin"'],
    },
    extend: {
      aspectRatio: {
        "16/9": "16 / 9",
        "9/16": "9 / 16",
      },
      maxHeight: {
        "50rem": "50rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
