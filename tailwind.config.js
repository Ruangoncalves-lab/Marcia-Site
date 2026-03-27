/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['"Roboto Condensed"', 'sans-serif'],
        script: ['"Gloria Hallelujah"', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Cores extraídas do home-1-pro.json
        accent: {
          primary: '#75AA22', // Verde
          hover: '#62931A',
          secondary: '#E9A805', // Amarelo/Dourado Escuro
          light: '#F4F7F5'
        },
        text: {
          primary: '#4F4333', // Marrom Escuro
          secondary: '#6E6252',
          muted: '#A59B8E',
          'on-accent': '#FFFFFF'
        },
        surface: {
          page: '#FFFFFF',
          card: '#FFFFFF',
          section: '#F9FAFA',
          'section-alt': '#F3EFE9',
          hero: '#F4F7F5'
        },
      },
      borderColor: {
        'border-default': '#E6E1DC',
      },
      borderRadius: {
        card: '20px',
        button: '30px',
        input: '12px',
        badge: '999px',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.06)',
        nav: '0 4px 20px rgba(0,0,0,0.05)',
        float: '0 15px 40px rgba(79, 67, 51, 0.1)',
      },
      fontSize: {
        hero: ['4rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 'bold' }],
        'section-title': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'section-subtitle': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        cta: ['1.125rem', { lineHeight: '1', fontWeight: '600' }],
      }
    },
  },
  plugins: [],
}
