'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Coffee, Clock, Users, BookOpen, Heart, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Cafe() {
  const menuRef = useRef(null)
  const atmosphereRef = useRef(null)
  const hoursRef = useRef(null)

  const cafeFeatures = [
    {
      icon: Coffee,
      title: 'Food & Beverages',
      description: 'Breakfast, lunch, snacks and drinks served daily',
      color: 'text-orange-400',
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Perfect for families after Children&apos;s Story Time',
      color: 'text-pink-400',
    },
    {
      icon: BookOpen,
      title: 'Library Setting',
      description: 'Relax with a book and enjoy your meal',
      color: 'text-blue-400',
    },
    {
      icon: Heart,
      title: 'Art Exhibitions',
      description: 'Regular art exhibitions provide visual treat',
      color: 'text-purple-400',
    },
  ]

  const menuItems = [
    {
      icon: Coffee,
      title: 'Breakfast',
      description: 'Start your day with our delicious breakfast options',
      time: '9:00 AM - 11:00 AM',
      color: 'text-yellow-400',
    },
    {
      icon: Coffee,
      title: 'Lunch',
      description: 'Fresh and tasty lunch selections',
      time: '11:00 AM - 3:00 PM',
      color: 'text-green-400',
    },
    {
      icon: Coffee,
      title: 'Snacks & Drinks',
      description: 'Light snacks and refreshing beverages',
      time: 'All day',
      color: 'text-blue-400',
    },
  ]

  const atmosphereDetails = [
    {
      icon: Users,
      title: 'Business Meetings',
      description: 'Ideal location for casual business meetings over coffee or lunch',
      color: 'text-teal-400',
    },
    {
      icon: Heart,
      title: 'Family Time',
      description: 'Kids can refuel, make new friends and play in the open',
      color: 'text-pink-400',
    },
    {
      icon: BookOpen,
      title: 'Reading Corner',
      description: 'Select a good book and relax with a delicious cappuccino',
      color: 'text-purple-400',
    },
    {
      icon: Coffee,
      title: 'Escape the Heat',
      description: 'Escape the Bangkok heat with a cool drink',
      color: 'text-blue-400',
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg'
          alt='Neilson Hays Library Garden Café'
          fill
          className='object-cover opacity-40'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Garden Café'
            description='A popular destination with library members and local business people alike'
            quote='Good food and good company make for a perfect day.'
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
              Food and Beverages
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The Neilson Hays Library Garden Café is a popular destination with library members and local business people alike.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 gap-12 items-center'
          >
            <div className='prose prose-lg'>
              <p className='text-xl leading-relaxed text-gray-700 mb-8'>
                Operated by our neighbors, The British Club, the café serves breakfast, lunch, snacks and drinks Monday – Friday, 9:00 AM – 6:00 PM.
              </p>

              <div className='bg-orange-50 p-8 rounded-lg border border-orange-200 mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Convenient Location
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  The convenience of our car park makes it an ideal location for casual business meetings over coffee or lunch, while regular art exhibitions provide an added visual treat.
                </p>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg'
                alt='Neilson Hays Library Garden Café'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cafe Features Section */}
      <section className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              What Makes Us Special
            </h2>
            <p className='text-xl text-gray-600'>
              Discover the unique features of our Garden Café
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {cafeFeatures.map(detail => {
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

      {/* Menu Section */}
      <section ref={menuRef} className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Our Menu
            </h2>
            <p className='text-xl text-gray-600'>
              Fresh and delicious options throughout the day
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-3 gap-8'
          >
            {menuItems.map(detail => {
              return (
                <div
                  key={detail.title}
                  className='bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors'
                >
                  <h3 className='text-gray-900 font-semibold text-xl mb-4'>
                    {detail.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{detail.description}</p>
                  <div className='flex items-center gap-2 text-orange-600 font-semibold'>
                    <Clock className='w-5 h-5' />
                    <span>{detail.time}</span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section ref={atmosphereRef} className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Perfect Atmosphere
            </h2>
            <p className='text-xl text-gray-600'>
              Come select a good book and relax with a delicious cappuccino
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {atmosphereDetails.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-white p-6 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors'
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

      {/* Hours & Location Section */}
      <section ref={hoursRef} className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Hours & Location
            </h2>
            <p className='text-xl text-gray-600'>
              Visit us during our operating hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 gap-12'
          >
            <div className='space-y-8'>
              <div className='bg-orange-50 p-8 rounded-lg border border-orange-200'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                  Operating Hours
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <Calendar className='w-6 h-6 text-orange-600' />
                    <div>
                      <h4 className='font-semibold text-gray-900'>Monday - Friday</h4>
                      <p className='text-gray-600'>9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Users className='w-6 h-6 text-orange-600' />
                    <div>
                      <h4 className='font-semibold text-gray-900'>Saturday Story Time</h4>
                      <p className='text-gray-600'>Families welcome for lunch after story time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-teal-50 p-8 rounded-lg border border-teal-200'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Family Friendly
                </h3>
                <p className='text-gray-700 mb-6'>
                  Children&apos;s Story Time every Saturday morning sees families come together afterward for a family friendly lunch – kids can refuel, make new friends and play in the open, whilst parents relax and enjoy their meal.
                </p>
                <Link href='/kids'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                    Learn About Story Time
                  </Button>
                </Link>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg'
                alt='Neilson Hays Library Garden Café atmosphere'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 px-4 bg-orange-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
              Visit Our Garden Café
            </h2>
            <p className='text-xl text-gray-700 mb-8'>
              Come select a good book and relax with a delicious cappuccino, or escape the Bangkok heat with a cool drink
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/contact'>
                <Button className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg'>
                  Get Directions
                </Button>
              </Link>
              <Link href='/membership'>
                <Button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg'>
                  Become a Member
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}