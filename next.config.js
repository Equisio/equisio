/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'nl'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
}

module.exports = nextConfig
