/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Primary Teal/Cyan Palette (main brand color)
                teal: {
                    50:  '#E0FAFA',
                    100: '#B3F2F2',
                    200: '#80E8E8',
                    300: '#4DDDDD',
                    400: '#00D4D4', // Primary Cyan
                    500: '#00BFBF', // Main Brand Teal
                    600: '#00A3A3',
                    700: '#008080', // Deep Teal
                    800: '#005F5F',
                    900: '#003D3D',
                },
                // Cyan/Aqua Accent (buttons, highlights)
                cyan: {
                    50:  '#E0FFFF',
                    100: '#B3FAFA',
                    200: '#7FF5F5',
                    300: '#3FEFEF',
                    400: '#00E5FF', // Bright Cyan Accent
                    500: '#00CFCF',
                    600: '#00B2B2',
                    700: '#008E8E',
                    800: '#006A6A',
                    900: '#004545',
                },
                // Green Accent (SOH healthy, positive indicators)
                volt: {
                    50:  '#EAFFF4',
                    100: '#C3FFE0',
                    200: '#8DFFC3',
                    300: '#4DFFA0',
                    400: '#00FF7F', // Neon Green (RUL good)
                    500: '#00E070',
                    600: '#00B85C',
                    700: '#008C45',
                    800: '#006030',
                    900: '#003D1F',
                },
                // Yellow/Amber (warnings, moderate risk)
                amber: {
                    50:  '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                },
                // Dark Navy/Slate backgrounds (main app background)
                navy: {
                    50:  '#E8EDF5',
                    100: '#C5D0E0',
                    200: '#9AAFC8',
                    300: '#6F8DB0',
                    400: '#4A6E98',
                    500: '#2A4F7F',
                    600: '#1E3A5F',
                    700: '#152B47',  // Sidebar bg
                    800: '#0F1F33',  // Card bg
                    900: '#0A1628',  // Main dark bg
                    950: '#060D1A',  // Deepest bg
                },
                // Card / surface colors
                dark: {
                    50:  '#2A3A4A',
                    100: '#243040',
                    200: '#1E2A38',
                    300: '#192330',  // Card surface
                    400: '#141C28',  // Elevated card
                    500: '#0F1720',  // Page bg
                    600: '#0B1219',
                    700: '#070D12',
                    800: '#04080D',
                    900: '#020408',
                },
                // Status colors
                status: {
                    healthy:  '#00FF7F',  // Green - good battery
                    moderate: '#FBBF24',  // Yellow - moderate risk
                    critical: '#EF4444',  // Red - critical
                    info:      '#00E5FF',  // Cyan - info
                },
            },
            fontFamily: {
                sans:    ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                mono:    ['JetBrains Mono', 'monospace'], // For data/metrics
            },
            backgroundImage: {
                'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
                // Main dark background gradient (matches your screenshots)
                'ev-bg':             'linear-gradient(135deg, #0A1628 0%, #0F1F33 50%, #0A1628 100%)',
                // Teal glow effect
                'teal-glow':         'radial-gradient(circle at 50% 50%, rgba(0, 212, 212, 0.12) 0%, transparent 60%)',
                // Card gradient
                'card-gradient':     'linear-gradient(145deg, #1E2A38 0%, #152B47 100%)',
                // Button gradient (cyan to teal)
                'btn-primary':       'linear-gradient(90deg, #00E5FF 0%, #00BFBF 100%)',
                // Sidebar gradient
                'sidebar-gradient':  'linear-gradient(180deg, #0F1F33 0%, #0A1628 100%)',
                // Hero section gradient
                'hero-gradient':     'linear-gradient(135deg, #060D1A 0%, #0F1F33 40%, #152B47 100%)',
            },
            boxShadow: {
                'teal-glow':    '0 0 20px rgba(0, 212, 212, 0.3)',
                'teal-sm':      '0 0 10px rgba(0, 212, 212, 0.2)',
                'teal-lg':      '0 0 40px rgba(0, 212, 212, 0.4)',
                'card-dark':    '0 4px 24px rgba(0, 0, 0, 0.4)',
                'card-hover':   '0 8px 32px rgba(0, 212, 212, 0.15)',
                'btn-glow':     '0 4px 15px rgba(0, 229, 255, 0.4)',
                'sidebar':      '4px 0 24px rgba(0, 0, 0, 0.3)',
                'glass':        '0 8px 32px rgba(0, 0, 0, 0.3)',
            },
            dropShadow: {
                'teal-glow':  '0 0 8px rgba(0, 212, 212, 0.5)',
                'cyan-glow':  '0 0 12px rgba(0, 229, 255, 0.6)',
                'green-glow': '0 0 8px rgba(0, 255, 127, 0.5)',
            },
            borderColor: {
                DEFAULT: '#1E2A38',
            },
            animation: {
                'slide-up':     'slideUp 0.8s ease-out forwards',
                'slide-in':     'slideIn 0.5s ease-out forwards',
                'fade-in':      'fadeIn 0.5s ease-out forwards',
                'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-teal':   'pulseTeal 2s ease-in-out infinite',
                'float':        'float 6s ease-in-out infinite',
                'glow':         'glow 2s ease-in-out infinite alternate',
                'shimmer':      'shimmer 2s linear infinite',
                'scan-line':    'scanLine 3s linear infinite',
            },
            keyframes: {
                slideUp: {
                    '0%':   { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)',    opacity: '1' },
                },
                slideIn: {
                    '0%':   { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)',      opacity: '1' },
                },
                fadeIn: {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%':      { transform: 'translateY(-10px)' },
                },
                pulseTeal: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(0, 212, 212, 0.2)' },
                    '50%':      { boxShadow: '0 0 25px rgba(0, 212, 212, 0.5)' },
                },
                glow: {
                    '0%':   { textShadow: '0 0 10px rgba(0, 212, 212, 0.5)' },
                    '100%': { textShadow: '0 0 20px rgba(0, 229, 255, 0.9), 0 0 40px rgba(0, 212, 212, 0.4)' },
                },
                shimmer: {
                    '0%':   { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition:  '200% center' },
                },
                scanLine: {
                    '0%':   { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
            },
            // Border radius
            borderRadius: {
                'xl':  '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
            // Backdrop blur
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}