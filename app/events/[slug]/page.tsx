import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, User } from 'lucide-react'
import {
  getEventBySlug,
  type WpEvent,
  fallbackEventData,
} from '@/lib/wp-events'
import { getEventProductBySlug, transformWcEventToEvent } from '@/lib/wc-events'
// import EventBooking from '@/components/event-booking'
import { format } from 'date-fns'


// Transform WordPress event to expected format
function transformWpEvent(wpEvent: WpEvent) {
  const img =
    wpEvent?._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
    '/images/libraryexterior.jpg'
  const m = wpEvent.meta || {}

  // Ensure meta values are strings, fallback to empty string if not
  const getMetaString = (value: unknown): string => {
    return typeof value === 'string' ? value : ''
  }

  return {
    slug: wpEvent.slug,
    title: wpEvent.title?.rendered?.replace(/<[^>]+>/g, '') ?? 'Untitled Event',
    date:
      getMetaString(m._event_start_date) ||
      format(new Date(wpEvent.date), 'dd MMM yyyy HH:mm') ||
      '',
    time: getMetaString(m._event_start_time) || 'N/A',
    location:
      getMetaString(m._event_location) || getMetaString(m._event_venue) || getMetaString(m._event_address) || 'N/A',
    description: (wpEvent.content?.rendered ?? wpEvent.excerpt?.rendered ?? '').replace(/<[^>]+>/g, '').substring(0, 200) + '...',
    longDescription: wpEvent.content?.rendered ?? wpEvent.excerpt?.rendered ?? '<p>Join us for this special event at Neilson Hays Library. Please contact us at <a href="mailto:info@neilsonhayslibrary.org">info@neilsonhayslibrary.org</a> for more information about this event.</p>',
    image: img,
    author:
      getMetaString(m._event_presenter) ||
      getMetaString(m._event_author) ||
      'Library Staff',
    attendees: 0, // WordPress events don't have this data
    maxAttendees: 50, // Default value
    category: getMetaString(m._event_category) || 'Event',
    featured: true,
    price: '0', // WordPress events are typically free
    product_id: 0, // Not a WooCommerce product
    available: false, // WordPress events don't support booking
  }
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  console.log(slug, 'slug!')
  // Try to get the event from both WooCommerce and WordPress
  let wcEvent = null
  let wpEvent = null
  let event:
    | ReturnType<typeof transformWcEventToEvent>
    | ReturnType<typeof transformWpEvent>
    | (typeof fallbackEventData)[0]
    | null = null
  let isWooCommerceEvent = false

  // Try WooCommerce first
  try {
    wcEvent = await getEventProductBySlug(slug)
    if (wcEvent) {
      console.log('=== RAW WOOCOMMERCE EVENT DATA ===')
      console.log('wcEvent.name:', wcEvent.name)
      console.log('wcEvent.description:', wcEvent.description)
      console.log('wcEvent.short_description:', wcEvent.short_description)
      console.log('wcEvent full object:', wcEvent)
    }
  } catch (error) {
    console.log('WooCommerce event not found:', error)
  }

  // Try WordPress
  try {
    wpEvent = await getEventBySlug(slug)
    if (wpEvent) {
      console.log('=== RAW WORDPRESS EVENT DATA ===')
      console.log('wpEvent.title:', wpEvent.title)
      console.log('wpEvent.content:', wpEvent.content)
      console.log('wpEvent.excerpt:', wpEvent.excerpt)
      console.log('wpEvent full object:', wpEvent)
    }
  } catch (error) {
    console.log('WordPress event not found:', error)
  }

  // Decide which source to use based on content richness
  if (wpEvent && wcEvent) {
    // Both exist - check if WordPress has richer content
    const wpContentLength = wpEvent.content?.rendered?.length || 0
    const wcContentLength = wcEvent.description?.length || 0

    console.log('=== CONTENT COMPARISON ===')
    console.log('WordPress content length:', wpContentLength)
    console.log('WooCommerce content length:', wcContentLength)

    if (wpContentLength > wcContentLength) {
      console.log('Using WordPress event (richer content)')
      event = transformWpEvent(wpEvent)
      isWooCommerceEvent = false
    } else {
      console.log('Using WooCommerce event')
      event = transformWcEventToEvent(wcEvent)
      isWooCommerceEvent = true
    }
  } else if (wcEvent) {
    console.log('Using WooCommerce event (only source)')
    event = transformWcEventToEvent(wcEvent)
    isWooCommerceEvent = true
  } else if (wpEvent) {
    console.log('Using WordPress event (only source)')
    event = transformWpEvent(wpEvent)
    isWooCommerceEvent = false
  }

  if (event) {
    console.log('=== FINAL TRANSFORMED EVENT DATA ===')
    console.log('event.title:', event.title)
    console.log('event.description:', event.description)
    console.log('event.longDescription:', event.longDescription)
    console.log('event.longDescription length:', event.longDescription?.length || 0)
  }

  // Final fallback to shared event data
  if (!event) {
    const mockEvent = fallbackEventData.find(e => e.slug === slug)
    if (!mockEvent) {
      notFound()
    }
    event = mockEvent
    console.log('Using fallback event:', event.title)
  }
  console.log(event, 'event!')
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
              <div
                className='text-gray-700 leading-relaxed mb-6 prose prose-gray max-w-none space-y-4'
                dangerouslySetInnerHTML={{ __html: event.longDescription }}
              />

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
            {/* Registration/Booking Card */}
            {isWooCommerceEvent &&
              event &&
              'product_id' in event &&
              (
                <div className='bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-xl font-semibold mb-4'>Registration</h3>
                  <div className='space-y-4'>
                    {/* <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Attendees</span>
                    <span className='font-semibold'>
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div> */}
                    {/* <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-teal-600 h-2 rounded-full'
                      style={{
                        width: `${(event.attendees / event.maxAttendees) * 100}%`,
                      }}
                    ></div>
                  </div> */}
                    {/* <Button className='w-full bg-teal-600 hover:bg-teal-700'>
                    Register for Event
                  </Button> */}
                    <p className='text-sm text-gray-500 text-center'>
                      Contact us to register for this event at{' '}
                      <a
                        className='font-bold'
                        href='mailto:info@neilsonhayslibrary.org'
                      >
                        info@neilsonhayslibrary.org
                      </a>
                    </p>
                  </div>
                </div>
              )}

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
