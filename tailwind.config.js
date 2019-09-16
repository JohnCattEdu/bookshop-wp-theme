const brandPalette = require('@ky-is/tailwind-color-palette');

module.exports = {
    theme: {
        extend: {
            colors: {
                ...brandPalette('#961637', { grayscale: true }),
                ...brandPalette('#112d45', { name: 'accent' }),
                'white-faded': {
                    '100': 'rgba(255, 255, 255, 0.1)',
                    '200': 'rgba(255, 255, 255, 0.2)',
                    '300': 'rgba(255, 255, 255, 0.3)',
                    '400': 'rgba(255, 255, 255, 0.4)',
                    '500': 'rgba(255, 255, 255, 0.5)',
                    '600': 'rgba(255, 255, 255, 0.6)',
                    '700': 'rgba(255, 255, 255, 0.7)',
                    '800': 'rgba(255, 255, 255, 0.8)',
                    '900': 'rgba(255, 255, 255, 0.9)',
                },
            },
            fontFamily: {
                // display: ['DM Serif Display', 'serif'],
                display: ['Literata', 'serif'],
            },
            lineHeight: {
                tighter: 1.125,
            },
            spacing: {
                96: '24rem',
            },
            boxShadow: {
                cart: '0 0 12px 0 rgba(0, 0, 0, 0.3)',
            },
        }
    },
    variants: {},
    plugins: []
}
