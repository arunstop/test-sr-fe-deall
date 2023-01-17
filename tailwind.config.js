/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./ui/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        "sofia-sans": ["Sofia Sans"],
      },
      gap: {
        i: "inherit",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss/plugin")(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"])
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
          "--btn-text-case": "none",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.5rem",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=business]"],
          "--btn-text-case": "none",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.5rem",
        },
      },
    ],
  },
}
