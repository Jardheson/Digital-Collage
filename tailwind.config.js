/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        dark: "#1F1F1F",
        light: "#F5F5F5",
        "gray-text": "#474747",
        "light-gray": "#F9F8FE"
      }
    },
  },
  plugins: [],
}
