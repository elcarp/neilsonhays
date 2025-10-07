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
        source: '/about/restauration',
        destination: '/restoration',
      },
      {
        source: '/venue-hire/spaces',
        destination: '/venue',
      },
      {
        source: '/venue-hire',
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
        source: '/event/:slug*',
        destination: '/events/:slug*',
      },
      {
        source: '/support/give',
        destination: '/give',
      },
      {
        source: '/membership-application',
        destination: '/membership',
      },
      {
        source: '/membership-shop',
        destination: '/membership',
      },
    ]
  },
}

export default nextConfig
