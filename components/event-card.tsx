import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { BlurImage } from '@/components/ui/blur-image'
import { format } from "date-fns"

export type Event = {
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

export const EventCard = ({ event }: { event: Event }) => {
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
          <Calendar className='w-4 h-4 text-teal-600' />
          <span className='text-sm text-neutral-600 dark:text-neutral-400'>
            {format(new Date(event.date), 'dd MMM yyyy HH:mm')}
          </span>
        </div>
        <p className='text-lg text-left font-bold mb-4 text-neutral-800 dark:text-neutral-100'>
          {event.title}
        </p>
        <p className='text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400'>
          {truncate(event.description, 100)}
        </p>
        <div className='flex items-center gap-4 mt-4 text-sm text-neutral-600 dark:text-neutral-400'>
          <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{event.time}</span>
          </div>
          <div className='flex items-center gap-1'>
            <MapPin className='w-4 h-4' />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
