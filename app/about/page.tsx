'use client'

import { Carousel } from '@/components/ui/carousel'
import PageTitle from '@/components/ui/page-title'

export default function About() {
  const slideData = [
    {
      title: 'UNESCO Cultural Heritage Conversation Award 2022',
      button: 'Learn More',
      buttonLink: '/unesco-cultural-heritage-conservation-award-2022',
      src: 'https://neilsonhayslibrary.org/wp-content/uploads/2019/12/nhl_Home18_img-845x321.jpg',
    },
    {
      title: 'Restoration',
      button: 'Learn more',
      buttonLink: '/restoration',
      src: 'https://neilsonhayslibrary.org/wp-content/uploads/2019/12/nhl_Home10_img-845x321.jpg',
    },
    {
      title: 'Volunteer',
      button: 'Learn more',
      buttonLink: '/volunteer',
      src: 'https://neilsonhayslibrary.org/wp-content/uploads/2019/12/nhl_Home18_img-845x321.jpg',
    },
    {
      title: 'Operations',
      button: 'Learn more',
      buttonLink: '/operations',
      src: 'https://neilsonhayslibrary.org/wp-content/uploads/2019/12/nhl_Home25_img-845x321.jpg',
    },
  ]

  return (
    <div className='min-h-screen bg-teal-700 py-24 sm:py-32'>
      <PageTitle title='About' description='Sharing Literature and the Arts.' />
      <div className='text-white max-w-3xl mx-auto px-4 md:px-8 mt-10'>
        <p className='mb-4'>
          The Neilson Hays Library has become a much-loved institution since its
          foundation in 1869. We treasure our history and strive to remain an
          oasis in the Bangrak neighborhood and Bangkok community. We seek to
          promote English literacy and to foster a love of literature,
          particularly among younger generations.
        </p>
        <p className='mb-4'>
          Our diverse events: book club, second hand book sales, concerts,
          children&apos;s activities, and café are popular features of the
          library. Become a member to enjoy our collection of approximately
          20,000 books.
        </p>
        <p className='mb-4'>
          The elegant neo-classical building is not only the centrepiece of our
          library, but also a coveted venue for private events - including
          weddings, product launches, and corporate functions.
        </p>
        <p className='mb-4'>
          The library is run by a small team of staff, supported by a volunteer
          Library Association Board and a hard working team of volunteers
          (Friends of the Neilson Hays Library). We are the oldest
          not-for-profit organisation in Thailand and warmly welcome financial
          assistance with our endeavours from both the corporate sector and the
          community.
        </p>
      </div>
      <div className='relative overflow-hidden w-full h-full py-20'>
        <Carousel slides={slideData} />
      </div>
    </div>
  )
}
