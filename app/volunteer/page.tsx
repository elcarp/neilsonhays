'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Users,
  BookOpen,
  Calendar,
  Camera,
  PenTool,
  Heart,
  Mail,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Volunteer() {
  const volunteerRoles = [
    {
      icon: BookOpen,
      title: 'Book Sale Events',
      description:
        'Assisting with second-hand book sale events (sorting, pricing, cashiering)',
      color: 'text-teal-400',
    },
    {
      icon: Heart,
      title: "Children's Programs",
      description: "Assisting at children's program events",
      color: 'text-teal-300',
    },
    {
      icon: Calendar,
      title: 'Adult Events & Fundraisers',
      description: "Planning and assisting at adult's events and fundraisers",
      color: 'text-teal-400',
    },
    {
      icon: Users,
      title: 'School Visits',
      description: 'Leading and assisting with school visits',
      color: 'text-teal-500',
    },
    {
      icon: PenTool,
      title: 'Press & Newsletter',
      description: 'Preparing press releases and newsletter coordination',
      color: 'text-teal-400',
    },
    {
      icon: Camera,
      title: 'Digital Media',
      description: 'Assisting with social media and website updates',
      color: 'text-teal-300',
    },
    {
      icon: PenTool,
      title: 'Graphic Design',
      description: 'Providing graphic design expertise',
      color: 'text-teal-500',
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Make a meaningful difference in the Bangkok community',
      color: 'text-teal-500',
    },
    {
      icon: Users,
      title: 'Social Experience',
      description: 'Meet like-minded people and build lasting friendships',
      color: 'text-teal-400',
    },
    {
      icon: BookOpen,
      title: 'Skill Development',
      description: 'Learn new skills and gain valuable experience',
      color: 'text-teal-400',
    },
    {
      icon: Calendar,
      title: 'Cultural Enrichment',
      description:
        'Immerse yourself in the library\'s rich cultural environment',
      color: 'text-teal-400',
    },
  ]

  const contactDetails = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'volunteer@neilsonhayslibrary.org',
      color: 'text-teal-400',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+66 2 233 1731',
      color: 'text-teal-400',
    },
    {
      icon: Calendar,
      title: 'Office Hours',
      detail: 'Tuesday - Sunday, 9:30 AM - 5:00 PM',
      color: 'text-teal-500',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 to-blue-50'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='/images/volunteer.webp'
          alt='Neilson Hays Library volunteer opportunities'
          fill
          className='object-cover opacity-100'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Friends of the Library'
            description='Offering your time as a volunteer with the Library is a rewarding and social experience'
            quote="Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has."
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
              Join Our Volunteer Team
            </h2>
            <p className='text-base sm:text-lg text-gray-600 max-w-3xl mx-auto'>
              The Neilson Hays Library is fortunate to have a dedicated team of
              volunteers who generously give their time to assist in the
              operations and programs of the library.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg mx-auto text-center'
          >
            <p className='text-base sm:text-lg leading-relaxed text-gray-700 mb-8'>
              Members of the library and the wider community are warmly
              encouraged to volunteer with the library. Volunteers are needed
              throughout the year in various roles that help us maintain our
              services and programs.
            </p>
          </motion.div>
        </div>

        {/* Volunteer Roles Section */}
        <div className='mb-12 sm:mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4'>
              Volunteer Opportunities
            </h2>
            <p className='text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
              Various roles available throughout the year
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
          >
            {volunteerRoles.map(detail => {
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
                  <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                    {detail.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Benefits Section */}
        <div className='bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-white mb-8 sm:mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>
              Benefits of Volunteering
            </h2>
            <p className='text-base sm:text-lg opacity-90 max-w-3xl mx-auto'>
              Why volunteer with Neilson Hays Library?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'
          >
            {benefits.map(detail => {
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
        </div>

        {/* Contact Section */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Get Involved
            </h2>
            <p className='text-xl text-gray-600'>
              Please submit your interest and we will be in touch with you
              shortly
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
                  Ready to Volunteer?
                </h3>
                <p className='text-gray-700 mb-6'>
                  We welcome volunteers from all backgrounds and experience
                  levels. Whether you can commit to a few hours a week or just
                  occasional events, your contribution makes a difference.
                </p>
                <a href='mailto:volunteer@neilsonhayslibrary.org'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                    Submit Your Interest
                  </Button>
                </a>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='/images/nhl-history.jpg'
                alt='Neilson Hays Library volunteer opportunities'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
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
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>
              Make a Difference Today
            </h2>
            <p className='text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4'>
              Join our community of dedicated volunteers and help preserve this
              historic library for future generations
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <a href='mailto:volunteer@neilsonhayslibrary.org'>
                <Button className='bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto'>
                  Start Volunteering
                </Button>
              </a>
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
    </div>
  )
}
