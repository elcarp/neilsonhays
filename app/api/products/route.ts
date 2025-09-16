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

    // Fetch products from WooCommerce
    console.log(`Fetching products with params: ${queryParams.toString()}`)

    const response = await fetch(
      `${process.env.WC_URL || 'https://neilsonhayslibrary.org'}/wp-json/wc/v3/products?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`WooCommerce API error: ${response.status} - ${errorText}`)
      throw new Error(`Failed to fetch products: ${response.status}`)
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
