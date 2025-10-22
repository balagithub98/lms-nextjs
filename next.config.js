/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/index.html',
      },
    ]
  },
}

module.exports = nextConfig
