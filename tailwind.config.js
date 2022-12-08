/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
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
    plugins: [],
};
