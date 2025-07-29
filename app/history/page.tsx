'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Users, Building2, Award } from 'lucide-react'

export default function History() {
  const timelineRef = useRef(null)
  const foundersRef = useRef(null)
  const architectureRef = useRef(null)

  const timelineEvents = [
    {
      year: '1869',
      title: 'Foundation',
      description: 'Bangkok Ladies\' Library Association founded by thirteen British and American women',
      icon: Users,
    },
    {
      year: '1897',
      title: 'Daily Operations',
      description: 'Library opens every day except Sunday with a paid librarian',
      icon: Calendar,
    },
    {
      year: '1914',
      title: 'Land Purchase',
      description: 'Plot of land purchased on Surawong Road for dedicated building',
      icon: MapPin,
    },
    {
      year: '1920',
      title: 'Jennie\'s Passing',
      description: 'Jennie Neilson Hays passes away, Dr. Hays decides to build library in her memory',
      icon: Users,
    },
    {
      year: '1922',
      title: 'New Building',
      description: 'Elegant neo-classical building opens on June 26th',
      icon: Building2,
    },
    {
      year: '1941',
      title: 'Japanese Occupation',
      description: 'Library used for billeting troops, over 1,000 rare volumes shipped to Japan',
      icon: Building2,
    },
    {
      year: '1986',
      title: 'Historic Landmark',
      description: 'Building awarded "Historic Landmark" status by Association of Siamese Architects',
      icon: Award,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://neilsonhayslibrary.org/wp-content/uploads/2019/07/nhl_Home5_img.jpg"
          alt="Neilson Hays Library exterior"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center px-4">
          <PageTitle
            title="Our History"
            description="Every story has a beginning; this is ours…"
            quote="A grand palace on a small scale"
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              Daily life in Bangkok was very different in 1869 when the Bangkok Ladies&apos; Library Association was first founded. Most of what is now today&apos;s modern city was then a lush network of swamps, khlongs and small settlements. Such would have been the case for the Silom (Windmill) area; Surawong Road itself was not to be built until later in 1897. At this time King Rama V was a young man, recently crowned and destined to lead Siam through many changes.
            </p>
            <p className="text-xl leading-relaxed text-gray-300">
              Life for early Western residents could be harsh. Devastating epidemics were frequent. Western luxuries such as books were treasured items; a precious connection with home. Until the opening of the Suez Canal, freight from Europe or America could take six months or more to arrive in the Kingdom of Siam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Timeline</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to becoming one of Bangkok&apos;s most treasured cultural institutions
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-700 h-full"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <div className="flex items-center mb-3">
                          <Icon className="w-5 h-5 text-teal-500 mr-2" />
                          <span className="text-teal-500 font-bold text-lg">{event.year}</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-gray-300">{event.description}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-gray-900"></div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section ref={foundersRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">The Founders</h2>
            <p className="text-xl text-gray-300">
              Thirteen resourceful British and American women established the Bangkok Ladies&apos; Library Association
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              Thirteen resourceful British and American women established the Bangkok Ladies&apos; Library Association in 1869, with the aim of circulating and sharing books. Initially staffed by volunteers and only open one day a week, by 1897 it was open every day (except Sunday) and a paid librarian was employed. Originally housed rent-free in various personal homes (and later in a chapel), by 1914 it was clear that a dedicated building was required. A plot of land in Surawong Road was purchased.
            </p>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Jennie Neilson Hays</h3>
              <p className="text-lg leading-relaxed text-gray-300 mb-4">
                Around this time, one of the most active Board members was Jennie Neilson. Danish by birth, she had lived in America and then entered Siam as a protestant missionary in 1884. Hearing that two suitable young American doctors were on their way to Bangkok, Jennie and a friend were said to have selected their respective future husbands prior to the gentlemen disembarking!
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Dr Thomas Heyward Hays became Chief of the Royal Thai Navy Hospital. Jennie Neilson Hays served as President of the Library three times and was a mainstay of the organisation for twenty years.
              </p>
            </div>

            <div className="bg-blue-900/20 p-8 rounded-lg border border-blue-700">
              <h3 className="text-2xl font-bold text-white mb-4">A Gift of Love</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Sadly Jennie passed away suddenly in 1920 – possibly as a result of cholera. Dr Hays chose to honour his wife by commissioning a new library to be built in her memory, using the plot of land purchased earlier. The result is our elegant neo-classical building; opened on 26 June, 1922.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section ref={architectureRef} className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">The Architecture</h2>
            <p className="text-xl text-gray-300">
              Designed by Italian architect Mario Tamagno, this harmonious, symmetrical building
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              Designed by Italian architect Mario Tamagno, this harmonious, symmetrical building wisely incorporates practical features such as double walls to help keep the books well-ventilated and dry. It displays a wealth of classical features such as stucco decorative motifs, columns and teak fixtures and fittings. Numerous original details still survive; many are still in active daily use. The architectural highlight is a beautiful Italianate dome, once the imposing entrance and now a unique art gallery. At the time of its opening The Bangkok Times described the building as, &ldquo;&hellip; a grand palace on a small scale&rdquo;, and it remains so today.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-3">Mario Tamagno</h3>
                <p className="text-gray-300">
                  Mario Tamagno, in association with another Italian architect, Annibale Rigotti, also designed the prestigious Ananda Samakhom Throne Hall. An additional example of his work is Hua Lampong Railway Station, another impressive reminder of a past era.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-3">Historic Recognition</h3>
                <p className="text-gray-300">
                  The building was awarded the status of &ldquo;Historic Landmark&rdquo; in 1986 by the Association of Siamese Architects. As one of the few remaining examples of secular period architecture in Bangkok, it is to be hoped that the building will always be treasured by both the Thai and expatriate communities.
                </p>
              </div>
            </div>

            <div className="bg-yellow-900/20 p-8 rounded-lg border border-yellow-700">
              <h3 className="text-2xl font-bold text-white mb-4">The Japanese Occupation</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                The Library thrived in its new and permanent home for many years, until a set-back in 1941 when the Japanese forces used it for billeting troops. More than 1,000 rare volumes were shipped to Japan during this time, along with precious architectural blueprints. Many books were subsequently returned, but some of the rarest books and blueprints are still missing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert mx-auto"
          >
            <p className="text-gray-400 italic">
              With thanks to Mari Scott Miyashita (Sawasdee Magazine: Q1, 2010) and Eric Lim (http://www.tour-bangkok-legacies.com/neilson-hays-library.html) for much of the preceding information.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}