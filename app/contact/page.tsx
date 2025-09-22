'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-teal-700 py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            Get in Touch
          </h1>
          <p className='text-xl text-teal-100 max-w-2xl mx-auto'>
            We&apos;d love to hear from you. Whether you have a question about
            our services, want to become a member, or just want to say hello,
            we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className='text-center py-8'>
                <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Message Sent!
                </h3>
                <p className='text-gray-600'>
                  Thank you for contacting us. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                      placeholder='Your full name'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                      placeholder='your.email@example.com'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Subject *
                  </label>
                  <select
                    id='subject'
                    name='subject'
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                  >
                    <option value=''>Select a subject</option>
                    <option value='membership'>Membership Inquiry</option>
                    <option value='events'>Events & Programs</option>
                    <option value='donation'>Donation</option>
                    <option value='volunteer'>Volunteer Opportunities</option>
                    <option value='general'>General Inquiry</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                    placeholder='Tell us how we can help you...'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md font-semibold flex items-center justify-center gap-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='w-4 h-4' />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            {/* Library Info */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Visit Us
              </h2>

              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>
                      Address
                    </h3>
                    <p className='text-gray-600'>
                      195 Surawong Road
                      <br />
                      Suriyawongse, Bangrak
                      <br />
                      Bangkok, Thailand 10500
                    </p>
                    <a
                      href='https://maps.app.goo.gl/imrNzFDX3ZzqCi7GA'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block mt-2 text-teal-600 hover:text-teal-700 font-medium'
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <Phone className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Phone</h3>
                    <a
                      href='tel:0831736675'
                      className='text-gray-600 hover:text-teal-600'
                    >
                      08 3173 6675
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <Mail className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Email</h3>
                    <a
                      href='mailto:info@neilsonhayslibrary.org'
                      className='text-gray-600 hover:text-teal-600'
                    >
                      info@neilsonhayslibrary.org
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <Clock className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>
                      Opening Hours
                    </h3>
                    <p className='text-gray-600'>
                      Tuesday to Sunday
                      <br />
                      9:30 AM - 5:00 PM
                      <br />
                      <span className='text-red-600 font-medium'>
                        Closed on Mondays
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Quick Actions
              </h2>

              <div className='space-y-4'>
                <Link
                  href='/membership'
                  className='block w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md font-semibold text-center transition-colors'
                >
                  Become a Member
                </Link>

                <Link
                  href='/events'
                  className='block w-full bg-white hover:bg-gray-50 text-teal-600 py-3 px-6 rounded-md font-semibold text-center border-2 border-teal-600 transition-colors'
                >
                  View Upcoming Events
                </Link>

                <Link
                  href='/about'
                  className='block w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md font-semibold text-center border-2 border-gray-300 transition-colors'
                >
                  Learn About Our History
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className='mt-16'>
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6 text-center'>
              Find Us
            </h2>
            <div className='text-center text-gray-600 mb-6 max-w-3xl mx-auto space-y-4'>
              <p className='text-lg'>
                ตั้งอยู่บนถนนสุรวงศ์ ใกล้กับโรงแรมแบงค็อก แมริออท สุรวงศ์
                เดินทางโดย BTS (ศาลาแดง หรือ ช่องนนทรี), MRT (สีลม หรือ สามย่าน)
                รถเมล์สาย: 1, 16, 36, 45, 75, 93, 187 (ป้ายรถเมล์หน้าห้องสมุด
                หรือ ถนนปาน ออกจากถนนสีลม)
                <br />
                ใช้คำค้นหา "Neilson Hays Library" สำหรับ Grab, Bolt, Muvmi ฯลฯ
              </p>
              <p className='text-lg text-gray-700'>
                Located on Surawong Road, near the Bangkok Marriott Hotel
                Surawongse. Accessible by BTS (Saladaeng or Chong Nonsi), MRT
                (Silom or Sam Yan) Buses: 1, 16, 36, 45, 75, 93, 187 (Bus stop
                in front of the library or Thanon Pan off Silom Road.) Pin
                "Neilson Hays Library" for Grab, Bolt, Muvmi, etc.
              </p>
            </div>
            <div className='aspect-video bg-gray-200 rounded-lg overflow-hidden'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5!3d13.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQyJzAwLjAiTiAxMDDCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sth!4v1234567890'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Neilson Hays Library Location'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
