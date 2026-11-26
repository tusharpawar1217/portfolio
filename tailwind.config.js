/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    fontFamily: {
      sans: ["var(--font-primary)", "'Poppins'", "sans-serif"],
      primary: ["var(--font-primary)", "'Poppins'", "sans-serif"],
      heading: ["var(--font-primary)", "'Poppins'", "sans-serif"],
      mono: ["'JetBrains Mono'", "monospace"],
    },
    extend: {
      colors: {
        primary: "#0d0b1e",
        secondary: "#15122b",
        accent: {
          DEFAULT: "#e91e8c",
          hover: "#ff4fa8",
          light: "#ff66bb",
          dark: "#cc0073",
          purple: "#7b5cff"
        },
        magenta: {
          DEFAULT: "#e91e8c",
          light: "#ff4fa8",
          dark: "#cc0073",
          glow: "#e91e8c"
        },
        purple: {
          DEFAULT: "#7b5cff",
          light: "#9d7fff",
          dark: "#5a3ccc"
        },
        muted: "#b8b5cc",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee-scroll": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        "pulse-green": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee-scroll 30s linear infinite",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
