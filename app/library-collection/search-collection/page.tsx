'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageTitle from '@/components/ui/page-title'

export default function SearchCollectionRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the library catalog after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://16309.rmwebopac.com/'
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDirectRedirect = () => {
    window.location.href = 'https://16309.rmwebopac.com/'
  }

  return (
    <div className='min-h-screen bg-teal-700 py-24 sm:py-32'>
      <PageTitle
        title='Library Collection Search'
        description='Redirecting you to our online catalog...'
      />

      <div className='mt-20 flex flex-col items-center justify-center pb-20 max-w-4xl mx-auto px-4 md:px-8'>
        <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
          <div className='mb-6'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4'></div>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
              Redirecting to Library Catalog
            </h2>
            <p className='text-gray-600 mb-6'>
              You will be automatically redirected to our online library collection search in a few seconds...
            </p>
          </div>

          <div className='space-y-4'>
            <button
              onClick={handleDirectRedirect}
              className='bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
            >
              Go to Library Catalog Now
            </button>

            <div className='text-sm text-gray-500'>
              <p>
                Our library catalog is powered by ResourceMate® and contains our complete collection of books,
                periodicals, and digital resources.
              </p>
            </div>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>
              What you can search:
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-left'>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-teal-600 rounded-full mr-3'></span>
                  <span className='text-gray-700'>Books & eBooks</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-teal-600 rounded-full mr-3'></span>
                  <span className='text-gray-700'>Periodicals & Magazines</span>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-teal-600 rounded-full mr-3'></span>
                  <span className='text-gray-700'>Digital Resources</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-2 h-2 bg-teal-600 rounded-full mr-3'></span>
                  <span className='text-gray-700'>Special Collections</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-white/80 text-sm'>
            Having trouble? Contact us at{' '}
            <a
              href='mailto:info@neilsonhayslibrary.org'
              className='text-white font-semibold hover:underline'
            >
              info@neilsonhayslibrary.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
