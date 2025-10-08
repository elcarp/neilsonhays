// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { WcProduct } from '@/lib/woocommerce'

export interface ProductsResponse {
  products: WcProduct[]
  total: number
  totalPages: number
  currentPage: number
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductsResponse | { error: string }>> {
  try {
    // Check if credentials are available
    const consumerKey = process.env.WC_CONSUMER_KEY
    const consumerSecret = process.env.WC_CONSUMER_SECRET
    const wcUrl = process.env.WC_URL || 'https://store.neilsonhayslibrary.org'

    if (!consumerKey || !consumerSecret) {
      console.error('WooCommerce credentials missing:', {
        hasKey: !!consumerKey,
        hasSecret: !!consumerSecret,
        environment: process.env.NODE_ENV,
      })
      return NextResponse.json(
        { error: 'WooCommerce API credentials not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)

    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '100')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const orderby = searchParams.get('orderby') || 'title'
    const order = searchParams.get('order') || 'asc'
    const status = searchParams.get('status') || 'publish'

    // Build query parameters for WooCommerce API
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      orderby,
      order,
      status,
    })

    // Add optional filters
    if (category) {
      queryParams.append('category', category)
    }

    if (search) {
      queryParams.append('search', search)
    }

    // First, let's try a simple test to see if the WooCommerce API is accessible
    const testUrl = `${wcUrl}/wp-json/wc/v3/system_status`
    console.log(`Testing WooCommerce API accessibility: ${testUrl}`)

    try {
      const testResponse = await fetch(testUrl, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
          'User-Agent': 'NeilsonHaysLibrary/1.0',
        },
      })
      console.log(`Test API response status: ${testResponse.status}`)
    } catch (testError) {
      console.log(`Test API failed:`, testError)
    }

    // Fetch products from WooCommerce
    const apiUrl = `${wcUrl}/wp-json/wc/v3/products?${queryParams.toString()}`
    console.log(`Fetching products from: ${apiUrl}`)
    console.log(
      `Using credentials: Key=${consumerKey.substring(0, 8)}..., Secret=${consumerSecret.substring(0, 8)}...`
    )
    console.log(
      `Authorization header: Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64').substring(0, 20)}...`
    )

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NeilsonHaysLibrary/1.0',
        Accept: 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    console.log(`WooCommerce API response status: ${response.status}`)
    console.log(
      `Response headers:`,
      Object.fromEntries(response.headers.entries())
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`WooCommerce API error: ${response.status} - ${errorText}`)

      // Try to parse the error response
      let errorData: Record<string, unknown> = {}
      try {
        errorData = JSON.parse(errorText) as Record<string, unknown>
      } catch {
        console.log('Could not parse error response as JSON')
      }

      console.error('Parsed error data:', errorData)

      // Helper function to safely get nested error properties
      const getErrorProperty = (obj: unknown, path: string): string => {
        if (typeof obj === 'object' && obj !== null) {
          const parts = path.split('.')
          let current: unknown = obj
          for (const part of parts) {
            if (
              typeof current === 'object' &&
              current !== null &&
              part in current
            ) {
              current = (current as Record<string, unknown>)[part]
            } else {
              return ''
            }
          }
          return typeof current === 'string' ? current : ''
        }
        return ''
      }

      // Provide more specific error messages
      const errorId = getErrorProperty(errorData, 'error.id')
      const errorMessage =
        getErrorProperty(errorData, 'error.message') ||
        getErrorProperty(errorData, 'message')

      if (response.status === 403) {
        // Check if this is a CDN/security layer blocking the request
        if (errorId && errorId.includes(':')) {
          return NextResponse.json(
            {
              error:
                'Request blocked by security layer. This may be due to CDN/firewall restrictions on the WooCommerce store.',
              details: errorMessage || 'Forbidden',
              errorId: errorId,
            },
            { status: 403 }
          )
        }

        return NextResponse.json(
          {
            error:
              'Access denied to WooCommerce API. Please check your API credentials and permissions.',
            details: errorMessage || 'Forbidden',
          },
          { status: 403 }
        )
      } else if (response.status === 401) {
        return NextResponse.json(
          {
            error: 'Invalid WooCommerce API credentials.',
            details: errorMessage || 'Unauthorized',
          },
          { status: 401 }
        )
      } else if (response.status === 404) {
        return NextResponse.json(
          {
            error:
              'WooCommerce API endpoint not found. Please check your store URL.',
            details: errorMessage || 'Not Found',
          },
          { status: 404 }
        )
      }

      throw new Error(
        `Failed to fetch products: ${response.status} - ${errorMessage || 'Unknown error'}`
      )
    }

    const products: WcProduct[] = await response.json()

    // Get total count from headers
    const totalProducts = parseInt(response.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')

    console.log(
      `Successfully fetched ${products.length} products (page ${page} of ${totalPages})`
    )

    // Filter out products that shouldn't be displayed
    const visibleProducts = products.filter(
      product =>
        product.status === 'publish' && product.catalog_visibility !== 'hidden'
    )

    return NextResponse.json({
      products: visibleProducts,
      total: totalProducts,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.error('Products API error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}

// POST endpoint for creating products (admin only)
export async function POST(): Promise<NextResponse> {
  try {
    // This would typically require authentication
    // For now, we'll just return a method not allowed response
    return NextResponse.json(
      { error: 'Product creation not implemented' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
