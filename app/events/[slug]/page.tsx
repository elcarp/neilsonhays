import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getEventBySlug, type WpEvent, fallbackEventData } from "@/lib/wp-events"

// Transform WordPress event to expected format
function transformWpEvent(wpEvent: WpEvent) {
  const img = wpEvent?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/images/libraryexterior.jpg'
  const m = wpEvent.meta || {}

  // Ensure meta values are strings, fallback to empty string if not
  const getMetaString = (value: unknown): string => {
    return typeof value === 'string' ? value : ''
  }

  return {
    slug: wpEvent.slug,
    title: wpEvent.title?.rendered?.replace(/<[^>]+>/g, '') ?? 'Untitled Event',
    date: getMetaString(m._event_start_date) || wpEvent.date || '',
    time: getMetaString(m._event_start_time) || '7:00 PM',
    location: getMetaString(m._event_venue) || getMetaString(m._event_address) || 'Main Hall',
    description: (wpEvent.excerpt?.rendered ?? '').replace(/<[^>]+>/g, ''),
    longDescription: (wpEvent.excerpt?.rendered ?? '').replace(/<[^>]+>/g, ''),
    image: img,
    author: getMetaString(m._event_presenter) || getMetaString(m._event_author) || 'Library Staff',
    attendees: 0, // WordPress events don't have this data
    maxAttendees: 50, // Default value
    category: getMetaString(m._event_category) || 'Event',
    featured: true,
  }
}



interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params

  // Try to get the event from WordPress
  const wpEvent = await getEventBySlug(slug)

  if (!wpEvent) {
    // Fallback to shared event data if WordPress event not found
    const mockEvent = fallbackEventData.find(e => e.slug === slug)
    if (!mockEvent) {
      notFound()
    }
    // Use mock event data
    const event = mockEvent

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

  // Transform WordPress event to expected format
  const event = transformWpEvent(wpEvent)

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
