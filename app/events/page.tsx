import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})
export default function Events() {
  return (
    <div className='min-h-screen bg-teal-500 pt-35'>
      <div className='max-w-4xl px-8 mx-auto'>
        <h1
          className={`${playfair.className} text-4xl text-center font-bold text-white`}
        >
          Events
        </h1>
      </div>
    </div>
  )
}
