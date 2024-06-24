/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
  },
}

module.exports = nextConfig
