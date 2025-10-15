import { NextResponse } from 'next/server'
import { getProductCategories, WcCategory } from '@/lib/woocommerce'

export interface CategoriesResponse {
  categories: WcCategory[]
  total: number
}

export async function GET(): Promise<
  NextResponse<CategoriesResponse | { error: string }>
> {
  try {
    console.log('API: Fetching product categories...')

    const categories = await getProductCategories()

    // Filter out uncategorized and empty categories
    const filteredCategories = categories.filter(
      category => category.slug !== 'uncategorized' && category.count > 0
    )

    console.log(`API: Returning ${filteredCategories.length} categories`)

    return NextResponse.json({
      categories: filteredCategories,
      total: filteredCategories.length,
    })
  } catch (error) {
    console.error('API: Error fetching categories:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch categories'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
