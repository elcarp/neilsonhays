import Header from "@/components/header"
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
      <Header />
      <section className="h-screen w-screen bg-black relative">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex items-center justify-center flex-col h-screen">
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className={`text-white text-6xl font-extrabold ${playfair.className}`}>
              Bangkok's Historic <br />English-Language Library
            </h1>
            <p className="text-white text-lg mt-8">
              An oasis for readers, families, and the community since 1869
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Button className="cursor-pointer bg-teal-500 hover:bg-teal-600" variant="default">Explore Upcoming Events</Button>
              <Button className="cursor-pointer bg-transparent text-white" variant="outline">Become a Member</Button></div>
          </div>
        </div>
      </section>
    </>
  )
}
