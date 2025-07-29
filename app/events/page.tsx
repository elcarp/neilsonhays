'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BlurImage } from '@/components/ui/blur-image'
import PageTitle from '@/components/ui/page-title'
import { Calendar, MapPin, Clock } from 'lucide-react'

export default function Events() {
  return (
    <div className='min-h-screen bg-teal-700 py-24 sm:py-32'>
      <PageTitle
        title='Events'
        description='Checkout our upcoming events and workshops.'
      />
      <div className='mt-20 flex flex-col items-center justify-between pb-20 max-w-7xl mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20'>
          {events.map((event, index) => (
            <EventCard event={event} key={event.title + index} />
          ))}
        </div>
      </div>
    </div>
  )
}

const EventCard = ({ event }: { event: Event }) => {
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text
  }
  return (
    <Link
      className='shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200'
      href={`/events/${event.slug}`}
    >
      {event.image ? (
        <BlurImage
          src={event.image || ''}
          alt={event.title}
          height='800'
          width='800'
          className='h-52 object-cover object-top w-full'
        />
      ) : (
        <div className='h-52 flex items-center justify-center bg-white dark:bg-neutral-900'>
          <Image src='/logo.svg' alt='Logo' width={100} height={100} />
        </div>
      )}
      <div className='p-4 md:p-8 bg-white dark:bg-neutral-900'>
        <div className='flex space-x-2 items-center mb-2'>
          <Calendar className="w-4 h-4 text-teal-600" />
          <span className='text-sm text-neutral-600 dark:text-neutral-400'>
            {event.date}
          </span>
        </div>
        <p className='text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100'>
          {event.title}
        </p>
        <p className='text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400'>
          {truncate(event.description, 100)}
        </p>
        <div className='flex items-center gap-4 mt-4 text-sm text-neutral-600 dark:text-neutral-400'>
          <div className='flex items-center gap-1'>
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className='flex items-center gap-1'>
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

type Event = {
  title: string
  description: string
  slug: string
  image: string
  date: string
  time: string
  location: string
  author?: string
  authorAvatar?: string
}

const events: Event[] = [
  {
    title: "Book Club: 'The Glass Palace'",
    description: "Monthly book club meeting discussing Amitav Ghosh's historical novel about Burma, Malaya, and India. Join us for a lively discussion about colonialism, family, and the interconnected histories of South and Southeast Asia.",
    slug: 'book-club-glass-palace',
    image: '/images/bookclub.jpg',
    date: '2025-04-22',
    time: '7:00 PM',
    location: 'Main Reading Room'
  },
  {
    title: 'Poetry Evening',
    description: 'A night of poetry readings featuring both English and Thai language works. Open mic session follows.',
    slug: 'poetry-evening',
    image: '/images/poetryevening.jpg',
    date: '2025-04-18',
    time: '6:30 PM',
    location: 'Garden Terrace'
  },
  {
    title: 'Author Talk: Bangkok Stories',
    description: "Join acclaimed author Alex for a discussion of her new book exploring Bangkok's rich history.",
    slug: 'author-talk-bangkok-stories',
    image: '/images/authortalk.jpg',
    date: '2025-04-15',
    time: '7:00 PM',
    location: 'Conference Room'
  },
  {
    title: 'Digital Resources Workshop',
    description: "Learn to use the library's expanding digital collections and e-resources. Perfect for all age groups.",
    slug: 'digital-resources-workshop',
    image: '/images/digitalresources.jpg',
    date: '2025-04-30',
    time: '2:00 PM',
    location: 'Computer Lab'
  },
  {
    title: 'Concert: Echoes from the French School',
    description: 'Experience the beautiful sounds of classical music in our historic library setting.',
    slug: 'concert-echoes-from-the-french-school',
    image: 'https://neilsonhayslibrary.org/wp-content/uploads/2025/06/Web.png',
    date: '2025-05-10',
    time: '8:00 PM',
    location: 'Main Hall'
  },
  {
    title: 'Children\'s Story Time',
    description: 'Interactive storytelling session for young readers with crafts and activities.',
    slug: 'childrens-story-time',
    image: '/images/kidslibrary.jpg',
    date: '2025-04-25',
    time: '10:00 AM',
    location: 'Children\'s Corner'
  }
]
