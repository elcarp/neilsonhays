'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Users, BookOpen, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Programs() {
  const adultProgramsRef = useRef(null)
  const artExhibitionsRef = useRef(null)
  const bookSalesRef = useRef(null)

  const adultPrograms = [
    {
      icon: BookOpen,
      title: 'Author Talks',
      description:
        'Experience intimate conversations with local and international writers of fiction, non-fiction, and journalism.',
      color: 'text-blue-400',
    },
    {
      icon: Users,
      title: 'Book Club',
      description:
        'Join monthly group discussions at the library to analyze a chosen book or featured author.',
      color: 'text-teal-400',
    },
    {
      icon: Music,
      title: 'Concerts',
      description:
        'Enjoy live performances of a variety of musical genres performed by artists of all ages.',
      color: 'text-pink-400',
    },
  ]

  const gallerySpaces = [
    {
      title: 'Garden Cafe Gallery',
      description: 'A welcoming space for diverse artistic expressions',
      color: 'text-green-400',
    },
    {
      title: 'Rotunda Gallery',
      description: 'An elegant domed room with neo-classical architecture',
      color: 'text-teal-400',
    },
  ]

  const bookSaleDetails = [
    {
      title: 'Frequency',
      detail: 'Twice a year',
    },
    {
      title: 'Selection',
      detail: 'Thousands of fiction and non-fiction books in English',
    },
    {
      title: 'Languages',
      detail: 'English plus selection of other languages',
    },
    {
      title: 'Purpose',
      detail: 'Major fundraiser for Library upkeep and programs',
    },
  ]

  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://store.neilsonhayslibrary.org/wp-content/uploads/2023/07/NHL_2687-2048x1366.jpg'
          alt='Neilson Hays Library programs and events'
          fill
          className='object-cover opacity-50'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='A Community Center'
            description='From author talks and concerts to writing workshops and coding lessons, our programs offer activities for people of all ages.'
            quote='The greatness of a community is most accurately measured by the compassionate actions of its members.'
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
              Community Programs
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              A variety of events are held throughout the year, most free or
              discounted to Library members, and others open to the public for a
              small fee.
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
                Program activities are planned and led by generous volunteers.
                We welcome ideas and suggestions for events which may be of
                interest to our members and the wider community.
              </p>

              <div className='bg-teal-50 p-8 rounded-lg border border-teal-200 mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Get Involved
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  Contact us if you would like to get involved as a volunteer!
                  View the events calendar for information on how and when to
                  join us for upcoming activities.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/contact'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                    Contact Us
                  </Button>
                </Link>
                <Link href='/events'>
                  <Button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg'>
                    View Events Calendar
                  </Button>
                </Link>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='https://store.neilsonhayslibrary.org/wp-content/uploads/2023/07/DSCN2564-2048x1412.jpg'
                alt='Neilson Hays Library community programs'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Adult Programs Section */}
      <section ref={adultProgramsRef} className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Adult Programs
            </h2>
            <p className='text-xl text-gray-600'>
              Engaging activities for adult members and the community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-3 gap-8'
          >
            {adultPrograms.map(detail => {
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

      {/* Art Exhibitions Section */}
      <section ref={artExhibitionsRef} className='py-20 px-4 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Art Exhibitions
            </h2>
            <p className='text-xl text-gray-600'>
              Two distinct spaces for artists wishing to display their work
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
                The Neilson Hays Library offers a distinctive space for artists
                wishing to display their work. Stunning and accessible work by
                diverse artists of many nationalities is featured. Artistic
                media include paintings, photography, textiles and ceramics.
                Many artworks are offered for sale during the exhibitions.
              </p>
              <p className='text-xl leading-relaxed text-gray-700 mb-8'>
                Our Gallery Coordinator can advise on using this unique
                space.Contact the Library Office to inquire about exhibiting
                artwork.
              </p>

              <div className='bg-blue-50 p-8 rounded-lg border border-blue-200 mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Artistic Media
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  Artistic media include paintings, photography, textiles and
                  ceramics. Many artworks are offered for sale during the
                  exhibitions.
                </p>
              </div>

              <div className='text-center'>
                <p className='text-lg text-gray-700 mb-4'>
                  Our Gallery Coordinator can advise on using these unique
                  spaces. Contact the Library Office to inquire about exhibiting
                  artwork.
                </p>
                <Link href='/contact'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                    Contact Gallery Coordinator
                  </Button>
                </Link>
              </div>
            </div>

            <div className='space-y-8'>
              {gallerySpaces.map(space => (
                <div
                  key={space.title}
                  className='bg-gray-50 p-6 rounded-lg border border-gray-200'
                >
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {space.title}
                  </h3>
                  <p className='text-gray-600'>{space.description}</p>
                </div>
              ))}

              <div className='bg-teal-50 p-6 rounded-lg border border-teal-200'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Rotunda Gallery
                </h3>
                <p className='text-gray-700'>
                  This is an elegant domed room, originally the imposing
                  entrance to the Library. The circular floor is tiled in
                  original teak and the walls feature neo-classical decorative
                  stucco. Modern art creates a particularly stunning contrast
                  within this classical setting.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book Sales Section */}
      <section ref={bookSalesRef} className='py-20 px-4 bg-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Book Sales
            </h2>
            <p className='text-xl text-gray-600'>
              Bi-annual fundraiser supporting Library programs
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
                Twice a year locals, ex-pats and tourists alike are invited to
                select from thousands of fiction and non-fiction books in
                English, plus a selection of other languages, donated by Neilson
                Hays Library supporters or withdrawn from the library shelves.
              </p>

              <div className='bg-orange-50 p-8 rounded-lg border border-orange-200 mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Rare Books
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  A few rare books are also offered at market value. These sales
                  serve as a major, recurring fundraiser for the Library, and
                  all proceeds go towards the upkeep of our landmark building
                  and our educational and arts programs.
                </p>
              </div>

              <div className='bg-teal-50 p-6 rounded-lg border border-teal-200'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Donate Books
                </h3>
                <p className='text-gray-700'>
                  If you have any unwanted books to contribute to the sale,
                  please drop them off at the library between 9:30 am and 5:00
                  pm Tuesday to Sunday.
                </p>
              </div>
            </div>

            <div className='relative h-full w-full'>
              <Image
                src='https://store.neilsonhayslibrary.org/wp-content/uploads/2023/07/original2-1300x630.jpg'
                alt='Neilson Hays Library book sale'
                fill
                className='rounded-lg shadow-2xl object-cover'
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6'
          >
            {bookSaleDetails.map(detail => (
              <div
                key={detail.title}
                className='bg-white p-6 rounded-lg border border-gray-200 shadow-lg'
              >
                <h4 className='text-gray-900 font-semibold text-lg mb-2'>
                  {detail.title}
                </h4>
                <p className='text-gray-600'>{detail.detail}</p>
              </div>
            ))}
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
              Join Our Community
            </h2>
            <p className='text-xl text-gray-700 mb-8'>
              Discover the diverse programs and events that make Neilson Hays
              Library a vibrant community center
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/membership'>
                <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                  Become a Member
                </Button>
              </Link>
              <Link href='/events'>
                <Button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg'>
                  View Events
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
