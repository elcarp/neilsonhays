// lib/wp-posts.ts

export interface WpPost {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: 'publish' | 'draft' | 'private'
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: 'open' | 'closed'
  ping_status: 'open' | 'closed'
  sticky: boolean
  template: string
  format: string
  meta: Record<string, unknown>
  categories: number[]
  tags: number[]
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
    about: Array<{ href: string }>
    author: Array<{ embeddable: boolean; href: string }>
    replies: Array<{ embeddable: boolean; href: string }>
    'version-history': Array<{ count: number; href: string }>
    'predecessor-version': Array<{ id: number; href: string }>
    'wp:featuredmedia': Array<{ embeddable: boolean; href: string }>
    'wp:attachment': Array<{ href: string }>
    'wp:term': Array<{ taxonomy: string; embeddable: boolean; href: string }>
    curies: Array<{ name: string; href: string; templated: boolean }>
  }
  _embedded?: {
    author?: Array<{
      id: number
      name: string
      url: string
      description: string
      link: string
      slug: string
      avatar_urls: Record<string, string>
    }>
    'wp:featuredmedia'?: Array<{
      id: number
      date: string
      slug: string
      type: string
      link: string
      title: { rendered: string }
      author: number
      caption: { rendered: string }
      alt_text: string
      media_type: string
      mime_type: string
      media_details: {
        width: number
        height: number
        file: string
        sizes: Record<
          string,
          {
            file: string
            width: number
            height: number
            mime_type: string
            source_url: string
          }
        >
      }
      source_url: string
    }>
    'wp:term'?: Array<
      Array<{
        id: number
        link: string
        name: string
        slug: string
        taxonomy: string
      }>
    >
  }
}

export interface WpCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
  meta: Record<string, unknown>
}

export interface WpTag {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  meta: Record<string, unknown>
}

export interface PostsQueryParams {
  page?: number
  per_page?: number
  search?: string
  author?: number
  author_exclude?: number[]
  before?: string
  after?: string
  exclude?: number[]
  include?: number[]
  offset?: number
  order?: 'asc' | 'desc'
  orderby?:
    | 'author'
    | 'date'
    | 'id'
    | 'include'
    | 'modified'
    | 'parent'
    | 'relevance'
    | 'slug'
    | 'include_slugs'
    | 'title'
  slug?: string
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private'
  categories?: number[]
  categories_exclude?: number[]
  tags?: number[]
  tags_exclude?: number[]
  sticky?: boolean
}

/**
 * Fetch posts from WordPress REST API
 */
export async function getPosts(params: PostsQueryParams = {}): Promise<{
  posts: WpPost[]
  totalPosts: number
  totalPages: number
}> {
  try {
    const queryParams = new URLSearchParams()

    // Set default parameters
    queryParams.set('status', params.status || 'publish')
    queryParams.set('per_page', (params.per_page || 10).toString())
    queryParams.set('page', (params.page || 1).toString())
    queryParams.set('_embed', 'true') // Include embedded data (author, featured media, etc.)

    // Add optional parameters
    if (params.search) queryParams.set('search', params.search)
    if (params.author) queryParams.set('author', params.author.toString())
    if (params.before) queryParams.set('before', params.before)
    if (params.after) queryParams.set('after', params.after)
    if (params.order) queryParams.set('order', params.order)
    if (params.orderby) queryParams.set('orderby', params.orderby)
    if (params.categories?.length)
      queryParams.set('categories', params.categories.join(','))
    if (params.tags?.length) queryParams.set('tags', params.tags.join(','))
    if (params.slug) queryParams.set('slug', params.slug)
    if (typeof params.sticky === 'boolean')
      queryParams.set('sticky', params.sticky.toString())

    console.log(`Fetching posts with params: ${queryParams.toString()}`)

    const response = await fetch(
      `${process.env.WP_URL || 'https://neilsonhayslibrary.org'}/wp-json/wp/v2/posts?${queryParams.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      console.error(`WordPress Posts API error: ${response.status}`)
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }

    const posts: WpPost[] = await response.json()

    // Get pagination info from headers
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')

    console.log(
      `Successfully fetched ${posts.length} posts (page ${params.page || 1} of ${totalPages})`
    )

    return {
      posts,
      totalPosts,
      totalPages,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  try {
    const { posts } = await getPosts({ slug, per_page: 1 })
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch categories
 */
export async function getCategories(): Promise<WpCategory[]> {
  try {
    const response = await fetch(
      `${process.env.WP_URL || 'https://neilsonhayslibrary.org'}/wp-json/wp/v2/categories?per_page=100`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetch tags
 */
export async function getTags(): Promise<WpTag[]> {
  try {
    const response = await fetch(
      `${process.env.WP_URL || 'https://neilsonhayslibrary.org'}/wp-json/wp/v2/tags?per_page=100`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

/**
 * Extract plain text from HTML content
 */
export function extractTextFromHtml(
  html: string,
  maxLength: number = 200
): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '')
  // Decode HTML entities
  const decoded = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')

  // Truncate if needed
  if (decoded.length <= maxLength) return decoded

  const truncated = decoded.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

/**
 * Format date for display
 */
export function formatPostDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get reading time estimate
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const text = extractTextFromHtml(content)
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
