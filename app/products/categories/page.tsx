'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import { ArrowRight, Package, Search } from 'lucide-react'
import { WcCategory } from '@/lib/woocommerce'

interface CategoriesResponse {
  categories: WcCategory[]
  total: number
}

export default function ProductCategoriesPage() {
  const [categories, setCategories] = useState<WcCategory[]>([])
  const [filteredCategories, setFilteredCategories] = useState<WcCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories(categories)
    }
  }, [categories, searchTerm])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/product-categories')
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`)
      }

      const data: CategoriesResponse = await response.json()
      setCategories(data.categories)
    } catch (err) {
      console.error('Error fetching categories:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to load categories'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-white">Loading categories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Categories</h1>
          <p className="text-white mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={fetchCategories} className="bg-teal-600 hover:bg-teal-700">
              Try Again
            </Button>
            <Link href="/products">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                Browse All Products
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
        <Image
          src="https://store.neilsonhayslibrary.org/wp-content/uploads/2023/07/NHL_2687-2048x1366.jpg"
          alt="Product categories"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 text-center px-4">
          <PageTitle
            title="Product Categories"
            description="Browse our collection by category to find exactly what you're looking for"
            quote="Organized knowledge is power"
          />
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="text-gray-400 text-sm">
              {filteredCategories.length} of {categories.length} categories
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {searchTerm ? 'No categories found' : 'No categories available'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? 'Try adjusting your search criteria.'
                  : 'Categories are currently being set up. Please check back later.'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Category Image */}
                  <div className="relative h-48 bg-gradient-to-br from-teal-100 to-teal-200">
                    {category.image?.src ? (
                      <Image
                        src={category.image.src}
                        alt={category.image.alt || category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-teal-600">
                        <Package className="w-16 h-16" />
                      </div>
                    )}

                    {/* Product count badge */}
                    <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {category.count} {category.count === 1 ? 'product' : 'products'}
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {category.description}
                      </p>
                    )}

                    <Link href={`/products/category/${category.slug}`}>
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 group-hover:bg-teal-700 transition-colors">
                        <span>Browse {category.name}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Looking for something specific?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Can't find the right category? Browse all products or contact us for assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                  Browse All Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-3 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
