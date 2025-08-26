'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Calendar,
  Users,
  Camera,
  Music,
  Heart,
  Building,
  Phone,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VenueHire() {
  const venueSpaces = [
    {
      icon: Building,
      title: 'Main Hall',
      description:
        'Our grand neo-classical hall with high ceilings and elegant architecture',
      capacity: 'Up to 150 guests',
      color: 'text-teal-400',
    },
    {
      icon: Heart,
      title: 'Garden Terrace',
      description:
        'Beautiful outdoor space surrounded by lush tropical gardens',
      capacity: 'Up to 80 guests',
      color: 'text-teal-300',
    },
    {
      icon: Users,
      title: 'Conference Room',
      description: 'Intimate space perfect for meetings and small gatherings',
      capacity: 'Up to 30 guests',
      color: 'text-teal-400',
    },
    {
      icon: Camera,
      title: 'Rotunda Gallery',
      description: 'Unique circular space with stunning architectural details',
      capacity: 'Up to 60 guests',
      color: 'text-teal-500',
    },
  ]

  const eventTypes = [
    {
      icon: Heart,
      title: 'Weddings',
      description: 'Wedding ceremonies and receptions',
      color: 'text-teal-300',
    },
    {
      icon: Building,
      title: 'Corporate Events',
      description: 'Product launches, business dinners, press conferences',
      color: 'text-teal-400',
    },
    {
      icon: Music,
      title: 'Concerts & Performances',
      description: 'Live music and cultural performances',
      color: 'text-teal-500',
    },
    {
      icon: Camera,
      title: 'Media & Photography',
      description: 'Film shoots, photo shoots, fashion shoots, TV commercials',
      color: 'text-teal-400',
    },
    {
      icon: Users,
      title: 'Social Events',
      description: 'Cocktail functions and special celebrations',
      color: 'text-teal-300',
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
    <div className='min-h-screen bg-gradient-to-br from-teal-500 to-blue-500'>
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
            title='Library Spaces for Hire'
            description='Flexible spaces available to accommodate a variety of functions in our historic setting'
            quote='A beautiful venue creates the perfect backdrop for unforgettable moments.'
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
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>
              Historic Venues for Every Occasion
            </h2>
            <p className='text-base sm:text-lg text-gray-600 max-w-3xl mx-auto'>
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
            <p className='text-base sm:text-lg leading-relaxed text-gray-700 mb-8'>
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
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4'>
              Our Venue Spaces
            </h2>
            <p className='text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
              Each space offers unique character and flexibility
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
                  <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4'>
                    {detail.title}
                  </h3>
                  <p className='text-sm sm:text-base text-gray-700 mb-4 leading-relaxed'>
                    {detail.description}
                  </p>
                  <div className='text-teal-600 font-semibold text-sm sm:text-base'>
                    {detail.capacity}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Event Types Section */}
        <div className='bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-white mb-8 sm:mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>
              Types of Events
            </h2>
            <p className='text-base sm:text-lg opacity-90 max-w-3xl mx-auto'>
              Our spaces accommodate a wide range of functions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
          >
            {eventTypes.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-white/10 rounded-lg p-4 sm:p-6 backdrop-blur-sm'
                >
                  <Icon className='w-10 h-10 sm:w-12 sm:h-12 text-white mb-4' />
                  <h3 className='text-white font-semibold text-base sm:text-lg mb-2'>
                    {detail.title}
                  </h3>
                  <p className='text-white/90 text-sm sm:text-base'>
                    {detail.description}
                  </p>
                </div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='mt-8 sm:mt-12 bg-white/10 p-6 sm:p-8 rounded-lg backdrop-blur-sm'
          >
            <h3 className='text-xl sm:text-2xl font-bold text-white mb-4'>
              Special Requirements
            </h3>
            <p className='text-base sm:text-lg text-white/90'>
              We would be pleased to discuss your specific requirements. Our
              team can help you find the perfect space and arrange all the
              details for your event.
            </p>
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
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>
              Get in Touch
            </h2>
            <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
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
              <div className='bg-gray-50 p-6 sm:p-8 rounded-lg'>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6'>
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
                          <h4 className='font-semibold text-gray-900'>
                            {detail.title}
                          </h4>
                          <p className='text-gray-600'>{detail.detail}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='bg-teal-50 p-6 sm:p-8 rounded-lg border border-teal-200'>
                <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-4'>
                  Visit Our Facilities
                </h3>
                <p className='text-sm sm:text-base text-gray-700 mb-6'>
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
            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
              Ready to Plan Your Event?
            </h2>
            <p className='text-xl text-gray-700 mb-8'>
              Let us help you create an unforgettable experience in our historic
              setting
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/contact'>
                <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                  Contact Office Manager
                </Button>
              </Link>
              <Link href='/about'>
                <Button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg'>
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
