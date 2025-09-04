'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import {
  BookOpen,
  Users,
  Calendar,
  MapPin,
  Mic,
  PenTool,
  Heart,
  X,
} from 'lucide-react'
import { useState } from 'react'

// Note: Metadata moved to layout.tsx or removed due to client component requirements

const featuredAuthors = [
  {
    name: 'Adam Higginbotham',
    country: 'U.K.',
    description:
      'Author of Midnight in Chernobyl, an international bestseller translated into 25 languages. His writing has appeared in The New Yorker, Wired, and The New York Times Magazine.',
    notable: 'Midnight in Chernobyl',
  },
  {
    name: 'Bernardine Evaristo',
    country: 'U.K.',
    description:
      'Won the 2019 Booker Prize for Girl, Woman, Other, becoming the first black woman to win the award. Professor of Creative Writing at Brunel University London.',
    notable: '2019 Booker Prize Winner',
  },
  {
    name: 'Toshikazu Kawaguchi',
    country: 'Japan',
    description:
      'Novelist and stage director. His debut novel, Before the Coffee Gets Cold, sold over 3.8 million copies worldwide and has been adapted for the screen.',
    notable: 'Before the Coffee Gets Cold',
  },
  {
    name: 'Amy Sawitta Lefevre',
    country: 'Thailand',
    description:
      'Award-winning journalist with 15 years of reporting across Asia-Pacific. Former Reuters deputy bureau chief for Thailand and Indochina.',
    notable: 'Pulitzer-winning reporting contributor',
  },
  {
    name: 'Will Schwalbe',
    country: 'U.S.',
    description:
      'Author and editor at Macmillan, known for The End of Your Life Book Club and Books for Living. Regular contributor to The New York Times.',
    notable: 'The End of Your Life Book Club',
  },
  {
    name: 'Win Nimman',
    country: 'Thailand',
    description:
      'Poet, singer-songwriter, and healer known as RomanticraiPoet. Published seven poetry books and creates "Rock \'n\' Romantic" songs.',
    notable: 'Seven published poetry books',
  },
]

const festivalHighlights = [
  {
    title: 'Panel Discussions',
    description:
      'From Southeast Asian historical fiction to climate change conversations, inspiring audiences with lively Q&As.',
    icon: Mic,
    color: 'bg-teal-100 text-teal-600',
  },
  {
    title: 'Creative Workshops',
    description:
      'Self-portraits for kids, bookmaking, calligraphy, botanical watercolor, and creative writing for all ages.',
    icon: PenTool,
    color: 'bg-teal-100 text-teal-700',
  },
  {
    title: 'Book Market',
    description:
      'Independent publishers, secondhand book sellers, and literary organizations filled the garden.',
    icon: BookOpen,
    color: 'bg-teal-100 text-teal-500',
  },
  {
    title: 'Community Vibe',
    description:
      'Book signings, author meet-and-greets, and delicious treats in a relaxed, welcoming atmosphere.',
    icon: Users,
    color: 'bg-teal-100 text-teal-600',
  },
]

export default function LiteratureFestival() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const galleryImages = [
    '/images/litfest/DSC_4789.jpg',
    '/images/litfest/DSC_4793.jpg',
    '/images/litfest/DSC_4805.jpg',
    '/images/litfest/DSC_5043.jpg',
    '/images/litfest/DSC_5077.jpg',
    '/images/litfest/DSC_5189.jpg',
    '/images/litfest/DSC_5218.jpg',
    '/images/litfest/DSC_5224.jpg',
    '/images/litfest/DSC_5239.jpg',
    '/images/litfest/DSC_5328.jpg',
    '/images/litfest/DSC_5333.jpg',
    '/images/litfest/DSC_5385.jpg',
    '/images/litfest/DSC_5544.jpg',
    '/images/litfest/DSC_5724.jpg',
    '/images/litfest/DSC_6223.jpg',
    '/images/litfest/DSC_7120.jpg',
    '/images/litfest/DSC_7236.jpg',
    '/images/litfest/DSC_7424.jpg',
    '/images/litfest/DSC_7597.jpg',
    '/images/litfest/DSC00121.jpg',
    '/images/litfest/DSC00240.jpg',
    '/images/litfest/DSC00572.jpg',
    '/images/litfest/DSC00691.jpg',
    '/images/litfest/DSC00762.jpg',
    '/images/litfest/DSC00819.jpg',
    '/images/litfest/DSC00876.jpg',
    '/images/litfest/DSC00889.jpg',
    '/images/litfest/DSC00948.jpg',
    '/images/litfest/DSC00958.jpg',
    '/images/litfest/DSC00974.jpg',
    '/images/litfest/DSC01031.jpg',
    '/images/litfest/DSC01067.jpg',
    '/images/litfest/DSC01102.jpg',
    '/images/litfest/DSC01184.jpg',
    '/images/litfest/DSC01196.jpg',
    '/images/litfest/DSC01215.jpg',
    '/images/litfest/DSC01236.jpg',
    '/images/litfest/DSC01263.jpg',
    '/images/litfest/DSC01541.jpg',
    '/images/litfest/DSC01552.jpg',
    '/images/litfest/DSC01567.jpg',
    '/images/litfest/DSC01579.jpg',
    '/images/litfest/DSC01588.jpg',
    '/images/litfest/DSC01604.jpg',
    '/images/litfest/DSC01640.jpg',
    '/images/litfest/DSC01658.jpg',
    '/images/litfest/DSC01681.jpg',
    '/images/litfest/DSC01718.jpg',
    '/images/litfest/DSC01932.jpg',
    '/images/litfest/DSC01944.jpg',
    '/images/litfest/DSC01964.jpg',
    '/images/litfest/DSC02017.jpg',
    '/images/litfest/DSC03493.jpg',
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 pt-36'>
      <PageTitle
        title='Bangkok Literature Festival 2023'
        description='A Weekend of Words, Ideas, and Inspiration in the Heart of Bangkok'
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16'>
        {/* Hero Section */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12'>
          <div className='grid md:grid-cols-2 gap-6 sm:gap-8 items-center'>
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Calendar className='w-5 h-5 text-teal-600' />
                <span className='text-sm sm:text-base font-semibold text-teal-600'>
                  2023 Festival Recap
                </span>
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6'>
                A Vibrant Return to Literary Celebration
              </h2>
              <p className='text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed'>
                The Neilson Hays Library Literature Festival made a vibrant
                return in 2023 with an unforgettable weekend celebrating books,
                authors, and the power of storytelling. Held in the historic
                grounds of Neilson Hays Library, Bangkok (หอสมุดเนียลสัน เฮส์),
                the festival was a dynamic gathering of readers, writers,
                publishers, and creatives from Thailand and beyond.
              </p>
              <div className='flex items-center gap-2 text-sm sm:text-base text-gray-600'>
                <MapPin className='w-4 h-4' />
                <span>Neilson Hays Library, Bangkok</span>
              </div>
            </div>
            <div className='relative order-first md:order-last'>
              <Image
                src='/images/litfest.jpg'
                alt='Literature Festival Author Talk'
                width={600}
                height={400}
                className='rounded-lg sm:rounded-xl shadow-md object-cover w-full h-48 sm:h-64 md:h-80'
              />
            </div>
          </div>
        </div>

        {/* Festival Theme */}
        <div className='text-center mb-12 sm:mb-16'>
          <div className='bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-white'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>
              Bridging Cultures and Communities through Storytelling
            </h2>
            <p className='text-base sm:text-lg opacity-90 max-w-3xl mx-auto leading-relaxed'>
              Spanning two days, the 2023 festival transformed the library and
              its lush garden into a buzzing hub of literary activity. With over
              20 sessions, including book launches, panel discussions, poetry
              readings, and creative workshops, the event welcomed people of all
              ages and backgrounds to celebrate the written word.
            </p>
          </div>
        </div>

        {/* Featured Authors */}
        <div className='mb-12 sm:mb-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4'>
            Featured Authors & Special Guests
          </h2>
          <p className='text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
            The 2023 festival featured an impressive lineup of local and
            international authors, offering a rich mix of perspectives and
            genres.
          </p>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {featuredAuthors.map((author, index) => (
              <div
                key={index}
                className='bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300'
              >
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-lg sm:text-xl font-bold text-gray-900'>
                    {author.name}
                  </h3>
                  <span className='text-xs sm:text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
                    {author.country}
                  </span>
                </div>
                <div className='mb-4'>
                  <span className='text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full'>
                    {author.notable}
                  </span>
                </div>
                <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                  {author.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className='mb-12 sm:mb-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4'>
            Festival Photo Gallery
          </h2>
          <p className='text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
            Capturing the moments, conversations, and community spirit of the
            2023 Literature Festival
          </p>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className='relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
                onClick={() => setLightboxImage(src)}
              >
                <Image
                  src={src}
                  alt={`Festival moment ${index + 1}`}
                  width={400}
                  height={300}
                  className='w-full h-32 sm:h-40 lg:h-48 object-cover'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'></div>
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='bg-white/90 rounded-full p-2'>
                    <svg
                      className='w-6 h-6 text-gray-800'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Festival Highlights */}
        <div className='mb-12 sm:mb-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4'>
            Festival Highlights
          </h2>
          <p className='text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4'>
            From engaging panel talks to hands-on workshops, the festival
            offered something for everyone in a welcoming, community-driven
            atmosphere.
          </p>

          <div className='grid sm:grid-cols-2 gap-6 sm:gap-8'>
            {festivalHighlights.map((highlight, index) => (
              <div
                key={index}
                className='bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300'
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full ${highlight.color} mb-4 sm:mb-6`}
                >
                  <highlight.icon className='w-6 h-6 sm:w-8 sm:h-8' />
                </div>
                <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4'>
                  {highlight.title}
                </h3>
                <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Details */}
        <div className='bg-gradient-to-r from-green-600 to-teal-600 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-white mb-8 sm:mb-12'>
          <div className='grid md:grid-cols-2 gap-6 sm:gap-8 items-center'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>
                Workshops for All Ages
              </h2>
              <div className='space-y-4 text-base sm:text-lg opacity-90 leading-relaxed'>
                <p>
                  <strong>For Young Creators:</strong> Self Portraits for Kids,
                  Beloved Toys Maker Workshop inspired by Nathalie Lété&apos;s
                  book
                </p>
                <p>
                  <strong>For Teens & Adults:</strong> Bookmaking with
                  traditional coptic stitch binding, English Roundhand
                  Calligraphy, Spanish Story Scrabble
                </p>
                <p>
                  <strong>Visual Arts:</strong> Botanical Watercolour
                  Illustration with Malaysian artist Syarifah Nadhirah,
                  capturing Thai and Malaysian flora
                </p>
                <p>
                  <strong>Creative Writing:</strong> Thai-language workshops
                  with art4d, idea generation, and personal style development
                </p>
              </div>
            </div>

            <div className='relative order-first md:order-last mt-6 md:mt-0'>
              <Image
                src='/images/workshop.jpg'
                alt='Workshop Activities'
                width={500}
                height={400}
                className='rounded-lg sm:rounded-xl shadow-lg object-cover w-full h-48 sm:h-64 md:h-80'
              />
            </div>
          </div>
        </div>

        {/* Why It Mattered */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>
              Why It Mattered
            </h2>
            <p className='text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed'>
              The 2023 Literature Festival was more than a weekend event — it
              was a celebration of Bangkok&apos;s literary spirit and the
              enduring relevance of books in a digital age. By hosting
              conversations, cultural activities, and book club-style events in
              Bangkok, the library created a space for connection and discovery
              in a setting that is both historic and forward-looking.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
            <div className='bg-gray-50 rounded-lg p-6'>
              <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                Cultural Impact
              </h3>
              <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                As Bangkok grows as a cultural capital in Southeast Asia, events
                like this foster creativity, support local talent, and build
                bridges across communities and cultures.
              </p>
            </div>
            <div className='bg-gray-50 rounded-lg p-6'>
              <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                Historic Setting
              </h3>
              <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                The neoclassical architecture of Neilson Hays Library, designed
                by Mario Tamagno, provided a fitting backdrop — a venue where
                history meets new ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-full mb-6'>
            <Heart className='w-8 h-8' />
          </div>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>
            Be Part of the Story
          </h2>
          <p className='text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4'>
            The 2023 festival laid the groundwork for future events. Stay
            connected with us for updates on upcoming author talks, workshops,
            and cultural gatherings at Bangkok&apos;s historic library.
          </p>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8'>
            <Link href='/events'>
              <Button
                size='lg'
                className='bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto'
              >
                Upcoming Events
              </Button>
            </Link>
            <Link href='/volunteer'>
              <Button
                variant='outline'
                size='lg'
                className='border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto'
              >
                Volunteer With Us
              </Button>
            </Link>
          </div>

          <div className='pt-6 sm:pt-8 border-t border-gray-200'>
            <p className='text-xs sm:text-sm text-gray-600 px-4'>
              The Literature Festival wouldn&apos;t be possible without the
              support of volunteers, sponsors, and the community. Whether
              you&apos;re a reader, writer, or simply curious, there&apos;s a
              place for you at our next festival.
            </p>
          </div>
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
              alt='Festival photo enlarged'
              width={1200}
              height={800}
              className='max-w-full max-h-[90vh] object-contain rounded-lg'
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
