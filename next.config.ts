import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.neilsonhayslibrary.org',
      },
    ],
    domains: [
      'images.unsplash.com',
      'assets.aceternity.com',
      'store.neilsonhayslibrary.org',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/about/history',
        destination: '/history',
      },
    ]
  },
}

export default nextConfig
