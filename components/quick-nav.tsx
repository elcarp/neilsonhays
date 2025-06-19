import { BookHeart, BookOpen, Calendar, Coffee, Users2 } from "lucide-react"
import Link from "next/link"

const nav = [
  { title: 'Catalog', href: '#', icon: BookOpen },
  { title: 'Events', href: '#', icon: Calendar },
  { title: 'Kids Programs', href: '#', icon: BookHeart },
  { title: 'Cafe Info', href: '#', icon: Coffee },
  { title: 'Book Club', href: '#', icon: Users2 },
]

export default function QuickNav() {

  return (
    <div className="flex gap-4 text-white text-center text-sm mt-10">
      {nav.map((item) => (
        <Link key={item.title} href={item.href} className="w-24 h-24 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-[#ffffff1a] hover:bg-[#ffffff] hover:text-teal-500 transition-all duration-300 w-12 h-12 flex items-center justify-center mb-2">
              <item.icon />
            </div>
            <span>{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}