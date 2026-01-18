import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        romantic: {
          rose: "hsl(var(--romantic-rose))",
          blush: "hsl(var(--romantic-blush))",
          peach: "hsl(var(--romantic-peach))",
          gold: "hsl(var(--romantic-gold))",
          cream: "hsl(var(--romantic-cream))",
          deep: "hsl(var(--romantic-deep))",
          mauve: "hsl(var(--romantic-mauve))",
          soft: "hsl(var(--romantic-soft))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "unlock": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.15) rotate(-8deg)" },
          "50%": { transform: "scale(1.25) rotate(8deg)" },
          "75%": { transform: "scale(1.1) rotate(-4deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        "reveal": {
          "0%": { opacity: "0", transform: "scale(0.8) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.15)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.1)" },
          "60%": { transform: "scale(1)" },
        },
        "slide-image": {
          "0%": { opacity: "0", transform: "translateX(100%) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(2deg)" },
          "66%": { transform: "translateY(-5px) rotate(-2deg)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "unlock": "unlock 0.8s ease-out",
        "reveal": "reveal 0.8s ease-out forwards",
        "heart-beat": "heart-beat 1.8s ease-in-out infinite",
        "slide-image": "slide-image 0.6s ease-out forwards",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
