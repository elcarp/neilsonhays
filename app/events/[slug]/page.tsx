import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock events data - in a real app, this would come from a database or API
const events = [
  {
    slug: 'concert-echoes-from-the-french-school',
    title: 'Concert: Echoes from the French School',
    date: '2025-05-10',
    time: '8:00 PM',
    location: 'Main Hall',
    description:
      'Experience the beautiful sounds of classical music in our historic library setting.',
    longDescription:
      'Experience the beautiful sounds of classical music in our historic library setting.',
    image: 'https://neilsonhayslibrary.org/wp-content/uploads/2025/06/Web.png',
    author: 'Various Artists',
    attendees: 10,
    maxAttendees: 20,
    category: 'Music',
    featured: true,
  },
  {
    slug: 'book-club-glass-palace',
    title: "Book Club: 'The Glass Palace'",
    date: '2025-04-22',
    time: '7:00 PM',
    location: 'Main Reading Room',
    description:
      "Monthly book club meeting discussing Amitav Ghosh's historical novel about Burma, Malaya, and India. Join us for a lively discussion about colonialism, family, and the interconnected histories of South and Southeast Asia.",
    longDescription:
      "This month we're diving into Amitav Ghosh's masterpiece 'The Glass Palace', a sweeping historical novel that follows the fortunes of a family across three generations and multiple countries. The novel explores themes of colonialism, displacement, and the search for identity against the backdrop of major historical events in Burma, Malaya, and India. Our discussion will focus on the novel's rich historical detail, its exploration of cultural exchange, and its relevance to contemporary issues of migration and identity.",
    image: '/images/bookclub.jpg',
    author: 'Amitav Ghosh',
    attendees: 15,
    maxAttendees: 25,
    category: 'Book Club',
    featured: true,
  },
  {
    slug: 'poetry-evening',
    title: 'Poetry Evening',
    date: '2025-04-18',
    time: '6:30 PM',
    location: 'Garden Terrace',
    description:
      'A night of poetry readings featuring both English and Thai language works. Open mic session follows.',
    longDescription:
      'Join us for an enchanting evening of poetry in both English and Thai. Local poets will share their work, followed by an open mic session where anyone can read their favorite poems or original work. This bilingual event celebrates the rich literary traditions of both languages and provides a platform for cultural exchange through poetry.',
    image: '/images/poetryevening.jpg',
    author: 'Various Poets',
    attendees: 8,
    maxAttendees: 30,
    category: 'Cultural Event',
    featured: false,
  },
  {
    slug: 'author-talk-bangkok-stories',
    title: 'Author Talk: Bangkok Stories',
    date: '2025-04-15',
    time: '7:00 PM',
    location: 'Conference Room',
    description:
      "Join acclaimed author Alex for a discussion of her new book exploring Bangkok's rich history.",
    longDescription:
      'Acclaimed author Alex will discuss her latest book "Bangkok Stories", a collection of interconnected tales that weave together the city\'s rich history, diverse cultures, and the lives of its inhabitants. The book explores themes of memory, identity, and the ways in which personal stories intersect with the broader narrative of the city. Alex will share insights into her research process and the inspiration behind the stories.',
    image: '/images/authortalk.jpg',
    author: 'Alex Chen',
    attendees: 22,
    maxAttendees: 40,
    category: 'Author Talk',
    featured: true,
  },
  {
    slug: 'digital-resources-workshop',
    title: 'Digital Resources Workshop',
    date: '2025-04-30',
    time: '2:00 PM',
    location: 'Computer Lab',
    description:
      "Learn to use the library's expanding digital collections and e-resources. Perfect for all age groups.",
    longDescription:
      "Discover how to make the most of our extensive digital collections! This hands-on workshop will teach you how to access our e-books, online databases, digital archives, and research tools. Whether you're a student, researcher, or casual reader, you'll learn valuable skills for navigating our digital resources. Bring your own device or use our computers.",
    image: '/images/digitalresources.jpg',
    author: 'Library Staff',
    attendees: 12,
    maxAttendees: 20,
    category: 'Workshop',
    featured: false,
  },
]

interface PageProps {
  params: {
    slug: string
  }
}

export default function EventPage({ params }: PageProps) {
  const event = events.find(e => e.slug === params.slug)

  if (!event) {
    notFound()
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='relative h-96 bg-gradient-to-r from-teal-600 to-teal-800'>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className='object-cover opacity-20'
        />
        <div className='absolute inset-0 flex items-center'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl'>
              <span className='inline-block px-3 py-1 text-sm font-semibold text-teal-100 bg-teal-700 rounded-full mb-4'>
                {event.category}
              </span>
              <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
                {event.title}
              </h1>
              <div className='flex flex-wrap gap-6 text-white'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  <span>{event.date}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5' />
                  <span>{event.time}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-md p-8'>
              <h2 className='text-2xl font-bold mb-6'>About This Event</h2>
              <p className='text-gray-700 leading-relaxed mb-6'>
                {event.longDescription}
              </p>

              <div className='border-t pt-6'>
                <h3 className='text-xl font-semibold mb-4'>Event Details</h3>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Calendar className='w-5 h-5 text-teal-600' />
                    <span className='text-gray-700'>Date: {event.date}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Clock className='w-5 h-5 text-teal-600' />
                    <span className='text-gray-700'>Time: {event.time}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <MapPin className='w-5 h-5 text-teal-600' />
                    <span className='text-gray-700'>
                      Location: {event.location}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <User className='w-5 h-5 text-teal-600' />
                    <span className='text-gray-700'>
                      Presenter: {event.author}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Registration Card */}
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h3 className='text-xl font-semibold mb-4'>Registration</h3>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Attendees</span>
                  <span className='font-semibold'>
                    {event.attendees}/{event.maxAttendees}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-teal-600 h-2 rounded-full'
                    style={{
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    }}
                  ></div>
                </div>
                <Button className='w-full bg-teal-600 hover:bg-teal-700'>
                  Register for Event
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h3 className='text-xl font-semibold mb-4'>Quick Links</h3>
              <div className='space-y-3'>
                <Link
                  href='/events'
                  className='block text-teal-600 hover:text-teal-700'
                >
                  ← Back to All Events
                </Link>
                <Link
                  href='/membership'
                  className='block text-teal-600 hover:text-teal-700'
                >
                  Become a Member
                </Link>
                <Link
                  href='/contact'
                  className='block text-teal-600 hover:text-teal-700'
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
