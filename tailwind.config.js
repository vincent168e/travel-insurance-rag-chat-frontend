/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bluecross: {
          dark: "#005691",
          light: "#007cc2",
          accent: "#e3f2fd",
        },
      },
    },
  },
  plugins: [],
};
