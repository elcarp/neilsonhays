// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { wcGet, WcProduct } from '@/lib/woocommerce'

export interface ProductResponse {
  product: WcProduct
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<ProductResponse | { error: string }>> {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      )
    }

    console.log(`Fetching product with slug: ${slug}`)

    // First, try to get the product by slug
    let products: WcProduct[]

    try {
      products = await wcGet<WcProduct[]>(
        `products?slug=${slug}&status=publish`
      )
    } catch (error) {
      console.error('Error fetching product by slug:', error)
      throw new Error('Failed to fetch product from WooCommerce')
    }

    if (!products || products.length === 0) {
      console.log(`No product found with slug: ${slug}`)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const product = products[0]

    // Check if product should be visible
    if (
      product.status !== 'publish' ||
      product.catalog_visibility === 'hidden'
    ) {
      return NextResponse.json(
        { error: 'Product not available' },
        { status: 404 }
      )
    }

    console.log(`Successfully fetched product: ${product.name}`)

    return NextResponse.json({
      product,
    })
  } catch (error) {
    console.error('Product detail API error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch product',
      },
      { status: 500 }
    )
  }
}

// PUT endpoint for updating products (admin only)
export async function PUT(): Promise<NextResponse> {
  try {
    // This would typically require authentication
    // For now, we'll just return a method not allowed response
    return NextResponse.json(
      { error: 'Product updates not implemented' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE endpoint for deleting products (admin only)
export async function DELETE(): Promise<NextResponse> {
  try {
    // This would typically require authentication
    // For now, we'll just return a method not allowed response
    return NextResponse.json(
      { error: 'Product deletion not implemented' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Product deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
