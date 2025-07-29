'use client'
import QuickNav from '@/components/quick-nav'
import Testimonial from '@/components/testimonial'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, Check, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLenisInstance } from './hooks/useLenisInstance'
import { useRouter } from 'next/navigation'

const events = [
  {
    title: 'Concert: Echoes from the French School',
    date: '2025-08-03',
    description:
      '1) Guillaume Lekeu, Adagio Pour Quatuor à Cordes, (transcription by Nicolas Bacri)*** Lekeu and Bacri are the first Asian performance *** 2) Nicolas Bacri, String Quartet No. 8, Op. 112(Omaggio à Haydn) 3) Maurice Ravel, String Quartet in F Major',
    image: 'https://neilsonhayslibrary.org/wp-content/uploads/2025/06/Web.png',
    href: '/events/concert-echoes-from-the-french-school',
  },
]

const memberBenefits = [
  {
    title: 'Extensive Collection',
    description:
      'Access to a wide range of books, magazines, and digital resources in English and Thai.',
    icon: BookOpen,
  },
  {
    title: 'Prioity Access to Events',
    description:
      'Enjoy author talks, book discussions, workshops, and cultural activities designed for diverse interests and age groups.',
    icon: Calendar,
  },
  {
    title: 'Family-Friendly Programs',
    description:
      "Participate in specialized children's storytimes, family- friendly activities, and educational programs for young readers.",
    icon: User2,
  },
]
export default function Home() {
  const eventsRef = useRef(null)
  const kidsRef = useRef(null)
  const membershipRef = useRef(null)
  const supportRef = useRef(null)
  const lenis = useLenisInstance()

  const eventsInView = useInView(eventsRef, { once: false })
  const kidsInView = useInView(kidsRef, { once: false })
  const membershipInView = useInView(membershipRef, { once: false })
  const supportInView = useInView(supportRef, { once: false })

  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (element) {
      if (lenis) {
        console.log('Using Lenis scroll')
        // Use Lenis smooth scroll if available
        lenis.scrollTo(element, {
          offset: -100,
          duration: 2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        // Fallback to native smooth scroll
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        // Add offset for header
        setTimeout(() => {
          window.scrollBy(0, -100)
        }, 100)
      }
    } else {
      console.log('Element not found:', sectionId)
    }
  }

  return (
    <>
      <section className='h-screen w-screen bg-black relative'>
        <Image
          src='/images/hero-bg.jpg'
          alt='Hero background'
          fill
          className='object-cover'
          priority
        />
        <div className='relative z-10 flex items-center justify-center flex-col h-screen'>
          <div className='max-w-3xl mx-auto text-center px-4'>
            <h1 className={`text-white text-4xl lg:text-6xl font-extrabold`}>
              Bangkok&apos;s Historic <br />
              English-Language Library
            </h1>
            <p className='text-white text-base lg:text-lg mt-8'>
              An oasis for readers, families, and the community since 1869
            </p>
            <div className='mt-8 flex gap-4 justify-center'>
              <Button
                className='cursor-pointer bg-teal-500 hover:bg-teal-600'
                variant='default'
                onClick={() => scrollToSection('events')}
              >
                Explore Upcoming Events
              </Button>
              <Link href='/membership'>
                <Button
                  className='cursor-pointer bg-transparent text-white'
                  variant='outline'
                >
                  Become a Member
                </Button>
              </Link>
            </div>
          </div>
          <div className='px-8'>
            <QuickNav />
          </div>
        </div>
      </section>
      <motion.div
        ref={eventsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={eventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <section className='min-h-screen container mx-auto' id='events'>
          <div className='text-center pt-20 pb-15 px-8'>
            <h2 className={`text-4xl font-extrabold`}>
              What&apos;s On at the{' '}
              <span className='text-teal-500'>Library</span>
            </h2>
            <p className='text-gray-600 mt-7'>
              Discover our diverse range of events, from author talks to
              workshops and community.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 justify-center'>
              {events.map(event => (
                <div
                  key={event.title}
                  onClick={() => router.push(event.href)}
                  className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer'
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={500}
                    height={500}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-teal-500'>
                      <Calendar width={15} />
                      <span className='text-sm text-teal-500 font-bold'>
                        {event.date}
                      </span>
                    </div>
                    <h3
                      className={`text-left text-lg font-semibold my-3 font-bold`}
                    >
                      {event.title}
                    </h3>
                    <p className='text-left text-sm text-gray-600'>
                      {event.description}
                    </p>
                    <Link
                      href={event.href}
                      className='block mt-8 text-left text-sm text-teal-500 font-bold'
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href='/events'>
            <Button className='mb-10 bg-teal-500 mx-auto block cursor-pointer hover:bg-teal-600'>
              View Full Events Calendar
            </Button>
          </Link>
        </section>
      </motion.div>
      <motion.div
        ref={kidsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={kidsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <section className='bg-[#F9FAFB] py-20'>
          <div className='container mx-auto flex items-base'>
            <div className='w-1/2'>
              <img
                src='/images/kidslibrary.jpg'
                alt='Kids Library'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='w-1/2 px-6'>
              <h2
                className={`text-4xl font-extrabold border-b border-teal-500 pb-5 text-center `}
              >
                For Young Readers and Families
              </h2>
              <p className='text-gray-600 mt-7'>
                Spark curiosity and connection with hands-on programs for
                children and families.
              </p>
              <ul className='mt-5'>
                <li className='flex items-base my-2'>
                  <Check width={15} className='text-teal-500' />{' '}
                  <span className='ml-3 text-sm'>
                    Storytime for toddlers
                  </span>{' '}
                </li>
                <li className='flex items-base my-2'>
                  <Check width={15} className='text-teal-500' />{' '}
                  <span className='ml-3 text-sm'>Family reading programs</span>
                </li>
                <li className='flex items-base my-2'>
                  <Check width={15} className='text-teal-500' />{' '}
                  <span className='ml-3 text-sm'>Crafts and activities</span>
                </li>
              </ul>
              <Button className='bg-teal-500 mt-8 block cursor-pointer hover:bg-teal-600'>
                See Kids Programs
              </Button>
            </div>
          </div>
        </section>
      </motion.div>
      <motion.div
        ref={membershipRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          membershipInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 1 }}
      >
        <section className='py-20'>
          <div className='container mx-auto px-3'>
            <h2 className={`text-4xl font-extrabold text-center`}>
              <span className='text-teal-500'>Membership</span> Has Its Rewards
            </h2>
            <p className='text-gray-700 mt-7 text-center'>
              Become part of Bangkok&apos;s historic literary community with a
              library membership that offers more than just books.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-center max-w-4xl mx-auto px-4'>
              {memberBenefits.map(benefit => (
                <div
                  key={benefit.title}
                  className='border border-gray-200 rounded-lg p-4'
                >
                  <benefit.icon className='text-teal-500' />
                  <h3 className={`text-lg font-semibold my-3`}>
                    {benefit.title}
                  </h3>
                  <span className='text-gray-600 text-sm'>
                    {benefit.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Testimonial />
          <Link href='/membership'>
            <Button
              className='mx-auto block cursor-pointer hover:bg-teal-500 hover:text-white transition-all duration-300'
              variant='outline'
            >
              Become a member
            </Button>
          </Link>
        </section>
      </motion.div>
      <motion.div
        ref={supportRef}
        initial={{ opacity: 0, y: 50 }}
        animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <section className='bg-[#F9FAFB] py-20'>
          <div className='container mx-auto px-3'>
            <h2 className={`text-4xl font-extrabold text-center`}>
              Support the Library
            </h2>
            <p className='text-gray-700 mt-7 text-center'>
              As Thailand&apos;s oldest non-profit, your support helps us
              continue inspiring generations.
            </p>

            <div className='border border-gray-200 mt-8 max-w-4xl mx-auto rounded-lg p-8 flex items-center justify-center'>
              <div className='w-1/2'>
                <h4 className={`text-3xl font-semibold`}>
                  Make a <span className='text-teal-500'>Difference</span>
                </h4>
                <p className='text-gray-700 mt-7 text-sm'>
                  Your contributions help us acquire new books, maintain our
                  historic building, expand digital resources, and fund
                  community programs to continue providing accessible literary
                  and educational resources for everyone.
                </p>
                <Button className='bg-teal-500 mt-8 block cursor-pointer hover:bg-teal-600'>
                  Donate now
                </Button>
                <Button
                  variant='outline'
                  className='mt-4 block cursor-pointer hover:bg-teal-500 hover:text-white transition-all duration-300'
                >
                  Volunteer Opportunities
                </Button>
              </div>
              <div className='w-1/2 pl-2'>
                <img
                  src='images/libraryexterior.jpg'
                  alt='Support 1'
                  className='w-full h-48 object-cover'
                />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}
