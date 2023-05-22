const plugin = require("tailwindcss/plugin");

const backfaceVisibility = plugin(({ addUtilities }) => {
  addUtilities({
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

const transformStyle = plugin(({ addUtilities }) => {
  addUtilities({
    ".transform-style-preserve-3d": {
      "transform-style": "preserve-3d",
    },
  });
});

const rotateY = plugin(({ addUtilities }) => {
  addUtilities({
    ".rotate-y-0": {
      transform: "rotateY(0deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

const emptyHref = plugin(({ addVariant }) => {
  addVariant("empty-href", ['&[href=""]', '&[href="#"]']);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-cabin)"],
      display: ["var(--font-pt-sans)"],
    },
    extend: {
      aspectRatio: {
        "16/9": "16 / 9",
        "9/16": "9 / 16",
        "4/3": "4 / 3",
        "2/1": "2 / 1",
      },
      maxHeight: {
        "50rem": "50rem",
      },
    },
  },
  plugins: [backfaceVisibility, rotateY, transformStyle, emptyHref],
};
