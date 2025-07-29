'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Hammer, Users, Clock, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Restoration() {
  const storyRef = useRef(null)
  const processRef = useRef(null)
  const videoRef = useRef(null)
  const gratitudeRef = useRef(null)

  const restorationStats = [
    {
      icon: Clock,
      title: '2 Years',
      description: 'Duration of the restoration project',
      color: 'text-blue-400',
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Donors and volunteers from worldwide',
      color: 'text-teal-400',
    },
    {
      icon: Hammer,
      title: 'Multi-Million Baht',
      description: 'Fully funded by donations',
      color: 'text-yellow-400',
    },
    {
      icon: Building2,
      title: '150 Years',
      description: 'Expected lifespan after restoration',
      color: 'text-purple-400',
    },
  ]

  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://neilsonhayslibrary.org/wp-content/uploads/2019/12/nhl_Home16_img-845x321.jpg'
          alt='Neilson Hays Library restoration'
          fill
          className='object-cover opacity-30'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Library Restoration'
            description='Coming together is a beginning. Keeping together is progress. Working together is success.'
            quote='— Henry Ford'
          />
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Our Restoration Story
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              In late 2016, with the building in obvious disrepair, the Neilson Hays Library Association Board enlisted the architectural restoration experts to survey the property.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8'>
              The results indicated visible damages were due to much deeper systemic problems, and the first major restoration of the Library structure and ground was critically needed.
            </p>

            <div className='bg-red-900/20 p-8 rounded-lg border border-red-700 mb-8'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Critical Need for Restoration
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                With the building showing obvious signs of disrepair, the Board recognized that immediate action was necessary to preserve this historic landmark for future generations.
              </p>
            </div>

            <p className='text-xl leading-relaxed text-gray-300'>
              With the generosity of members, volunteers, and donors, the library underwent a two year, multi-million baht renovation fully funded by donations in time and money from the Neilson Hays Library community worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Restoration Stats */}
      <section className='py-20 px-4 bg-gray-900'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Restoration by the Numbers
            </h2>
            <p className='text-xl text-gray-300'>
              A testament to community collaboration and dedication
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {restorationStats.map(detail => {
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

      {/* Video Section */}
      <section ref={videoRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Watch Our Restoration Journey
            </h2>
            <p className='text-xl text-gray-300'>
              Experience the transformation through this documentary
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl'
          >
            <iframe
              src='https://www.youtube.com/embed/ARjtUBovNFU'
              title='Neilson Hays Library Restoration Documentary'
              className='w-full h-full'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className='py-20 px-4 bg-gray-900'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              The Restoration Process
            </h2>
            <p className='text-xl text-gray-300'>
              From assessment to completion
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-8'
          >
            <div className='bg-gray-800 p-8 rounded-lg border border-gray-700'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Phase 1: Assessment & Planning
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                Architectural restoration experts conducted thorough surveys of the property, identifying both visible damages and deeper systemic problems that required immediate attention.
              </p>
            </div>

            <div className='bg-gray-800 p-8 rounded-lg border border-gray-700'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Phase 2: Community Mobilization
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                The Neilson Hays Library community worldwide came together, contributing both time and financial resources to fund the multi-million baht renovation project.
              </p>
            </div>

            <div className='bg-gray-800 p-8 rounded-lg border border-gray-700'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Phase 3: Restoration & Renovation
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                Over two years, the library underwent comprehensive restoration, addressing structural issues while preserving the historic character and architectural integrity of the building.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gratitude Section */}
      <section ref={gratitudeRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Our Gratitude
            </h2>
            <p className='text-xl text-gray-300'>
              We are forever indebted to the generosity of our supporters
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-teal-900/20 p-8 rounded-lg border border-teal-700 mb-8'
          >
            <blockquote className='text-2xl italic text-white text-center mb-6'>
              &ldquo;We are forever indebted to the generosity of these supporters with whose help the Library can survive another 150 years.&rdquo;
            </blockquote>
            <p className='text-center text-gray-300'>
              — Neilson Hays Library Association
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8'>
              Today, this is our story…. The restoration of the Neilson Hays Library stands as a testament to what can be achieved when a community comes together with a shared vision. Through the combined efforts of members, volunteers, and donors from around the world, we have ensured that this historic landmark will continue to serve as a cultural and educational center for generations to come.
            </p>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Community Support
                </h3>
                <p className='text-gray-300'>
                  The restoration was made possible through the generous contributions of our global community of members, volunteers, and donors who shared our vision for preserving this historic landmark.
                </p>
              </div>

              <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Future Generations
                </h3>
                <p className='text-gray-300'>
                  With the restoration complete, the library is now positioned to serve as a cultural and educational center for another 150 years, continuing its legacy of community service.
                </p>
              </div>
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
              Support Our Legacy
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Join us in preserving this historic landmark for future generations
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