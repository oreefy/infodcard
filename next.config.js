/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.APP_URL || "https://www.infodcard.com",
  }
}

module.exports = nextConfig
