/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules?.push({
      test: /\/(database|uploads|public)\//,
      loader: "null-loader",
    });
    return config;
  },
}

module.exports = nextConfig
