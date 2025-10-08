// Alternative API route that tries different approaches to bypass security
import { NextRequest, NextResponse } from 'next/server'
import { WcProduct } from '@/lib/woocommerce'

export interface ProductsResponse {
  products: WcProduct[]
  total: number
  totalPages: number
  currentPage: number
}

interface ApiApproach {
  name: string
  url: string
  headers: Record<string, string>
}

interface ErrorResponse {
  error: string
  suggestion?: string
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductsResponse | ErrorResponse>> {
  try {
    const consumerKey = process.env.WC_CONSUMER_KEY
    const consumerSecret = process.env.WC_CONSUMER_SECRET
    const wcUrl = process.env.WC_URL || 'https://store.neilsonhayslibrary.org'

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'WooCommerce API credentials not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '20')

    // Try different approaches in order of preference
    const approaches: ApiApproach[] = [
      {
        name: 'Standard REST API',
        url: `${wcUrl}/wp-json/wc/v3/products`,
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; NeilsonHaysLibrary/1.0)',
        },
      },
      {
        name: 'Legacy API',
        url: `${wcUrl}/wc-api/v3/products`,
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
          'User-Agent': 'WooCommerce-API-Client/1.0',
        },
      },
      {
        name: 'Query Parameter Auth',
        url: `${wcUrl}/wp-json/wc/v3/products?consumer_key=${encodeURIComponent(consumerKey)}&consumer_secret=${encodeURIComponent(consumerSecret)}`,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WordPress/6.0',
        },
      },
    ]

    for (const approach of approaches) {
      try {
        console.log(`Trying ${approach.name}...`)

        const queryParams = new URLSearchParams({
          page: page.toString(),
          per_page: perPage.toString(),
          status: 'publish',
        })

        const fullUrl = approach.url.includes('?')
          ? `${approach.url}&${queryParams.toString()}`
          : `${approach.url}?${queryParams.toString()}`

        const response = await fetch(fullUrl, {
          headers: approach.headers,
          next: { revalidate: 300 },
        })

        console.log(`${approach.name} response: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          
          // Ensure we have an array of products
          const products: WcProduct[] = Array.isArray(data) ? data : []
          const totalProducts = parseInt(
            response.headers.get('X-WP-Total') || products.length.toString()
          )
          const totalPages = parseInt(
            response.headers.get('X-WP-TotalPages') || '1'
          )

          console.log(
            `Success with ${approach.name}! Got ${products.length} products`
          )

          return NextResponse.json({
            products: products.filter(p => p.status === 'publish'),
            total: totalProducts,
            totalPages,
            currentPage: page,
          })
        } else {
          console.log(`${approach.name} failed with status: ${response.status}`)
        }
      } catch (error) {
        console.log(`${approach.name} failed:`, error instanceof Error ? error.message : 'Unknown error')
        continue
      }
    }

    // If all approaches fail, return a helpful error
    return NextResponse.json(
      {
        error:
          'All API approaches failed. Really Simple Security may be blocking API access.',
        suggestion:
          'Contact your hosting provider or plugin support to whitelist API access.',
      },
      { status: 403 }
    )
  } catch (error) {
    console.error('Alternative API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
