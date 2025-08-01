import { Clock, Mail, Phone } from "lucide-react"

import { MapPin } from "lucide-react"
import Link from "next/link"

const navigation = {
  ourLibrary: [
    { name: 'Events', href: '/events' },
    { name: 'Kids', href: '/kids' },
    { name: 'Membership', href: '/membership' },
    { name: 'Visit', href: '/contact' },
    { name: 'Venue Hire', href: '/venue-hire' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },

  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/NeilsonHaysLibrary/',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/neilson.hays.library/',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://twitter.com/NeilsonHaysBKK',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },

  ],
}

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer className="bg-teal-500">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="col-span-2 columns-2">
                <h3 className="text-sm/6 font-semibold text-white">Our Library</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.ourLibrary.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-white hover:text-yellow-500 hover:font-extrabold transition">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">Contact Info</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm text-white" >
                  <li className="flex items-base gap-2">
                    <div className="w-5 h-5 mr-2"><MapPin /></div>
                    <div>195 Surawong Road
                      <br /> Suriyawongse, Bangrak
                      <br /> Bangkok, Thailand 10500
                      <Link href="https://maps.app.goo.gl/imrNzFDX3ZzqCi7GA" target="_blank" rel="noopener noreferrer" className="block font-semibold mt-2 text-white hover:text-yellow-500 hover:font-extrabold transition">Google map →</Link>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 mr-2"><Phone /></div>
                    <Link href="tel:0831736675" className="text-white hover:text-yellow-500 hover:font-extrabold transition">08 3173 6675</Link></li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 mr-2"><Mail /></div>
                    <Link href="mailto:info@neilsonhayslibrary.org" className="text-white hover:text-yellow-500 hover:font-extrabold transition">info@neilsonhayslibrary.org</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm/6 font-semibold text-white">Opening Hours</h3>
                <ul role="list" className="mt-6 space-y-4 text-white text-sm">
                  <li className="flex items-base gap-2"><div className="w-5 h-5 mr-2"><Clock /></div> Tuesday to Sunday <br />9:30 - 17:00</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm/6 font-semibold text-white">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm/6 text-white">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-64 sm:text-sm/6 xl:w-full"
              />
              <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs cursor-pointer hover:bg-gray-50 border-white border transition-all duration-300 focus:outline-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer  " className="text-white hover:text-gray-800">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-white md:order-1 md:mt-0">
            &copy; {year} Neilson Hays Library. All rights reserved.
          </p>
        </div>
      </div >
    </footer >
  )
}
