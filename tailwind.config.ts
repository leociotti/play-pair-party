import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        // Cores específicas do jogo
        game: {
          primary: "hsl(var(--game-primary))",
          "primary-dark": "hsl(var(--game-primary-dark))",
          secondary: "hsl(var(--game-secondary))",
          accent: "hsl(var(--game-accent))",
          pink: "hsl(var(--game-pink))",
          purple: "hsl(var(--game-purple))",
          "card-back": "hsl(var(--card-back))",
          "card-shadow": "hsl(var(--card-shadow))",
          "text-light": "hsl(var(--game-text-light))",
          "text-dark": "hsl(var(--game-text-dark))",
          success: "hsl(var(--success))",
          warning: "hsl(var(--warning))",
          danger: "hsl(var(--danger))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-large)",
        "2xl": "calc(var(--radius-large) * 1.5)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-card": "var(--gradient-card)",
        "gradient-success": "var(--gradient-success)",
        "gradient-accent": "var(--gradient-accent)",
      },
      boxShadow: {
        "card": "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "button": "var(--shadow-button)",
        "success": "var(--shadow-success)",
      },
      fontFamily: {
        game: ["Comic Sans MS", "cursive", "sans-serif"],
      },
      transitionTimingFunction: {
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
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
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(90deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        "pulse-success": {
          "0%, 100%": { 
            transform: "scale(1)", 
            boxShadow: "var(--shadow-card)" 
          },
          "50%": { 
            transform: "scale(1.05)", 
            boxShadow: "var(--shadow-success)" 
          },
        },
        "bounce-in": {
          "0%": { 
            transform: "scale(0.3) rotate(-10deg)", 
            opacity: "0" 
          },
          "50%": { transform: "scale(1.1) rotate(5deg)" },
          "100%": { 
            transform: "scale(1) rotate(0deg)", 
            opacity: "1" 
          },
        },
        confetti: {
          "0%": { 
            transform: "translateY(-100vh) rotate(0deg)", 
            opacity: "1" 
          },
          "100%": { 
            transform: "translateY(100vh) rotate(720deg)", 
            opacity: "0" 
          },
        },
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flip: "flip 0.6s ease-in-out",
        "pulse-success": "pulse-success 0.8s ease-in-out",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        confetti: "confetti 3s linear infinite",
        rainbow: "rainbow 2s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
