'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
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
  const spacesRef = useRef(null)
  const eventsRef = useRef(null)
  const contactRef = useRef(null)

  const venueSpaces = [
    {
      icon: Building,
      title: 'Main Hall',
      description:
        'Our grand neo-classical hall with high ceilings and elegant architecture',
      capacity: 'Up to 150 guests',
      color: 'text-blue-400',
    },
    {
      icon: Heart,
      title: 'Garden Terrace',
      description:
        'Beautiful outdoor space surrounded by lush tropical gardens',
      capacity: 'Up to 80 guests',
      color: 'text-green-400',
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
      color: 'text-purple-400',
    },
  ]

  const eventTypes = [
    {
      icon: Heart,
      title: 'Weddings',
      description: 'Wedding ceremonies and receptions',
      color: 'text-pink-400',
    },
    {
      icon: Building,
      title: 'Corporate Events',
      description: 'Product launches, business dinners, press conferences',
      color: 'text-blue-400',
    },
    {
      icon: Music,
      title: 'Concerts & Performances',
      description: 'Live music and cultural performances',
      color: 'text-purple-400',
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
      color: 'text-green-400',
    },
  ]

  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone',
      detail: '+66 2 233 1731',
      color: 'text-blue-400',
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
      color: 'text-green-400',
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg'
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

      {/* Overview Section */}
      <section className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Historic Venues for Every Occasion
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
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
            <p className='text-xl leading-relaxed text-gray-700 mb-8'>
              Our historic library building provides a unique and elegant
              setting for your special events. Each space offers its own
              character and charm, perfect for creating memorable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Venue Spaces Section */}
      <section ref={spacesRef} className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Our Venue Spaces
            </h2>
            <p className='text-xl text-gray-600'>
              Each space offers unique character and flexibility
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {venueSpaces.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-white p-8 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow'
                >
                  <Icon className={`w-16 h-16 ${detail.color} mb-6`} />
                  <h3 className='text-gray-900 font-semibold text-xl mb-4'>
                    {detail.title}
                  </h3>
                  <p className='text-gray-600 mb-4 leading-relaxed'>
                    {detail.description}
                  </p>
                  <div className='text-teal-600 font-semibold'>
                    {detail.capacity}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Event Types Section */}
      <section ref={eventsRef} className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Types of Events
            </h2>
            <p className='text-xl text-gray-600'>
              Our spaces accommodate a wide range of functions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
          >
            {eventTypes.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors'
                >
                  <Icon className={`w-12 h-12 ${detail.color} mb-4`} />
                  <h3 className='text-gray-900 font-semibold text-lg mb-2'>
                    {detail.title}
                  </h3>
                  <p className='text-gray-600'>{detail.description}</p>
                </div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='mt-12 bg-teal-50 p-8 rounded-lg border border-teal-200'
          >
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Special Requirements
            </h3>
            <p className='text-lg text-gray-700'>
              We would be pleased to discuss your specific requirements. Our
              team can help you find the perfect space and arrange all the
              details for your event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Get in Touch
            </h2>
            <p className='text-xl text-gray-600'>
              Please contact our Office Manager to make an appointment to view
              our facilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 gap-12'
          >
            <div className='space-y-8'>
              <div className='bg-white p-8 rounded-lg shadow-lg'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
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

              <div className='bg-teal-50 p-8 rounded-lg border border-teal-200'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Visit Our Facilities
                </h3>
                <p className='text-gray-700 mb-6'>
                  We recommend scheduling a visit to see our spaces in person
                  and discuss your specific needs with our team.
                </p>
                <Link href='/contact'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                    Schedule a Visit
                  </Button>
                </Link>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg'
                alt='Neilson Hays Library venue spaces'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 px-4 bg-teal-50'>
        <div className='max-w-4xl mx-auto text-center'>
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
      </section>
    </div>
  )
}
