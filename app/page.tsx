import QuickNav from "@/components/quick-nav"
import { Button } from "@/components/ui/button"
import { Playfair_Display } from "next/font/google"
import Image from "next/image"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export default function Home() {

  return (
    <>
      <section className="h-screen w-screen bg-black relative">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex items-center justify-center flex-col h-screen">
          <div className='max-w-3xl mx-auto text-center px-4'>
            <h1 className={`text-white text-4xl lg:text-6xl font-extrabold ${playfair.className}`}>
              Bangkok&apos;s Historic <br />English-Language Library
            </h1>
            <p className="text-white text-base lg:text-lg mt-8">
              An oasis for readers, families, and the community since 1869
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Button className="cursor-pointer bg-teal-500 hover:bg-teal-600" variant="default">Explore Upcoming Events</Button>
              <Button className="cursor-pointer bg-transparent text-white" variant="outline">Become a Member</Button></div>
          </div>
          <div><QuickNav /></div>
        </div>
      </section>
      <section className="min-h-screen container mx-auto">
        <div className="text-center py-20">
          <h2 className={`text-4xl font-extrabold ${playfair.className}`}>What&apos;s On at the <span className="text-teal-500">Library</span></h2>
          <p className="text-gray-600 mt-7">Discover our diverse range of events, from author talks to workshops and community.</p>
        </div>
      </section>
    </>
  )
}
