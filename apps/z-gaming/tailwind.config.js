const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        primary: 'var(--brand-300)',
        text: {
          primary: 'var(--neutral-400)',
          secondary: 'var(--neutral-300)',
          invert: 'var(--neutral)',
          brand: 'var(--brand-300)',
          accent: 'var(--accent-200)',
          success: 'var(--status-100)',
          error: 'var(--status-200)',
          link: 'var(--status-300)',
        },
        icon: {
          primary: 'var(--neutral-400)',
          secondary: 'var(--neutral-300)',
          invert: 'var(--neutral)',
          brand: 'var(--brand-300)',
          accent: 'var(--accent-300)',
          success: 'var(--status-100)',
          error: 'var(--status-200)',
          link: 'var(--status-300)',
          grey: 'var(--neutral-500)',
        },
        surface: {
          primary: 'var(--neutral)',
          secondary: 'var(--neutral-100)',
          invert: 'var(--neutral-400)',
          brand: 'var(--brand-300)',
          brandLight: 'var(--brand-100)',
          accent: 'var(--accent-400)',
          accentLight: 'var(--accent-100)',
          success: 'var(--status-100)',
          error: 'var(--status-200)',
          link: 'var(--status-300)',
        },
        border: {
          primary: 'var(--neutral-300)',
          secondary: 'var(--neutral-200)',
          invert: 'var(--neutral)',
          brand: 'var(--brand-200)',
          accent: 'var(--accent-300)',
          success: 'var(--status-100)',
          error: 'var(--status-200)',
          link: 'var(--status-300)',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
