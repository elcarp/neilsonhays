'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { BookHeart, Calendar } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

const events = [
  {
    name: 'LitFest',
    description:
      "A festival rooted in Bangkok's rich culture, where Thai and international storytellers come together to celebrate the power of words.",
    href: '#',
    icon: BookHeart,
  },
  {
    name: 'All Events',
    description: 'View all upcoming events and workshops.',
    href: '/events',
    icon: Calendar,
  },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    // Set initial scroll state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setOpenPopover('event')
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOpenPopover(null)
    }, 150) // 150ms delay
    setTimeoutId(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mounted && isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
    >
      <nav
        aria-label='Global'
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Neilson Hays Library</span>
            <Image
              src={mounted && isScrolled ? '/logo.svg' : '/logo-white.svg'}
              alt='Logo'
              width={32}
              height={32}
              className='h-8 w-auto'
            />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${mounted && isScrolled ? 'text-gray-700' : 'text-white'
              }`}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon aria-hidden='true' className='size-6' />
          </button>
        </div>
        <PopoverGroup className='hidden lg:flex lg:gap-x-12'>
          <div
            className='relative'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-x-1 text-sm/6 font-semibold transition-colors ${mounted && isScrolled ? 'text-gray-900' : 'text-white'
                }`}
            >
              Events
              <ChevronDownIcon
                aria-hidden='true'
                className={`size-5 flex-none transition-colors ${mounted && isScrolled ? 'text-gray-400' : 'text-white/70'
                  }`}
              />
            </button>

            {openPopover === 'event' && (
              <div className='absolute top-full -left-8 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
                <div className='p-4'>
                  {events.map(item => (
                    <div
                      key={item.name}
                      className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50'
                    >
                      <div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                        <item.icon
                          aria-hidden='true'
                          className='size-6 text-gray-600 group-hover:text-teal-600'
                        />
                      </div>
                      <div className='flex-auto'>
                        <a
                          href={item.href}
                          className='block font-semibold text-gray-900'
                        >
                          {item.name}
                          <span className='absolute inset-0' />
                        </a>
                        <p className='mt-1 text-gray-600'>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href='/membership'
            className={`text-sm/6 font-semibold transition-colors ${mounted && isScrolled ? 'text-gray-900' : 'text-white'
              }`}
          >
            Membership
          </a>
          <a
            href='/about'
            className={`text-sm/6 font-semibold transition-colors ${mounted && isScrolled ? 'text-gray-900' : 'text-white'
              }`}
          >
            About
          </a>
          <a
            href='/contact'
            className={`text-sm/6 font-semibold transition-colors ${mounted && isScrolled ? 'text-gray-900' : 'text-white'
              }`}
          >
            Contact
          </a>
        </PopoverGroup>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <Link href='/membership'>
            <Button
              variant='outline'
              className={`cursor-pointer text-sm/6 bg-transparent font-semibold transition-colors text-white ${mounted && isScrolled
                ? 'bg-teal-500 border-teal-500'
                : 'bg-transparent'
                }`}
            >
              Become a Member
            </Button>
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='lg:hidden'
      >
        <div className='fixed inset-0 z-50' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Neilson Hays Library</span>
              <Image
                src='/logo.svg'
                alt='Logo'
                width={32}
                height={32}
                className='h-8 w-auto'
              />
            </Link>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon aria-hidden='true' className='size-6' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <Disclosure as='div' className='-mx-3'>
                  <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
                    Events
                    <ChevronDownIcon
                      aria-hidden='true'
                      className='size-5 flex-none group-data-open:rotate-180'
                    />
                  </DisclosureButton>
                  <DisclosurePanel className='mt-2 space-y-2'>
                    {[...events].map(item => (
                      <DisclosureButton
                        key={item.name}
                        as='a'
                        href={item.href}
                        className='block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50'
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href='/membership'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                >
                  Membership
                </a>
                <a
                  href='/about'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                >
                  About
                </a>
                <a
                  href='/contact'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                >
                  Contact
                </a>
              </div>
              <div className='py-6'>
                <a
                  href='/membership'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                >
                  Become a Member
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
