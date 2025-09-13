'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import {
  Calendar,
  Phone,
  Mail,
  BookOpen,
  Trees,
  Presentation,
  Palette,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VenueHire() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const galleryImages = [
    '/images/venue/IMG_8362.PNG',
    '/images/venue/IMG_8363.PNG',
    '/images/venue/IMG_8364.PNG',
    '/images/venue/IMG_8365.PNG',
    '/images/venue/IMG_8366.PNG',
    '/images/venue/more events (1).jpeg',
    '/images/venue/more events (1).jpg',
    '/images/venue/more events (2).jpg',
    '/images/venue/more events (3).jpg',
    '/images/venue/more events (4).jpg',
    '/images/venue/more events (5).jpg',
    '/images/venue/venue events (1).jpeg',
    '/images/venue/venue events (1).jpg',
    '/images/venue/venue events (2).jpeg',
    '/images/venue/venue events (2).jpg',
    '/images/venue/venue events (3).jpg',
    '/images/venue/venue events (4).jpg',
    '/images/venue/venue events (5).jpg',
    '/images/venue/venue events (6).jpg',
    '/images/venue/venue events (7).jpg',
    '/images/venue/venue events (8).jpg',
    '/images/venue/venue events (9).jpg',
    '/images/venue/venue events (10).jpg',
    '/images/venue/venue events (11).jpg',
    '/images/venue/venue events (12).jpg',
    '/images/venue/venue events (13).jpg',
    '/images/venue/venue events (14).jpg',
    '/images/venue/venue events (15).jpg',
    '/images/venue/venue events (16).jpg',
    '/images/venue/venue events (17).jpg',
    '/images/venue/venue events (18).jpg',
    '/images/venue/venue events (19).jpg',
    '/images/venue/venue events (20).jpg',
    '/images/venue/venue events (22).jpg',
    '/images/venue/venue events (23).jpg',
  ]

  const venueSpaces = [
    {
      icon: BookOpen,
      title: 'Author Talks & Literary Readings',
      description:
        'Celebrate books, ideas, and storytelling in an inspiring setting.',
      color: 'text-teal-400',
    },
    {
      icon: Trees,
      title: 'Garden Terrace',
      description:
        'Beautiful outdoor space surrounded by lush tropical gardens',
      color: 'text-teal-300',
    },
    {
      icon: Presentation,
      title: 'Conference Room',
      description: 'Intimate space perfect for meetings and small gatherings',
      capacity: 'Up to 30 guests',
      color: 'text-teal-400',
    },
    {
      icon: Palette,
      title: 'Rotunda Gallery',
      description: 'Unique circular space with stunning architectural details',
      capacity: 'Up to 60 guests',
      color: 'text-teal-500',
    },
  ]

  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone',
      detail: '+66 2 233 1731',
      color: 'text-teal-400',
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'office@neilsonhayslibrary.org',
      color: 'text-teal-400',
    },
    {
      icon: Calendar,
      title: 'Office Hours',
      detail: 'Tuesday - Sunday, 9:30 AM - 5:00 PM',
      color: 'text-teal-300',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-500 to-teal-600'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='/images/venue-hire.webp'
          alt='Neilson Hays Library venue hire'
          fill
          className='object-cover opacity-40'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='A Beloved Library Venue'
            description='As a non-profit organization, Neilson Hays Library opens its historic spaces for events that align with our mission to promote culture, learning, literature, and the arts.'
          />
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16'>
        {/* Overview Section */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-900 mb-4 sm:mb-6'>
              Historic Venues for Every Occasion
            </h2>
            <p className='text-base sm:text-lg text-teal-700 max-w-3xl mx-auto'>
              We have several flexible spaces available to accommodate a variety
              of functions, from intimate gatherings to grand celebrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg mx-auto text-center'
          >
            <p className='text-base sm:text-lg leading-relaxed text-teal-700 mb-8'>
              Our historic library building provides a unique and elegant
              setting for your special events. Each space offers its own
              character and charm, perfect for creating memorable experiences.
            </p>
          </motion.div>
        </div>

        {/* Venue Spaces Section */}
        <div className='mb-12 sm:mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-900 mb-3 sm:mb-4'>
              Events At Neilson Hays
            </h2>
            <p className='text-base sm:text-lg text-teal-700 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
              Every event hosted here helps sustain the library&apos;s
              collection, building, and programs for future generations. We
              welcome the following types of events:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'
          >
            {venueSpaces.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300'
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-100 text-teal-600 mb-4 sm:mb-6`}
                  >
                    <Icon className='w-6 h-6 sm:w-8 sm:h-8' />
                  </div>
                  <h3 className='text-lg sm:text-xl font-bold text-teal-900 mb-3 sm:mb-4'>
                    {detail.title}
                  </h3>
                  <p className='text-sm sm:text-base text-teal-700 mb-4 leading-relaxed'>
                    {detail.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Photos */}
        <div className='mb-12 sm:mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-900 mb-3 sm:mb-4'>
              Venue Photo Gallery
            </h2>
            <p className='text-base sm:text-lg text-teal-700 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
              Explore our beautiful spaces and see how events come to life at Neilson Hays Library
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'
          >
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className='relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
                onClick={() => setLightboxImage(src)}
              >
                <Image
                  src={src}
                  alt={`Venue space ${index + 1}`}
                  width={400}
                  height={300}
                  className='w-full h-32 sm:h-40 lg:h-48 object-cover'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'></div>
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='bg-white/90 rounded-full p-2'>
                    <svg className='w-6 h-6 text-gray-800' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7' />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Contact Section */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-900 mb-4 sm:mb-6'>
              Get in Touch
            </h2>
            <p className='text-base sm:text-lg text-teal-700 max-w-2xl mx-auto'>
              Please contact our Office Manager to make an appointment to view
              our facilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 gap-6 sm:gap-8'
          >
            <div className='space-y-8'>
              <div className='bg-teal-50 p-6 sm:p-8 rounded-lg'>
                <h3 className='text-xl sm:text-2xl font-bold text-teal-900 mb-4 sm:mb-6'>
                  Contact Information
                </h3>
                <div className='space-y-6'>
                  {contactDetails.map(detail => {
                    const Icon = detail.icon
                    return (
                      <div
                        key={detail.title}
                        className='flex items-center gap-4'
                      >
                        <Icon className={`w-6 h-6 ${detail.color}`} />
                        <div>
                          <h4 className='font-semibold text-teal-900'>
                            {detail.title}
                          </h4>
                          <p className='text-teal-700'>{detail.detail}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='bg-teal-50 p-6 sm:p-8 rounded-lg border border-teal-200'>
                <h3 className='text-lg sm:text-xl font-bold text-teal-900 mb-4'>
                  Visit Our Facilities
                </h3>
                <p className='text-sm sm:text-base text-teal-700 mb-6'>
                  We recommend scheduling a visit to see our spaces in person
                  and discuss your specific needs with our team.
                </p>
                <Link href='/contact'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-6 sm:px-8 py-3 text-sm sm:text-base'>
                    Schedule a Visit
                  </Button>
                </Link>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='/images/library-exterior.webp'
                alt='Neilson Hays Library venue spaces'
                width={600}
                height={400}
                className='rounded-lg sm:rounded-xl shadow-md object-cover w-full h-64 sm:h-80'
              />
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className='text-center bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-2xl sm:text-3xl font-bold text-teal-900 mb-4 sm:mb-6'>
              Ready to Plan Your Event?
            </h2>
            <p className='text-base sm:text-lg text-teal-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4'>
              Let us help you create an unforgettable experience in our historic
              setting
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <Link href='/contact'>
                <Button className='bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto'>
                  Contact Office Manager
                </Button>
              </Link>
              <Link href='/give'>
                <Button
                  variant='outline'
                  className='border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto'
                >
                  Support the Library
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
          onClick={() => setLightboxImage(null)}
        >
          <div className='relative max-w-7xl max-h-full'>
            <button
              onClick={() => setLightboxImage(null)}
              className='absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors'
            >
              <X className='w-8 h-8' />
            </button>
            <Image
              src={lightboxImage}
              alt='Venue photo enlarged'
              width={1200}
              height={800}
              className='max-w-full max-h-[90vh] object-contain rounded-lg'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
