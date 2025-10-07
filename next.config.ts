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
      {
        source: '/venue-hire/spaces',
        destination: '/venue',
      },
      {
        source: '/support/volunteer',
        destination: '/volunteer',
      },
      {
        source: '/about/operations',
        destination: '/operations',
      },
      {
        source: '/event/book-sale',
        destination: '/events/book-sale',
      },
    ]
  },
}

export default nextConfig
