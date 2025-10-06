'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import {
  Search,
  Calendar,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react'
import {
  WpPost,
  WpCategory,
  getPosts,
  getCategories,
  extractTextFromHtml,
  formatPostDate,
  getReadingTime,
} from '@/lib/wp-posts'

export default function BlogPage() {
  const [posts, setPosts] = useState<WpPost[]>([])
  const [categories, setCategories] = useState<WpCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)

  const postsPerPage = 9

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        per_page: postsPerPage,
        search: searchTerm || undefined,
        categories: selectedCategory ? [selectedCategory] : undefined,
        orderby: 'date' as const,
        order: 'desc' as const,
      }

      const {
        posts: fetchedPosts,
        totalPosts: total,
        totalPages: pages,
      } = await getPosts(params)
      setPosts(fetchedPosts)
      setTotalPosts(total)
      setTotalPages(pages)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory, searchTerm, postsPerPage])

  // Fetch posts and categories on component mount
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Fetch categories once
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories.filter(cat => cat.count > 0)) // Only show categories with posts
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page when searching
    fetchData()
  }

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && posts.length === 0) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4'></div>
          <p className='text-white'>Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-500 mb-4'>
            Error Loading Blog
          </h1>
          <p className='text-white mb-4'>{error}</p>
          <Button onClick={fetchData} className='bg-teal-600 hover:bg-teal-700'>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative h-[50vh] flex items-center justify-center'>
        <Image
          src='/images/blog-bg.jpg'
          alt='Neilson Hays Library blog'
          fill
          className='object-cover opacity-50'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Library Blog'
            description='Stories, insights, and updates from Neilson Hays Library'
            quote='The written word is the strongest source of power in the entire universe.'
          />
        </div>
      </section>

      {/* Search and Filters */}
      <section className='py-8 px-4 bg-gray-900'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
            {/* Search */}
            <form onSubmit={handleSearch} className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search posts...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500'
              />
              <Button
                type='submit'
                size='sm'
                className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 px-3 py-1'
              >
                Search
              </Button>
            </form>

            {/* Category Filter */}
            <div className='flex items-center gap-2'>
              <Filter className='text-gray-400 w-4 h-4' />
              <select
                value={selectedCategory || ''}
                onChange={e =>
                  handleCategoryChange(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className='px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                <option value=''>All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className='mt-4 text-gray-400 text-sm'>
            {loading
              ? 'Loading...'
              : `Showing ${posts.length} of ${totalPosts} posts${searchTerm ? ` for "${searchTerm}"` : ''}${selectedCategory ? ` in "${categories.find(c => c.id === selectedCategory)?.name}"` : ''}`}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className='py-12 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          {posts.length === 0 ? (
            <div className='text-center py-12'>
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                No posts found
              </h3>
              <p className='text-gray-600 mb-6'>
                {searchTerm || selectedCategory
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No blog posts are currently available.'}
              </p>
              {(searchTerm || selectedCategory) && (
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory(null)
                    setCurrentPage(1)
                  }}
                  className='bg-teal-600 hover:bg-teal-700'
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow'
                  >
                    {/* Featured Image */}
                    <div className='relative h-48 bg-gray-200'>
                      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                        <Image
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={
                            post._embedded['wp:featuredmedia'][0].alt_text ||
                            post.title.rendered
                          }
                          fill
                          className='object-cover'
                        />
                      ) : (
                        <div className='flex items-center justify-center h-full text-gray-400'>
                          <Calendar className='w-12 h-12' />
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    <div className='p-6'>
                      {/* Categories */}
                      {post._embedded?.['wp:term']?.[0] && (
                        <div className='flex flex-wrap gap-1 mb-3'>
                          {post._embedded['wp:term'][0]
                            .slice(0, 2)
                            .map(category => (
                              <span
                                key={category.id}
                                className='text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded'
                              >
                                {category.name}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className='text-xl font-semibold text-gray-900 mb-3 line-clamp-2'>
                        <Link
                          href={`/blog/${post.slug}`}
                          className='hover:text-teal-600 transition-colors'
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                      </h2>

                      {/* Excerpt */}
                      <p className='text-gray-600 mb-4 line-clamp-3'>
                        {extractTextFromHtml(
                          post.excerpt.rendered || post.content.rendered,
                          150
                        )}
                      </p>

                      {/* Meta Information */}
                      <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                        <div className='flex items-center gap-4'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            <span>{formatPostDate(post.date)}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>
                              {getReadingTime(post.content.rendered)} min read
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Author */}
                      {post._embedded?.author?.[0] && (
                        <div className='flex items-center gap-2 mb-4'>
                          <User className='w-4 h-4 text-gray-400' />
                          <span className='text-sm text-gray-600'>
                            By {post._embedded.author[0].name}
                          </span>
                        </div>
                      )}

                      {/* Read More */}
                      <Link href={`/blog/${post.slug}`}>
                        <Button className='w-full bg-teal-600 hover:bg-teal-700 text-white'>
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center mt-12 gap-2'>
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant='outline'
                    size='sm'
                  >
                    <ChevronLeft className='w-4 h-4 mr-1' />
                    Previous
                  </Button>

                  <div className='flex gap-1'>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          variant={
                            currentPage === pageNum ? 'default' : 'outline'
                          }
                          size='sm'
                          className={
                            currentPage === pageNum
                              ? 'bg-teal-600 hover:bg-teal-700'
                              : ''
                          }
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant='outline'
                    size='sm'
                  >
                    Next
                    <ChevronRight className='w-4 h-4 ml-1' />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 px-4 bg-teal-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              Stay Connected
            </h2>
            <p className='text-xl text-gray-700 mb-8'>
              Don&apos;t miss out on library news, events, and stories
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/events'>
                <Button className='bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg'>
                  View Events
                </Button>
              </Link>
              <Link href='/contact'>
                <Button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg'>
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
