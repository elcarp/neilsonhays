import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import { Heart, Building, BookOpen, Gift, Clock, MapPin } from 'lucide-react'

const supportAreas = [
  {
    title: 'General Fund',
    description: 'Support areas of greatest need throughout the year including operations, staffing, equipment, events/programs and other library initiatives.',
    icon: Heart,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    title: 'Building Maintenance',
    description: 'Help preserve our historic 100-year-old structure. Bangkok&apos;s tropical climate requires specialized maintenance to sustain this landmark while respecting the original design.',
    icon: Building,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Book Restoration',
    description: 'Sponsor the restoration of rare, antique books in our unique collection. Visit the Library to view the collection and select a book to restore!',
    icon: BookOpen,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Book Purchases',
    description: 'Enable us to satisfy the ever-growing reading appetite of our members. New books of all genres are purchased monthly with your support.',
    icon: Gift,
    color: 'bg-green-100 text-green-600'
  }
]

export default function Give() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-500 pt-36">
      <PageTitle
        title="Give"
        description="Support Thailand&apos;s oldest not-for-profit organization and help preserve our historic library for future generations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Introduction Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Your Support Makes a Difference
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Community fundraising is integral to Neilson Hays Library&apos;s continued viability.
                As the oldest not-for-profit organisation in Thailand, we warmly welcome financial
                assistance with our endeavours, from both the corporate sector and the community.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Your contributions assist us with maintaining our landmark and providing a variety
                of programs and books. There are many ways that you can help.
              </p>
            </div>
            <div className="relative order-first md:order-last">
              <Image
                src="/images/library-exterior.webp"
                alt="Neilson Hays Library Exterior"
                width={600}
                height={400}
                className="rounded-lg sm:rounded-xl shadow-md object-cover w-full h-48 sm:h-64 md:h-80"
              />
            </div>
          </div>
        </div>

        {/* Areas of Support */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
            Areas of Support
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Choose how you&apos;d like to make an impact. Every contribution helps preserve our heritage and serve our community.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {supportAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full ${area.color} mb-4 sm:mb-6`}>
                  <area.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {area.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Book Donations Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-white mb-8 sm:mb-12">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Book Donations Welcome
              </h2>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 leading-relaxed">
                We welcome donations of used books throughout the year for our bi-annual book sales.
                Our volunteers sort all donations and determine if they are needed in our collection,
                otherwise they are priced for our popular, twice yearly second-hand book sale fundraisers.
              </p>

              <div className="bg-white/10 rounded-lg p-4 sm:p-6 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Drop-off Hours
                </h3>
                <p className="text-base sm:text-lg">
                  <strong>Sunday – Tuesday</strong><br />
                  9:00 AM – 5:00 PM
                </p>
                <div className="flex items-start mt-3 sm:mt-4">
                  <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm sm:text-base">Book donations can be dropped off at the Library during these hours.</p>
                </div>
              </div>
            </div>

            <div className="relative order-first md:order-last mt-6 md:mt-0">
              <Image
                src="/images/bookclub.jpg"
                alt="Book Collection"
                width={500}
                height={400}
                className="rounded-lg sm:rounded-xl shadow-lg object-cover w-full h-48 sm:h-64 md:h-80"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Your generosity helps preserve Thailand&apos;s literary heritage and ensures the Neilson Hays Library
            continues to serve our community for another 100 years.
          </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto">
                Contact Us to Donate
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                Volunteer With Us
              </Button>
            </Link>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-4">
              Learn more about our cultural events and community programs:
            </p>
            <Link href="/litfest" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
              Discover our Bangkok Literature Festival →
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600 px-4">
              For more information about donation opportunities or to discuss corporate partnerships,
              please <Link href="/contact" className="text-teal-600 hover:text-teal-700 font-medium">contact us</Link> directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
