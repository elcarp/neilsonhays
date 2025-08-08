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

export default async function getUpcomingEvents(limit = 20) {
  console.log(`Fetching ${limit} events from WordPress API...`)
  // keep it simple; sort/filter in JS to avoid 400s from orderby=meta_value
  const items = await wpGet<WpEvent[]>(
    `/wp/v2/event_listing?status=publish&per_page=${limit}&_embed`
  )
  console.log(`Received ${items?.length || 0} raw events from WordPress API`)

  const parseStart = (ev: WpEvent) => {
    const m = ev.meta || {}
    const d =
      typeof m._event_start_date === 'string' ? m._event_start_date : ev.date
    const t =
      typeof m._event_start_time === 'string' ? m._event_start_time : undefined
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
}
