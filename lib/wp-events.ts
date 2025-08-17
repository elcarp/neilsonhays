import { wpGet } from './wp-rest'

export type WpEvent = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt?: { rendered: string }
  date: string
  meta?: Record<string, unknown>
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
    }>
  }
}

// Shared fallback event data used when WordPress events are not available
// This ensures consistency between the events list page and event detail pages
export const fallbackEventData = [
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
    author: 'Book Club Discussion',
    attendees: 15,
    maxAttendees: 25,
    category: 'Book Club',
    featured: true,
    price: '0',
    product_id: 0,
    available: false,
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
    price: '0',
    product_id: 0,
    available: false,
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
    price: '0',
    product_id: 0,
    available: false,
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
    price: '0',
    product_id: 0,
    available: false,
  },
  {
    slug: 'concert-echoes-from-the-french-school',
    title: 'Concert: Echoes from the French School',
    date: '2025-08-03',
    time: '6:00 PM',
    location: 'Main Hall',
    description:
      'Experience the beautiful sounds of classical music in our historic library setting.',
    longDescription:
      '1) Guillaume Lekeu, Adagio Pour Quatuor à Cordes, (transcription by Nicolas Bacri)*** Lekeu and Bacri are the first Asian performance *** 2) Nicolas Bacri, String Quartet No. 8, Op. 112(Omaggio à Haydn) 3) Maurice Ravel, String Quartet in F Major. Experience the beautiful sounds of classical music in our historic library setting with this special concert featuring works from the French school of composition.',
    image: 'https://neilsonhayslibrary.org/wp-content/uploads/2025/06/Web.png',
    author: 'Various Artists',
    attendees: 10,
    maxAttendees: 50,
    category: 'Music',
    featured: true,
    price: '0',
    product_id: 0,
    available: false,
  },
  {
    slug: 'childrens-story-time',
    title: "Children's Story Time",
    date: '2025-04-25',
    time: '10:00 AM',
    location: "Children's Corner",
    description:
      'Interactive storytelling session for young readers with crafts and activities.',
    longDescription:
      "Join us for an engaging storytelling session designed especially for young readers! Our interactive story time includes reading beloved children's books, followed by fun crafts and activities related to the stories. This program encourages a love of reading while developing listening skills and creativity. Perfect for children ages 3-8, with parents and caregivers welcome to participate.",
    image: '/images/kidslibrary.webp',
    author: 'Library Staff',
    attendees: 8,
    maxAttendees: 15,
    category: "Children's Program",
    featured: false,
    price: '0',
    product_id: 0,
    available: false,
  },
]

export default async function getUpcomingEvents(limit = 20) {
  console.log(`Fetching ${limit} events from WordPress API...`)

  try {
    // keep it simple; sort/filter in JS to avoid 400s from orderby=meta_value
    const items = await wpGet<WpEvent[]>(
      `/wp/v2/event_listing?status=publish&per_page=${limit}&_embed`
    )
    console.log(`Received ${items?.length || 0} raw events from WordPress API`)

    if (!items || !Array.isArray(items)) {
      console.warn('WordPress API returned invalid data format')
      return []
    }

    const parseStart = (ev: WpEvent) => {
      const m = ev.meta || {}
      const d =
        typeof m._event_start_date === 'string' ? m._event_start_date : ev.date
      const t =
        typeof m._event_start_time === 'string'
          ? m._event_start_time
          : undefined
      const iso = t ? `${d}T${t}` : d
      const ts = Date.parse(iso)
      return Number.isFinite(ts) ? ts : 0
    }

    // Note: Date filtering temporarily disabled due to missing meta fields
    // const now = Date.now()

    // TEMPORARY: Show all events since meta fields aren't available
    // and we're getting WordPress publish dates instead of event dates
    const futureEvents = items.sort((a, b) => parseStart(a) - parseStart(b))

    console.log(
      'NOTICE: Showing all events because event meta fields are not available in WordPress API'
    )
    console.log(
      'WordPress admin needs to configure REST API to expose event meta fields'
    )

    console.log(
      `Filtered to ${futureEvents.length} future events from ${items.length} total events`
    )
    return futureEvents
  } catch (error) {
    console.error('Error fetching events from WordPress API:', error)
    console.log('Returning empty array - will fallback to mock data in UI')
    return []
  }
}

// Function to get a single event by slug
export async function getEventBySlug(slug: string): Promise<WpEvent | null> {
  console.log(`Fetching event with slug: ${slug}`)

  try {
    const events = await wpGet<WpEvent[]>(
      `/wp/v2/event_listing?slug=${slug}&_embed`
    )

    if (!events || !Array.isArray(events) || events.length === 0) {
      console.log(`No event found with slug: ${slug}`)
      return null
    }

    console.log(`Found event: ${events[0].title?.rendered}`)
    return events[0]
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error)
    console.log('Returning null - will fallback to mock data in UI')
    return null
  }
}
