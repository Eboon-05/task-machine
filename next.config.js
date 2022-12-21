const withPWA = require('next-pwa')({
    dest: 'public',
    swSrc: 'sw.js'
})

module.exports = withPWA({
    reactStrictMode: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    i18n: {
        locales: ['en', 'es-AR', 'es',],
        defaultLocale: 'en',
    },
})
