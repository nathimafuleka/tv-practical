/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tv-practical-api.vercel.app/api/:path*',
      },
    ]
  },
  typescript: {
    // We'll handle type checking in CI/CD
    ignoreBuildErrors: true,
  },
  eslint: {
    // We'll handle linting in CI/CD
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
