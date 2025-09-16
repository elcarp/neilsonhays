'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Plus,
  Minus,
  Heart
} from 'lucide-react'
import { useCart } from '@/lib/cart'
import { WcProduct } from '@/lib/woocommerce'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<WcProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string)
    }
  }, [params.slug])

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products/${slug}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError('Product not found')
        } else {
          throw new Error('Failed to fetch product')
        }
        return
      }

      const data = await response.json()
      setProduct(data.product)
    } catch (err) {
      console.error('Error fetching product:', err)
      setError(err instanceof Error ? err.message : 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return

    setAddingToCart(true)
    try {
      addItem(product, quantity)
      // You could add a toast notification here
      console.log(`Added ${quantity} x ${product.name} to cart`)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    if (!product) return

    setAddingToCart(true)
    try {
      // Add to cart
      addItem(product, quantity)
      console.log(`Added ${quantity} x ${product.name} to cart`)

      // Navigate to checkout immediately after adding to cart
      router.push('/checkout')
    } catch (error) {
      console.error('Failed to buy now:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Product not found'}
          </h1>
          <div className="space-x-4">
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
            <Link href="/products">
              <Button className="bg-teal-600 hover:bg-teal-700">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isOutOfStock = product.stock_status === 'outofstock'
  const hasImages = product.images && product.images.length > 0

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-teal-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {hasImages ? (
              <>
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImage].src}
                    alt={product.images[selectedImage].alt || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.on_sale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </div>
                  )}
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-teal-600' : 'border-gray-200'
                          }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `${product.name} ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-2" />
                  <p>No image available</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {product.average_rating && parseFloat(product.average_rating) > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(parseFloat(product.average_rating))
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.rating_count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Categories */}
            {product.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.categories.map(category => (
                  <span
                    key={category.id}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              {product.on_sale ? (
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-teal-600">
                    ฿{parseFloat(product.sale_price).toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ฿{parseFloat(product.regular_price).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                    Save ฿{(parseFloat(product.regular_price) - parseFloat(product.sale_price)).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {parseFloat(product.price) === 0 ? 'Free' : `฿${parseFloat(product.price).toFixed(2)}`}
                </span>
              )}
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="text-gray-700 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'
                }`} />
              <span className={`font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'
                }`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
              {product.manage_stock && product.stock_quantity && (
                <span className="text-gray-600 text-sm">
                  ({product.stock_quantity} available)
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                    disabled={product.manage_stock && product.stock_quantity ? quantity >= product.stock_quantity : false}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || addingToCart}
                  className="flex-1 bg-gray-700 hover:bg-gray-800"
                >
                  {addingToCart ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock || addingToCart}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                >
                  Buy Now
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {/* Add to wishlist functionality */ }}
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over ฿1,000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-5 h-5" />
                <span>Secure payment guaranteed</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RefreshCw className="w-5 h-5" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
