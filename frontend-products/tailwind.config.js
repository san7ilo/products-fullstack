/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router (Next.js <13)
    "./components/**/*.{js,ts,jsx,tsx}", // Componentes reutilizables
    "./src/**/*.{js,ts,jsx,tsx}",   // Asegura que todas las carpetas sean escaneadas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
