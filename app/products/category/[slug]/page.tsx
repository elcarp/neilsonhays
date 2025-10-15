'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import { ShoppingCart, Eye, Star, ArrowLeft, Search } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { WcProduct, WcCategory } from '@/lib/woocommerce'

interface CategoryProductsResponse {
  products: WcProduct[]
  category: string
  total: number
  page: number
  totalPages: number
}

interface CategoriesResponse {
  categories: WcCategory[]
  total: number
}

export default function CategoryProductsPage() {
  const params = useParams()
  const categorySlug = params.slug as string
  const { addItem } = useCart()

  const [products, setProducts] = useState<WcProduct[]>([])
  const [categoryInfo, setCategoryInfo] = useState<WcCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<WcProduct[]>([])
  const [addingToCart, setAddingToCart] = useState<number | null>(null)
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  // Fetch products and category info on component mount
  useEffect(() => {
    if (categorySlug) {
      fetchCategoryData()
    }
  }, [categorySlug])

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchTerm])

  const fetchCategoryData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch products for this category
      const productsResponse = await fetch(`/api/products/category/${categorySlug}`)
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.statusText}`)
      }
      const productsData: CategoryProductsResponse = await productsResponse.json()
      setProducts(productsData.products)

      // Fetch category info
      const categoriesResponse = await fetch('/api/product-categories')
      if (categoriesResponse.ok) {
        const categoriesData: CategoriesResponse = await categoriesResponse.json()
        const category = categoriesData.categories.find(cat => cat.slug === categorySlug)
        setCategoryInfo(category || null)
      }

    } catch (err) {
      console.error('Error fetching category data:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to load category products'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (product: WcProduct) => {
    try {
      setAddingToCart(product.id)
      addItem(product, 1)

      console.log(`Added ${product.name} to cart`)

      setTimeout(() => {
        setAddingToCart(null)
        setAddedToCart(product.id)
      }, 500)

      setTimeout(() => {
        setAddedToCart(null)
      }, 2000)

    } catch (error) {
      console.error('Failed to add to cart:', error)
      setAddingToCart(null)
      alert('Failed to add item to cart. Please try again.')
    }
  }

  const getCategoryDisplayName = () => {
    if (categoryInfo) {
      return categoryInfo.name
    }
    // Fallback: format slug as display name
    return categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-white">Loading category products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Products</h1>
          <p className="text-white mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={fetchCategoryData} className="bg-teal-600 hover:bg-teal-700 cursor-pointer">
              Try Again
            </Button>
            <Link href="/products">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black cursor-pointer">
                Back to All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        {categoryInfo?.image?.src ? (
          <Image
            src={categoryInfo.image.src}
            alt={categoryInfo.image.alt || getCategoryDisplayName()}
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <Image
            src="https://store.neilsonhayslibrary.org/wp-content/uploads/2023/07/NHL_2687-2048x1366.jpg"
            alt={`${getCategoryDisplayName()} products`}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="relative z-10 text-center px-4">
          <PageTitle
            title={getCategoryDisplayName()}
            description={categoryInfo?.description || `Discover ${getCategoryDisplayName().toLowerCase()} from Neilson Hays Library`}
            quote="Explore our curated collection"
          />
        </div>
      </section>

      {/* Navigation and Search */}
      <section className="py-8 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${getCategoryDisplayName().toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Results count */}
            <div className="text-gray-400 text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {searchTerm ? 'No products found' : 'No products in this category'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? 'Try adjusting your search criteria.'
                  : `There are currently no products available in the ${getCategoryDisplayName().toLowerCase()} category.`
                }
              </p>
              <div className="flex gap-4 justify-center">
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm('')}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Clear Search
                  </Button>
                )}
                <Link href="/products">
                  <Button variant="outline">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-200">
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <Eye className="w-12 h-12" />
                      </div>
                    )}

                    {/* Sale badge */}
                    {product.on_sale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Sale
                      </div>
                    )}

                    {/* Stock status */}
                    {product.stock_status === 'outofstock' && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                        {product.name}
                      </h3>
                      {product.average_rating && parseFloat(product.average_rating) > 0 && (
                        <div className="flex items-center ml-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.average_rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      {product.on_sale ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-teal-600">
                            ฿{parseFloat(product.sale_price).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ฿{parseFloat(product.regular_price).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {parseFloat(product.price) === 0 ? 'Free' : `฿${parseFloat(product.price).toFixed(2)}`}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full text-sm cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock_status === 'outofstock' || addingToCart === product.id || addedToCart === product.id}
                        className={`flex-1 text-sm transition-colors cursor-pointer ${addedToCart === product.id
                          ? 'bg-green-600 hover:bg-green-700'
                          : addingToCart === product.id
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-teal-600 hover:bg-teal-700'
                          }`}
                      >
                        {addingToCart === product.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                            Adding...
                          </>
                        ) : addedToCart === product.id ? (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explore More Categories
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Discover our full range of products and services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                  Browse All Products
                </Button>
              </Link>
              <Link href="/events">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg">
                  View Events
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
