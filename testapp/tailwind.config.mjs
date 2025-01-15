/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        active: "0 0 45.9px #FF2F54",
        base: "0 0 45.9px rgba(0, 0, 0, 0.40)"
      }
    },
  },
  plugins: [],
};
