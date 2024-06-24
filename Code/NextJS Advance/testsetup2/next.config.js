/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  trailingSlash: true,
  eslint: {
    dirs: ["."],
  },
};

module.exports = nextConfig;
