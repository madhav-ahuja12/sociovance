/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#7C3AED',
          'violet-dark': '#6D28D9',
          'violet-light': '#8B5CF6',
          pink: '#EC4899',
          'pink-dark': '#DB2777',
          'pink-light': '#F472B6',
          orange: '#F97316',
          'orange-dark': '#EA580C',
          'orange-light': '#FB923C',
          lavender: '#EDE7F9',
          blush: '#FCE7F3',
          peach: '#FEF3E7',
          dark: '#1E1B29',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)',
        'btn-gradient': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'btn-gradient-hover': 'linear-gradient(135deg, #6D28D9 0%, #DB2777 100%)',
        'aurora-wash': 'linear-gradient(135deg, #EDE7F9 0%, #FCE7F3 50%, #FEF3E7 100%)',
        'aurora-wash-soft': 'linear-gradient(180deg, #FFFFFF 0%, #EDE7F9 40%, #FCE7F3 75%, #FEF3E7 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(236,72,153,0.08) 50%, rgba(249,115,22,0.08) 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(30, 27, 41, 0.05)',
        'card-hover': '0 12px 36px rgba(124, 58, 237, 0.15)',
        'glow': '0 0 35px rgba(236, 72, 153, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
