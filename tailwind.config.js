/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Échelle très contrastée : titres monumentaux, texte posé
        'hero': ['clamp(2.6rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.045em' }],
        'display': ['clamp(2.1rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'title': ['clamp(1.75rem, 2.8vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'subtitle': ['clamp(1.25rem, 1.8vw, 1.5rem)', { lineHeight: '1.3' }],
        'lede': ['1.1875rem', { lineHeight: '1.6' }],
      },
      colors: {
        // Identité PRECISIONS en noir et blanc, comme le logo.
        // Les anciens noms (navy, gold, métiers) sont conservés et pointent vers des gris,
        // pour que toutes les pages existantes basculent en monochrome.
        navy: {
          950: '#000000',
          900: '#0A0A0A',
          800: '#1C1C1C',
          700: '#2E2E2E',
          200: '#D4D4D4',
          100: '#EBEBEB',
          50: '#F5F5F5',
        },
        gold: {
          // DEFAULT s'adapte au fond : gris foncé sur fond clair, gris clair sur fond noir
          DEFAULT: 'rgb(var(--gold-text) / <alpha-value>)',
          // Gris moyen : visible sur fond blanc comme sur fond noir
          200: '#E5E5E5',
          300: '#BDBDBD',
          400: '#A3A3A3',
          600: '#8A8A8A',
          700: '#525252',
        },
        comm: { DEFAULT: '#0A0A0A', 700: '#0A0A0A', 50: '#F2F2F2' },
        fin: { DEFAULT: '#0A0A0A', 700: '#0A0A0A', 50: '#F2F2F2' },
        digital: { DEFAULT: '#0A0A0A', 700: '#0A0A0A', 50: '#F2F2F2' },
        training: { DEFAULT: '#0A0A0A', 700: '#0A0A0A', 50: '#F2F2F2' },
        advice: { DEFAULT: '#0A0A0A', 700: '#0A0A0A', 50: '#F2F2F2' },
        ink: '#0A0A0A',
        mist: '#F4F4F4',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Rayons resserrés : un site « de précision », pas des bulles
        xl: '0.625rem',
        '2xl': '0.75rem',
        '3xl': '1rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
