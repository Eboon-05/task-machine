const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'roboto': ['Roboto', fontFamily.sans],
                'varela': ['Varela', fontFamily.sans],
            }
        },
        colors: {
            'dark-blue': '#0A113C',
            white: '#FFF',
            'light-gray': '#f1f2f8',
            black: '#000',
            'light-blue': '#D6F2FF',
            'light-orange': '#FFE4C7',
            'light-red': '#FFCCD2',
        },
    },
    safelist: [
        { pattern: /^bg-light/ },
    ],
    plugins: [],
}
