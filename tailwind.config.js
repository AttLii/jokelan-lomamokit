/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      aspectRatio: {
        "16/9": "16 / 9",
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
