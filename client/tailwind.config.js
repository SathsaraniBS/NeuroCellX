/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                // Luxury Gold Palette
                gold: {
                    100: '#FBF5D5', // Pale Champagne
                    200: '#F3E5AB', // Light Gold
                    300: '#EBD581', // Soft Gold
                    400: '#D4AF37', // Classic Gold (Primary)
                    500: '#C5A028', // Rich Gold
                    600: '#AA8518', // Deep Gold
                    700: '#8A6A0A', // Bronze
                    800: '#4F3D03', // Dark Bronze
                    900: '#2A2000', // Blackened Gold
                },
                luxury: {
                    50: '#F9FAFB', // Light Mode Bg
                    100: '#F3F4F6',
                    800: '#151515', // Card Dark
                    900: '#0A0A0A', // Deepest Black
                    950: '#050505', // Void
                },
                // Allias cinema to new luxury colors for backward compatibility during refactor
                cinema: {
                    100: '#FBF5D5', // gold-100
                    200: '#F3E5AB', // gold-200
                    300: '#EBD581', // gold-300
                    400: '#D4AF37', // gold-400
                    500: '#C5A028', // gold-500
                    600: '#AA8518',
                    700: '#8A6A0A',
                    800: '#151515', // luxury-800
                    900: '#0A0A0A', // luxury-900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'], // New Luxury Font
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
            },
            boxShadow: {
                'glass-light': '0 8px 30px rgba(0, 0, 0, 0.05)',
                'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.5)',
            },
            dropShadow: {
                'gold-glow': '0 0 8px rgba(212, 175, 55, 0.4)',
            },
            animation: {
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'shine': 'shine 2s linear infinite', // For gold shimmer
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shine: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                }
            },
        },
    },
    plugins: [],
}
