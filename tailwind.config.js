/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c7ff",
          300: "#66abff",
          400: "#338fff",
          500: "#0066ff", // Primary blue
          600: "#0052cc",
          700: "#003d99",
          800: "#002966",
          900: "#001433",
        },
        orange: {
          50: "#fff2e6",
          100: "#ffe6cc",
          200: "#ffcc99",
          300: "#ffb366",
          400: "#ff9933",
          500: "#ff6600", // Secondary orange
          600: "#cc5200",
          700: "#993d00",
          800: "#662900",
          900: "#331400",
        },
      },
      
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
