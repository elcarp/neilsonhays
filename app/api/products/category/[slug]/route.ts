import { NextRequest, NextResponse } from 'next/server'
import { getProductsByCategory, WcProduct } from '@/lib/woocommerce'

export interface CategoryProductsResponse {
  products: WcProduct[]
  category: string
  total: number
  page: number
  totalPages: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<CategoryProductsResponse | { error: string }>> {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '20')

    console.log(`API: Fetching products for category: ${slug}, page: ${page}`)

    const products = await getProductsByCategory(slug, perPage, page)

    // Calculate total pages (this is approximate since WooCommerce doesn't return total count easily)
    const totalPages = Math.ceil(products.length / perPage)

    console.log(
      `API: Returning ${products.length} products for category ${slug}`
    )

    return NextResponse.json({
      products,
      category: slug,
      total: products.length,
      page,
      totalPages,
    })
  } catch (error) {
    console.error('API: Error fetching products by category:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch products'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
