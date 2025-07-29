'use client'
import PageTitle from '@/components/ui/page-title'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { BookOpen, Users, Calendar, PenTool, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Kids() {
  const cornerRef = useRef(null)
  const storyTimeRef = useRef(null)
  const schoolVisitsRef = useRef(null)
  const workshopsRef = useRef(null)

  const childrenPrograms = [
    {
      icon: BookOpen,
      title: 'Children&apos;s Corner',
      description: 'A cosy and inviting space for young members to enjoy stories',
      color: 'text-blue-400',
    },
    {
      icon: Calendar,
      title: 'Saturday Story Time',
      description: 'Weekly sessions at 10:30 AM with themed stories and crafts',
      color: 'text-teal-400',
    },
    {
      icon: Users,
      title: 'School Visits',
      description: 'Tailored programs with building tours and activities',
      color: 'text-yellow-400',
    },
    {
      icon: PenTool,
      title: 'Monthly Workshops',
      description: 'Creative Writing and CoderDojo sessions for young adults',
      color: 'text-purple-400',
    },
  ]

  const storyTimeDetails = [
    {
      title: 'Time & Day',
      detail: 'Every Saturday at 10:30 AM',
    },
    {
      title: 'Format',
      detail: 'Themed stories followed by craft activities',
    },
    {
      title: 'Audience',
      detail: 'Native English speakers and English learners',
    },
    {
      title: 'Cost',
      detail: 'Free for members, THB 200 for non-members',
    },
  ]

  const workshopTypes = [
    {
      icon: PenTool,
      title: 'Creative Writing Workshop',
      description: 'A place for young people to foster creativity and confidence in writing',
      color: 'text-blue-400',
    },
    {
      icon: Code,
      title: 'CoderDojo Sessions',
      description: 'Establish foundational coding skills in a supportive environment',
      color: 'text-teal-400',
    },
  ]

  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative h-[70vh] flex items-center justify-center'>
        <Image
          src='https://neilsonhayslibrary.org/wp-content/uploads/2023/07/Childrens-corner-2048x1365.jpg'
          alt='Neilson Hays Library children&apos;s programs'
          fill
          className='object-cover opacity-30'
          priority
        />
        <div className='relative z-10 text-center px-4'>
          <PageTitle
            title='Children&apos;s Programs'
            description='Nurturing young minds through stories, creativity, and learning'
            quote='A child who reads will be an adult who thinks.'
          />
        </div>
      </section>

      {/* Programs Overview */}
      <section className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Programs for Young Minds
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              From cozy reading corners to creative workshops, we offer a variety of programs designed to inspire and educate children of all ages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {childrenPrograms.map(detail => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className='bg-gray-800 p-6 rounded-lg border border-gray-700 text-center'
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${detail.color}`} />
                  <h3 className='text-white font-semibold text-lg mb-2'>
                    {detail.title}
                  </h3>
                  <p className='text-gray-300'>{detail.description}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Children's Corner Section */}
      <section ref={cornerRef} className='py-20 px-4 bg-gray-800'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Children&apos;s Corner
            </h2>
            <p className='text-xl text-gray-300'>
              A cosy and inviting space for our young members
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 gap-12 items-center'
          >
            <div className='prose prose-lg prose-invert'>
              <p className='text-xl leading-relaxed text-gray-300 mb-8'>
                Our Children&apos;s Corner is a cosy and inviting space for our young members to make themselves comfortable on a cushion or sit at a small table, where they can enjoy their favourite stories.
              </p>

              <div className='bg-blue-900/20 p-8 rounded-lg border border-blue-700'>
                <h3 className='text-2xl font-bold text-white mb-4'>
                  Extensive Collection
                </h3>
                <p className='text-lg leading-relaxed text-gray-300'>
                  Children of all ages can explore our extensive collection of picture, fiction and non-fiction books. There is also a comprehensive section for Young Adults.
                </p>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='https://neilsonhayslibrary.org/wp-content/uploads/2023/07/IMG_20140927_103732.jpg'
                alt='Children&apos;s Corner at Neilson Hays Library'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Time Section */}
      <section ref={storyTimeRef} className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Saturday Story Time
            </h2>
            <p className='text-xl text-gray-300'>
              Every Saturday morning is dedicated to children
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='prose prose-lg prose-invert mx-auto'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8'>
              Every Saturday morning is dedicated to children, with our popular Children&apos;s Story Time sessions at 10:30 AM. Enthusiastic readers engage young listeners with several books, usually chosen to follow a particular theme each week. Stories are followed by an imaginative craft activity related to the book theme.
            </p>

            <div className='bg-teal-900/20 p-8 rounded-lg border border-teal-700 mb-8'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Inclusive Learning Environment
              </h3>
              <p className='text-lg leading-relaxed text-gray-300'>
                The Story Time audience is comprised of native English speakers and children who are learning English. Saturday mornings are a great opportunity to listen, practice and absorb English in a fun and non-threatening environment, where children can play with new friends every week.
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              {storyTimeDetails.map((detail, index) => (
                <div
                  key={detail.title}
                  className='bg-gray-800 p-6 rounded-lg border border-gray-700'
                >
                  <h4 className='text-white font-semibold text-lg mb-2'>
                    {detail.title}
                  </h4>
                  <p className='text-gray-300'>{detail.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* School Visits Section */}
      <section ref={schoolVisitsRef} className='py-20 px-4 bg-gray-800'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              School Visits
            </h2>
            <p className='text-xl text-gray-300'>
              Explore the building&apos;s architectural features and learn about libraries
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid md:grid-cols-2 gap-12 items-center'
          >
            <div className='prose prose-lg prose-invert'>
              <p className='text-xl leading-relaxed text-gray-300 mb-8'>
                A visit to the Neilson Hays Library can be a wonderful opportunity to explore the building&apos;s architectural features, take a look back at Bangkok 100 years ago, and learn about libraries and their important role in society. We welcome school visits and will tailor a short programme appropriate to the age and needs of the school group.
              </p>

              <div className='bg-yellow-900/20 p-8 rounded-lg border border-yellow-700 mb-8'>
                <h3 className='text-2xl font-bold text-white mb-4'>
                  Visit Includes
                </h3>
                <ul className='text-lg leading-relaxed text-gray-300 space-y-2'>
                  <li>• Library history and building tour</li>
                  <li>• Additional activities may include crafts and refreshments</li>
                  <li>• Tailored program for your school group</li>
                  <li>• Starts at THB 400 per student</li>
                </ul>
              </div>

              <div className='text-center'>
                <p className='text-lg text-gray-300 mb-4'>
                  Please contact our School Visit Coordinator to discuss your requirements.
                </p>
                <Link href='/contact'>
                  <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                    Contact School Visit Coordinator
                  </Button>
                </Link>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='https://neilsonhayslibrary.org/wp-content/uploads/2023/07/Norwich-School-Visit-2.jpg'
                alt='School visit to Neilson Hays Library'
                width={600}
                height={400}
                className='rounded-lg shadow-2xl'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshops Section */}
      <section ref={workshopsRef} className='py-20 px-4 bg-gray-800'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>
              Monthly Workshops
            </h2>
            <p className='text-xl text-gray-300'>
              Opportunities to learn new topics and develop skills
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-8'
          >
            <p className='text-xl leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto'>
              Monthly workshops allow children and young adults an opportunity to learn a new topic and develop their skills. Visit the events calendar for session schedules and sign-up instructions.
            </p>

            <div className='grid md:grid-cols-2 gap-8'>
              {workshopTypes.map(detail => {
                const Icon = detail.icon
                return (
                  <div
                    key={detail.title}
                    className='bg-gray-700 p-8 rounded-lg border border-gray-600 hover:border-teal-500 transition-colors'
                  >
                    <Icon className={`w-16 h-16 ${detail.color} mb-4`} />
                    <h3 className='text-white font-semibold text-xl mb-3'>
                      {detail.title}
                    </h3>
                    <p className='text-gray-300'>{detail.description}</p>
                  </div>
                )
              })}
            </div>

            <div className='text-center mt-8'>
              <Link href='/events'>
                <Button className='bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg'>
                  View Events Calendar
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 px-4 bg-gray-700'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl font-bold text-white mb-6'>
              Join Our Children&apos;s Programs
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Give your child the gift of reading, creativity, and learning
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/membership'>
                <Button className='bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg'>
                  Become a Member
                </Button>
              </Link>
              <Link href='/contact'>
                <Button className='bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 text-lg'>
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}