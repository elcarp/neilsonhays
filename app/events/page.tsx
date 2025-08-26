
import PageTitle from '@/components/ui/page-title'
import { EventCard } from '@/components/event-card'
import getUpcomingEvents, { type WpEvent, fallbackEventData } from '@/lib/wp-events'

// map WP → your EventCard shape
function toEventCard(ev: WpEvent) {
  const img = ev?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? ''
  const m = ev.meta || {}

  // Ensure meta values are strings, fallback to empty string if not
  const getMetaString = (value: unknown): string => {
    return typeof value === 'string' ? value : ''
  }

  return {
    title: ev.title?.rendered?.replace(/<[^>]+>/g, '') ?? 'Untitled',
    description: (ev.excerpt?.rendered ?? '').replace(/<[^>]+>/g, ''),
    slug: ev.slug,
    image: img,
    date: getMetaString(m._event_start_date) || ev.date || '',
    time: getMetaString(m._event_start_time),
    location: getMetaString(m._event_venue) || getMetaString(m._event_address),
  }
}


export default async function Events() {
  const wpEvents = await getUpcomingEvents(12)
  console.log(`Loaded ${wpEvents?.length || 0} events from WordPress`)

  // Convert WordPress events to Event format, fallback to shared event data
  const formattedEvents = wpEvents.length > 0
    ? wpEvents.map(toEventCard)
    : fallbackEventData

  return (
    <div className='min-h-screen bg-teal-700 py-24 sm:py-32'>
      <PageTitle
        title='Events'
        description='Checkout our upcoming events and workshops.'
      />
      <div className='mt-20 flex flex-col items-center justify-between pb-20 max-w-7xl mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20'>
          {formattedEvents.map((event, index) => (
            <EventCard event={event} key={event.title + index} />
          ))}
        </div>
      </div>
    </div>
  )
}




