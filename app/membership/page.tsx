import { CheckIcon } from 'lucide-react'

const includedFeatures = [
  'Free admission to Library and access to over 22,000 books, with borrowing abilities (max. 15 at a time)',
  "Free entry to children's weekly story time",
  'First booking opportunities and 15 % off concerts at the library',
  '10 % discount on Library merchandise',
  '10 % discount at the café',
  'Members - only preview to bi-annual book sales',
  'Member - exclusive book club',
  'Regular newsletter with exclusive announcements',
  'A nine-to-five co-working space',
  'The good feeling that comes with supporting a community landmark!',
]

export default function Membership() {
  return (
    <div className='bg-teal-700 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl sm:text-center'>
          <h1 className='text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl sm:text-balance'>
            Membership
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-white sm:text-xl/8'>
            Join the Community
          </p>
          <p className='text-white italic mt-3'>
            “The only thing that you absolutely have to know, is the location of
            the library.” — Albert Einstein
          </p>
        </div>
        <div className='bg-white mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
          <div className='p-8 sm:p-10 lg:flex-auto'>
            <h3 className='text-3xl font-semibold tracking-tight text-gray-900'>
              Annual Membership
            </h3>
            <p className='mt-6 text-base/7 text-gray-600'>
              Find refuge from the busy city among the pillars and pages of the
              Neilson Hays Library.
            </p>
            <p className='mt-3 text-base/7 text-gray-600'>
              Built in 1921 The Neilson Hays Library is one of the region’s
              earliest libraries and one of the few still going strong. An
              extraordinary history, an impressive borrowing collection and a
              historic building make this a unique place to read, to write and
              to be inspired.
            </p>
            <div className='mt-10 flex items-center gap-x-4'>
              <h4 className='flex-none text-sm/6 font-semibold text-teal-600'>
                What&apos;s included
              </h4>
              <div className='h-px flex-auto bg-gray-100' />
            </div>
            <ul
              role='list'
              className='mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6'
            >
              {includedFeatures.map(feature => (
                <li key={feature} className='flex gap-x-3'>
                  <CheckIcon
                    aria-hidden='true'
                    className='h-6 w-5 flex-none text-teal-600'
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0'>
            <div className='rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-gray-900/5 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16'>
              <div className='mx-auto max-w-xs px-8'>
                <div className='membership'>
                  <p className='text-base font-semibold text-gray-600'>
                    Individual
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-semibold tracking-tight text-gray-900'>
                      2,500
                    </span>
                    <span className='text-sm/6 font-semibold tracking-wide text-gray-600'>
                      THB
                    </span>
                  </p>
                  <a
                    href='#'
                    className='mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
                  >
                    Get access
                  </a>
                </div>
                <div className='membership mt-12'>
                  <p className='text-base font-semibold text-gray-600'>
                    Senior Over 65 or Children Under 12 with ID
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-semibold tracking-tight text-gray-900'>
                      1,850
                    </span>
                    <span className='text-sm/6 font-semibold tracking-wide text-gray-600'>
                      THB
                    </span>
                  </p>
                  <a
                    href='#'
                    className='mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
                  >
                    Get access
                  </a>
                </div>
                <div className='membership mt-12'>
                  <p className='text-base font-semibold text-gray-600'>
                    Family
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-semibold tracking-tight text-gray-900'>
                      3,500
                    </span>
                    <span className='text-sm/6 font-semibold tracking-wide text-gray-600'>
                      THB
                    </span>
                  </p>
                  <a
                    href='#'
                    className='mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
                  >
                    Get access
                  </a>
                </div>
                <p className='mt-6 text-xs/5 text-gray-600'>
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
