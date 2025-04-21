/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tv-practical-api.vercel.app/api/:path*'
      }
    ]
  }
}

export default nextConfig
