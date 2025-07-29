'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Award, Building2, Globe, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UnescoCulturalHeritageConservationAward2022() {
  const awardRef = useRef(null)
  const significanceRef = useRef(null)
  const acceptanceRef = useRef(null)
  const juryRef = useRef(null)

  const awardDetails = [
    {
      icon: Award,
      title: 'Award of Distinction',
      description:
        'The highest recognition for cultural heritage conservation in the Asia-Pacific region',
      color: 'text-yellow-400',
    },
    {
      icon: Globe,
      title: '50 Entries',
      description: 'From 11 countries across the Asia-Pacific region',
      color: 'text-blue-400',
    },
    {
      icon: Star,
      title: '13 Projects',
      description: 'Acknowledged for awards from six countries',
      color: 'text-pink-400',
    },
    {
      icon: Building2,
      title: 'Century-Old Library',
      description: 'Built in 1922 by Italian architect Mario Tamagno',
      color: 'text-teal-400',
    },
  ]

  const donors = [
    'Boon Rawd Brewery',
    'Sirivadhanabhakdi Foundation',
    'James H.W. Thompson Foundation',
    'Siam Commercial Bank',
    'Khun Soravij BhiromBhakdi',
    'Mahajak Development',
    'Lucky Living',
    'Décor Mart',
  ]

  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://neilsonhayslibrary.org/wp-content/uploads/2022/12/unnamed-4.jpg'
          alt='Neilson Hays Library exterior'
          fill
          className='object-cover opacity-30'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='UNESCO Cultural Heritage Conservation Award 2022'
            description='Award of Distinction: Neilson Hays Library'
            quote='A labor of love by all who were involved'
          />
        </div>
      </section>

      {/* Award Overview */}
      <section ref={awardRef} className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Restoration of Bangkok&apos;s Century-Old Library Wins UNESCO
              Asia-Pacific
            </h2>
            <p className='text-xl text-gray-300 max-w-4xl mx-auto'>
              The Neilson Hays Library was built in 1922 by an Italian
              architect, Mario Tamagno, and is an enduring testament to the wave
              of modernization that began with King Rama V (r.1868-1910).
            </p>
          </motion.div>

          {/* Award Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'
          >
            {awardDetails.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-gray-900 p-6 rounded-lg border border-gray-700 text-center'
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300'>
              The Library represents Thailand&apos;s first community library,
              possibly the first English-language — and most certainly the first
              women-led — library in the Southeast Asian region. Since then, it
              has functioned continuously as an independent, community library
              and cultural center in the heart of Bangkok, Thailand. Neilson
              Hays Library stands today not only as an icon on Bangkok&apos;s
              architectural map, but as a testament to the layers of
              under-represented narratives that add texture and nuance to the
              history of Thailand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Significance Section */}
      <section ref={significanceRef} className='py-20 px-4 bg-gray-900'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              UNESCO Recognition
            </h2>
            <p className='text-xl text-gray-300'>
              The restoration demonstrates a nuanced understanding of the spirit
              of place
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-8'
          >
            <blockquote className='text-2xl italic text-white text-center'>
              &ldquo;The restoration demonstrates a nuanced understanding of the
              spirit of place, which is well-respected and enhanced through
              careful research and investigation.&rdquo;
            </blockquote>
            <p className='text-center text-gray-300 mt-4'>
              — UNESCO Jury Statement
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300'>
              Since 2000, the UNESCO Asia-Pacific Awards for Cultural Heritage
              Conservation programme has been recognizing the efforts of private
              individuals and organizations in restoring, conserving, and
              transforming structures and buildings of heritage value in the
              region. By acknowledging private efforts to restore and adapt
              historic properties, the Awards encourage others to undertake
              conservation projects within their own communities, either
              independently or through public-private partnerships (PPPs).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Acceptance Speech Section */}
      <section ref={acceptanceRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Acceptance Speech
            </h2>
            <p className='text-xl text-gray-300'>
              Neilson Hays Library Association President Nalin Vanasin
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-gray-900 p-8 rounded-lg border border-gray-700 mb-8'
          >
            <blockquote className='text-xl italic text-white mb-6'>
              &ldquo;A labor of love by all who were involved coming together to
              dedicate themselves to both preserve a piece of history, and to
              propel their beloved library forward.&rdquo;
            </blockquote>
            <p className='text-gray-300'>
              — Nalin Vanasin, Library Association President
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8'>
              In particular, Vanasin thanked donors Boon Rawd Brewery,
              Sirivadhanabhakdi Foundation, the James H.W. Thompson Foundation,
              Siam Commercial Bank, Khun Soravij BhiromBhakdi, Mahajak
              Development, Lucky Living, and Décor Mart among others, as well as
              all the Library members for supporting the project. She also
              thanked Dr. Yuwarat Hemasilpin, the architectural teams, and Shma
              Company, for their research and sensitive designs, without whom
              the restoration would not have been the success it has become.
            </p>

            <div className='bg-yellow-900/20 p-6 rounded-lg border border-yellow-700'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Key Contributors
              </h3>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-lg font-semibold text-white mb-2'>
                    Major Donors
                  </h4>
                  <ul className='text-gray-300 space-y-1'>
                    {donors.slice(0, 4).map(donor => (
                      <li key={donor}>• {donor}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='text-lg font-semibold text-white mb-2'>
                    Project Team
                  </h4>
                  <ul className='text-gray-300 space-y-1'>
                    <li>• Dr. Yuwarat Hemasilpin</li>
                    <li>• Architectural teams</li>
                    <li>• Shma Company</li>
                    <li>• Library members</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jury Deliberations Section */}
      <section ref={juryRef} className='py-20 px-4 bg-gray-900'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Jury Deliberations
            </h2>
            <p className='text-xl text-gray-300'>
              International recognition for cultural heritage conservation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8'>
              UNESCO jury deliberations were carried out in November 2022 when
              members reviewed 50 entries from 11 countries from the
              Asia-Pacific region. Thirteen projects from six
              countries—Afghanistan, China, India, Iran, Nepal and Thailand—have
              been acknowledged for awards by an international jury in this
              year&apos;s awards programme.
            </p>

            <div className='grid md:grid-cols-2 gap-8 mb-8'>
              <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Award of Excellence
                </h3>
                <p className='text-gray-300'>
                  The Chhatrapati Shivaji Maharaj Vastu Sangrahalaya in Mumbai,
                  India
                </p>
              </div>

              <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Awards of Merit
                </h3>
                <p className='text-gray-300'>
                  Topdara Stupa, Charikar, Afghanistan, and Nantian Buddhist
                  Temple, Fujian, China
                </p>
              </div>
            </div>

            <div className='bg-teal-900/20 p-8 rounded-lg border border-teal-700'>
              <blockquote className='text-xl italic text-white mb-4'>
                &ldquo;The awards give people a sense of pride and sense of
                ownership of their own heritage.&rdquo;
              </blockquote>
              <p className='text-gray-300'>
                — Feng Jing, Chief of the Culture Unit at UNESCO Bangkok
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl font-bold text-white mb-6'>
              Support This Heritage Building
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Join the Library community by becoming a member to support this
              heritage building into the future!
            </p>
            <Link href='/membership'>
              <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                Become a Member
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
