'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Users, BookOpen, Calendar, Camera, PenTool, Heart, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Volunteer() {
  const rolesRef = useRef(null)
  const contactRef = useRef(null)

  const volunteerRoles = [
    {
      icon: BookOpen,
      title: 'Book Sale Events',
      description: 'Assisting with second-hand book sale events (sorting, pricing, cashiering)',
      color: 'text-blue-400',
    },
    {
      icon: Heart,
      title: 'Children&apos;s Programs',
      description: 'Assisting at children&apos;s program events',
      color: 'text-pink-400',
    },
    {
      icon: Calendar,
      title: 'Adult Events & Fundraisers',
      description: 'Planning and assisting at adult&apos;s events and fundraisers',
      color: 'text-teal-400',
    },
    {
      icon: Users,
      title: 'School Visits',
      description: 'Leading and assisting with school visits',
      color: 'text-green-400',
    },
    {
      icon: PenTool,
      title: 'Press & Newsletter',
      description: 'Preparing press releases and newsletter coordination',
      color: 'text-purple-400',
    },
    {
      icon: Camera,
      title: 'Digital Media',
      description: 'Assisting with social media and website updates',
      color: 'text-orange-400',
    },
    {
      icon: PenTool,
      title: 'Graphic Design',
      description: 'Providing graphic design expertise',
      color: 'text-indigo-400',
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Make a meaningful difference in the Bangkok community',
      color: 'text-green-400',
    },
    {
      icon: Users,
      title: 'Social Experience',
      description: 'Meet like-minded people and build lasting friendships',
      color: 'text-blue-400',
    },
    {
      icon: BookOpen,
      title: 'Skill Development',
      description: 'Learn new skills and gain valuable experience',
      color: 'text-purple-400',
    },
    {
      icon: Calendar,
      title: 'Cultural Enrichment',
      description: 'Immerse yourself in the library&apos;s rich cultural environment',
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
      color: 'text-blue-400',
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
          alt='Neilson Hays Library volunteer opportunities'
          fill
          className='object-cover opacity-40'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Friends of the Library'
            description='Offering your time as a volunteer with the Library is a rewarding and social experience'
            quote='Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it&apos;s the only thing that ever has.'
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
              Join Our Volunteer Team
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The Neilson Hays Library is fortunate to have a dedicated team of volunteers who generously give their time to assist in the operations and programs of the library.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg mx-auto text-center'
          >
            <p className='text-xl leading-relaxed text-gray-700 mb-8'>
              Members of the library and the wider community are warmly encouraged to volunteer with the library. Volunteers are needed throughout the year in various roles that help us maintain our services and programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Roles Section */}
      <section ref={rolesRef} className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Volunteer Opportunities
            </h2>
            <p className='text-xl text-gray-600'>
              Various roles available throughout the year
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
          >
            {volunteerRoles.map(detail => {
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
                  <p className='text-gray-600 leading-relaxed'>
                    {detail.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Benefits of Volunteering
            </h2>
            <p className='text-xl text-gray-600'>
              Why volunteer with Neilson Hays Library?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {benefits.map(detail => {
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
              Get Involved
            </h2>
            <p className='text-xl text-gray-600'>
              Please submit your interest and we will be in touch with you shortly
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
                  We welcome volunteers from all backgrounds and experience levels. Whether you can commit to a few hours a week or just occasional events, your contribution makes a difference.
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
                src='https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg'
                alt='Neilson Hays Library volunteer opportunities'
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
              Make a Difference Today
            </h2>
            <p className='text-xl text-gray-700 mb-8'>
              Join our community of dedicated volunteers and help preserve this historic library for future generations
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a href='mailto:volunteer@neilsonhayslibrary.org'>
                <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                  Start Volunteering
                </Button>
              </a>
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