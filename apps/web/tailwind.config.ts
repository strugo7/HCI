import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

/**
 * RTL note: use logical utilities everywhere (ms/me, ps/pe, start/end).
 * Never ml/mr, pl/pr, left/right — those break the moment direction flips.
 */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        // Heebo covers Hebrew and Latin in one family, so mixed-script lines
        // keep a single rhythm.
        sans: ['Heebo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        // Semantic colors for DSL callouts. Named by intent, not by hue, so a
        // rebrand never means editing a renderer component.
        learn: {
          definition: 'hsl(var(--learn-definition))',
          example: 'hsl(var(--learn-example))',
          analogy: 'hsl(var(--learn-analogy))',
          important: 'hsl(var(--learn-important))',
          warning: 'hsl(var(--learn-warning))',
          tip: 'hsl(var(--learn-tip))',
        },
        // The graph's unit hues. Numeric rather than named, because they mean
        // "the Nth unit the student selected" — the same unit takes a different
        // hue in a different selection, so a name would be a lie.
        graph: {
          1: 'hsl(var(--graph-1))',
          2: 'hsl(var(--graph-2))',
          3: 'hsl(var(--graph-3))',
          4: 'hsl(var(--graph-4))',
          5: 'hsl(var(--graph-5))',
        },
        // Required by shadcn's sidebar. Every token aliases one we already own
        // (see globals.css) — the sidebar is a surface in our navy palette, not
        // a second palette living next to it.
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
  plugins: [animate],
} satisfies Config;
