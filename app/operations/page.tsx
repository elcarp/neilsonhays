'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Users, BookOpen, Calendar, Heart, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Operations() {
  const boardRef = useRef(null)
  const officersRef = useRef(null)
  const staffRef = useRef(null)
  const volunteersRef = useRef(null)

  const boardResponsibilities = [
    {
      icon: BookOpen,
      title: 'Collection Management',
      description: 'Selection of books for the library collection',
      color: 'text-blue-400',
    },
    {
      icon: Users,
      title: 'Personnel Management',
      description: 'Employment and supervision of all staff',
      color: 'text-teal-400',
    },
    {
      icon: Settings,
      title: 'Maintenance',
      description: 'Oversight of building and facility maintenance',
      color: 'text-yellow-400',
    },
    {
      icon: Calendar,
      title: 'Governance',
      description: 'Monthly board meetings and annual general meetings',
      color: 'text-purple-400',
    },
  ]

  const boardOfficers = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Galleries Curator',
    'Library Systems Coordinator',
    'Book Buying Coordinator',
    'Children&apos;s Programs Coordinator',
    'Adult Programs Coordinator',
    'Volunteer Coordinator',
    'Communications Coordinator',
    'Membership Coordinator',
    'Marketing Coordinator',
  ]

  const staffPositions = [
    {
      title: 'Office Manager',
      description: 'Oversees administrative operations and office management',
    },
    {
      title: 'Librarian',
      description: 'Manages library services and collection development',
    },
    {
      title: 'Librarian Assistant',
      description: 'Supports library operations and patron services',
    },
    {
      title: 'Housekeepers',
      description: 'Maintains cleanliness and organization of the facility',
    },
  ]

  const contractedServices = [
    {
      title: 'Gardening',
      description: 'Maintenance of our beautiful gardens',
    },
    {
      title: 'Pest Control',
      description: 'Protection against tropical pests',
    },
    {
      title: 'Facilities Maintenance',
      description: 'Structural integrity maintenance for Bangkok&apos;s tropical weather',
    },
  ]

  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://neilsonhayslibrary.org/wp-content/uploads/2019/08/nhl_Home14_img-845x321.jpg'
          alt='Neilson Hays Library operations'
          fill
          className='object-cover opacity-30'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Operations'
            description='Library Association Board'
            quote='I&apos;ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.'
          />
          <p className='text-white text-lg mt-4'>— Maya Angelou</p>
        </div>
      </section>

      {/* Board Overview Section */}
      <section ref={boardRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Library Association Board
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              The Neilson Hays Library Association Board is responsible for the management of the Neilson Hays Library, including: maintenance, the selection of books for the collection, and the employment and supervision of all personnel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8'>
              The Board meets on a monthly basis, with an Annual General Meeting held in the first quarter of every year.
            </p>

            <div className='bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-8'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Constitutional Structure
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                Following Dr. Hays&apos; wishes, the Board is constitutionally comprised of twelve ladies. However, we very much welcome and value our male volunteers, members, and Friends of the Library. There are many opportunities for all of our members to get involved.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Board Responsibilities */}
      <section className='py-20 px-4 bg-gray-900'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Board Responsibilities
            </h2>
            <p className='text-xl text-gray-300'>
              Comprehensive oversight of library operations and governance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {boardResponsibilities.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-gray-800 p-6 rounded-lg border border-gray-700 text-center'
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${detail.color}`} />
                  <h3 className='text-white font-semibold text-lg mb-2'>
                    {detail.title}
                  </h3>
                  <p className='text-gray-300'>{detail.description}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Board Officers Section */}
      <section ref={officersRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Officers of the Association Board
            </h2>
            <p className='text-xl text-gray-300'>
              Dedicated leadership ensuring the library&apos;s continued success
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'
          >
            {boardOfficers.map((officer, index) => (
              <div
                key={officer}
                className='bg-gray-800 p-4 rounded-lg border border-gray-700'
              >
                <div className='flex items-center'>
                  <div className='w-3 h-3 bg-teal-500 rounded-full mr-3'></div>
                  <span className='text-white font-medium'>{officer}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Staff Section */}
      <section ref={staffRef} className='py-20 px-4 bg-gray-900'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Day-to-Day Operations
            </h2>
            <p className='text-xl text-gray-300'>
              Professional staff and contracted services ensure smooth operations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-8'
          >
            <div>
              <h3 className='text-2xl font-bold text-white mb-6'>
                Library Staff
              </h3>
              <div className='grid md:grid-cols-2 gap-6'>
                {staffPositions.map((position, index) => (
                  <div
                    key={position.title}
                    className='bg-gray-800 p-6 rounded-lg border border-gray-700'
                  >
                    <h4 className='text-white font-semibold text-lg mb-2'>
                      {position.title}
                    </h4>
                    <p className='text-gray-300'>{position.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-bold text-white mb-6'>
                Contracted Services
              </h3>
              <div className='grid md:grid-cols-3 gap-6'>
                {contractedServices.map((service, index) => (
                  <div
                    key={service.title}
                    className='bg-gray-800 p-6 rounded-lg border border-gray-700'
                  >
                    <h4 className='text-white font-semibold text-lg mb-2'>
                      {service.title}
                    </h4>
                    <p className='text-gray-300'>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section ref={volunteersRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Get Involved
            </h2>
            <p className='text-xl text-gray-300'>
              Many opportunities for all members to contribute
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-teal-900/20 p-8 rounded-lg border border-teal-700 mb-8'
          >
            <div className='text-center mb-6'>
              <Heart className='w-16 h-16 text-teal-400 mx-auto mb-4' />
              <h3 className='text-2xl font-bold text-white mb-4'>
                Volunteer Opportunities
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                We very much welcome and value our male volunteers, members, and Friends of the Library. There are many opportunities for all of our members to get involved in supporting the library&apos;s mission and operations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid md:grid-cols-2 gap-8'
          >
            <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Friends of the Library
              </h3>
              <p className='text-gray-300'>
                Join our community of supporters who help maintain and enhance the library&apos;s services and programs through their time, expertise, and resources.
              </p>
            </div>

            <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Member Involvement
              </h3>
              <p className='text-gray-300'>
                From event planning to collection development, there are numerous ways for members to contribute their skills and passion to the library&apos;s success.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 px-4 bg-gray-900'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl font-bold text-white mb-6'>
              Join Our Community
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Become part of the Neilson Hays Library family
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/membership'>
                <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                  Become a Member
                </Button>
              </Link>
              <Link href='/contact'>
                <Button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg'>
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}