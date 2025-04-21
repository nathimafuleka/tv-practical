/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tv-practical-api.vercel.app/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig
