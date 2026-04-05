/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0B1220",
        foreground: "#E8EDF7",
        primary: {
          DEFAULT: "#4DA3FF",
          foreground: "#0B1220",
        },
        secondary: {
          DEFAULT: "#7C83FF",
          foreground: "#E8EDF7",
        },
        accent: {
          DEFAULT: "#B58CFF",
          foreground: "#E8EDF7",
        },
        muted: {
          DEFAULT: "#92A0B8",
          foreground: "#0B1220",
        },
        card: {
          DEFAULT: "#111B2E",
          foreground: "#E8EDF7",
        },
        success: "#34D399",
        warning: "#FBBF24",
        error: "#F87171",
      },
      borderRadius: {
        lg: "14px",
        md: "12px",
        sm: "10px",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
