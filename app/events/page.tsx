'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BlurImage } from '@/components/ui/blur-image'
import PageTitle from '@/components/ui/page-title'

export default function Events() {
  return (
    <div className='min-h-screen bg-teal-700 py-24 sm:py-32'>
      <PageTitle
        title='Events'
        description='Checkout our upcoming events and workshops.'
      />
      <div className='mt-20 flex flex-col items-center justify-between pb-20 max-w-7xl mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20'>
          {blogs.map((blog, index) => (
            <BlogCard blog={blog} key={blog.title + index} />
          ))}
        </div>
      </div>
    </div>
  )
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text
  }
  return (
    <Link
      className='shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200'
      href={`/blog/${blog.slug}`}
    >
      {blog.image ? (
        <BlurImage
          src={blog.image || ''}
          alt={blog.title}
          height='800'
          width='800'
          className='h-52 object-cover object-top w-full'
        />
      ) : (
        <div className='h-52 flex items-center justify-center bg-white dark:bg-neutral-900'>
          <Image src='/logo.svg' alt='Logo' width={100} height={100} />
        </div>
      )}
      <div className='p-4 md:p-8 bg-white dark:bg-neutral-900'>
        <div className='flex space-x-2 items-center  mb-2'>
          <Image
            src={blog.authorAvatar}
            alt={blog.author}
            width={20}
            height={20}
            className='rounded-full h-5 w-5'
          />
          <p className='text-sm font-normal text-neutral-600 dark:text-neutral-400'>
            {blog.author}
          </p>
        </div>
        <p className='text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100'>
          {blog.title}
        </p>
        <p className='text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400'>
          {truncate(blog.description, 100)}
        </p>
      </div>
    </Link>
  )
}

type Blog = {
  title: string
  description: string
  slug: string
  image: string
  author: string
  authorAvatar: string
}

const blogs: Blog[] = [
  {
    title: 'Changelog for 2024',
    description:
      'Explore the latest updates and enhancements in our 2024 changelog. Discover new features and improvements that enhance user experience.',
    slug: 'changelog-for-2024',
    image:
      'https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Manu Arora',
    authorAvatar: 'https://assets.aceternity.com/manu.png',
  },
  {
    title: 'Understanding React Hooks',
    description:
      'A comprehensive guide to understanding and using React Hooks in your projects.',
    slug: 'understanding-react-hooks',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Manu Arora',
    authorAvatar: 'https://assets.aceternity.com/manu.png',
  },
  {
    title: 'CSS Grid Layout',
    description: 'Learn how to create complex layouts easily with CSS Grid.',
    slug: 'css-grid-layout',
    image:
      'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Manu Arora',
    authorAvatar: 'https://assets.aceternity.com/manu.png',
  },
  {
    title: 'JavaScript ES2021 Features',
    description:
      'An overview of the new features introduced in JavaScript ES2021.',
    slug: 'javascript-es2021-features',
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=4846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Manu Arora',
    authorAvatar: 'https://assets.aceternity.com/manu.png',
  },
  {
    title: 'Building RESTful APIs with Node.js',
    description:
      'Step-by-step guide to building RESTful APIs using Node.js and Express.',
    slug: 'building-restful-apis-with-nodejs',
    image:
      'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=5069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Manu Arora',
    authorAvatar: 'https://assets.aceternity.com/manu.png',
  },
  {
    title: 'Mastering TypeScript',
    description:
      'A deep dive into TypeScript, its features, and how to effectively use it in your projects.',
    slug: 'mastering-typescript',
    image:
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jane Doe',
    authorAvatar: 'https://assets.aceternity.com/manu.png',
  },
]
