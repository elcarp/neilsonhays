'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react'
import { WpPost, getPostBySlug, formatPostDate, getReadingTime } from '@/lib/wp-posts'

function BlogPostContent() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<WpPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    try {
      setLoading(true)
      const fetchedPost = await getPostBySlug(slug)

      if (!fetchedPost) {
        setError('Post not found')
        return
      }

      setPost(fetchedPost)
    } catch (err) {
      console.error('Error fetching post:', err)
      setError(err instanceof Error ? err.message : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = (platform: string) => {
    if (!post) return

    const url = window.location.href
    const title = post.title.rendered
    const text = `Check out this post: ${title}`

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        // You could add a toast notification here
        alert('Link copied to clipboard!')
        break
    }
    setShareMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Post not found'}
          </h1>
          <div className="space-x-4">
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
            <Link href="/blog">
              <Button className="bg-teal-600 hover:bg-teal-700">
                Browse Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-teal-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 pb-12">
        {/* Featured Image */}
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          {/* Categories */}
          {post._embedded?.['wp:term']?.[0] && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post._embedded['wp:term'][0].map(category => (
                <span
                  key={category.id}
                  className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="text-4xl font-bold text-gray-900 mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            {/* Author */}
            {post._embedded?.author?.[0] && (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>By {post._embedded.author[0].name}</span>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatPostDate(post.date)}</span>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{getReadingTime(post.content.rendered)} min read</span>
            </div>

            {/* Share Button */}
            <div className="relative">
              <Button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              {/* Share Menu */}
              {shareMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {post._embedded?.['wp:term']?.[1] && post._embedded['wp:term'][1].length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {post._embedded['wp:term'][1].map(tag => (
                <span
                  key={tag.id}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:p-4 prose-blockquote:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          {/* Author Bio */}
          {post._embedded?.author?.[0] && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                {post._embedded.author[0].avatar_urls?.['96'] && (
                  <Image
                    src={post._embedded.author[0].avatar_urls['96']}
                    alt={post._embedded.author[0].name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    About {post._embedded.author[0].name}
                  </h3>
                  {post._embedded.author[0].description && (
                    <p className="text-gray-600 mb-3">
                      {post._embedded.author[0].description}
                    </p>
                  )}
                  {post._embedded.author[0].url && (
                    <Link
                      href={post._embedded.author[0].url}
                      className="text-teal-600 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Author&apos;s Website
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex gap-2">
              <Link href="/events">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  View Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>

      {/* Click outside to close share menu */}
      {shareMenuOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShareMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BlogPostContent />
    </Suspense>
  )
}
