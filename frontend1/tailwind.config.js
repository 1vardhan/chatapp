import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // ✅ This is what was missing

  daisyui:{
    themes:[
    "light",
    "dark",
    "cupcake",
    "retro"
    ]
  }
}



