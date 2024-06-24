/** @type {import('next').NextConfig} */
const nextConfig = {
  // # Dùng next.config.js
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  trailingSlash: true,
  eslint: {
    dirs: ["."],
  },
};

module.exports = nextConfig;
