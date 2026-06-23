/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#E8572A',
          secondary: '#2A2A2A',
          accent:    '#F4C430',
        },
        surface: {
          light: '#FFF8F3',
          card:  '#FFFFFF',
        },
        text: {
          primary: '#1A1A1A',
          muted:   '#6B7280',
        },
        status: {
          success: '#16A34A',
          danger:  '#DC2626',
          border:  '#E5E7EB',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body:    ['Inter', 'sans-serif'],
        arabic:  ['Tajawal', 'sans-serif'],
      },
      animation: {
        'fab-pulse': 'fabPulse 0.6s ease-out',
        'fade-in':   'fadeIn 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left':  'slideInLeft 0.3s ease-out',
        'step-pulse': 'stepPulse 1.5s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2.5s ease-in-out infinite',
        'scale-up': 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fabPulse: {
          '0%':   { boxShadow: '0 0 0 0 rgba(232,87,42,0.7)', transform: 'scale(1)' },
          '50%':  { boxShadow: '0 0 0 16px rgba(232,87,42,0)', transform: 'scale(1.12)' },
          '100%': { boxShadow: '0 0 0 0 rgba(232,87,42,0)', transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
        stepPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(232,87,42,0.5)' },
          '50%':      { opacity: '0.85', boxShadow: '0 0 0 8px rgba(232,87,42,0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scaleUp: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
