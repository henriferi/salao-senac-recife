/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: '#006B99',
        customOrange: '#F68B1F',
        hoverBlue: '#005B8C',
        hoverOrange: '##F68B1F',
        bgCards: 'rgba(173, 216, 230, 0.9)',
      },
    },
  },
  plugins: [],
};
