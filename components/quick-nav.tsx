import { BookHeart, Info, Mail, MapPin, UserRound } from "lucide-react"
import Link from "next/link"

const nav = [
  { title: 'Kids', href: '#', icon: BookHeart },
  { title: 'Membership', href: '#', icon: UserRound },
  { title: 'Visit', href: '#', icon: MapPin },
  { title: 'About', href: '#', icon: Info },
  { title: 'Contact', href: '#', icon: Mail },
]

export default function QuickNav() {
  return (
    <div className="flex gap-4 text-white text-center text-sm mt-10">
      {nav.map((item) => (
        <Link key={item.title} href={item.href} className="w-24 h-24 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-[#ffffff1a] hover:bg-[#ffffff] hover:text-teal-500 transition-all duration-300 w-12 h-12 flex items-center justify-center mb-2">
              <BookHeart />
            </div>
            <span>{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}