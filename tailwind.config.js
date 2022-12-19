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
                roboto: ['Roboto', fontFamily.sans],
                varela: ['Varela', fontFamily.sans],
            },
        },
        colors: {
            'dark-blue': '#0A113C',
            white: '#FFF',
            'light-gray': '#f1f2f8',
            black: '#000',
            'light-blue': 'rgb(var(--light-blue))',
            'light-orange': 'rgb(var(--light-orange))',
            'light-red': 'rgb(var(--light-red))',
            blue: '#4B56D2',
            pink: '#ff5678',
            'dark-gray': '#2C3333',
            'red': '#DC0000',
        },
    },
    safelist: [{ pattern: /^bg-light/ }],
    plugins: [],
    darkMode: 'class',
}
