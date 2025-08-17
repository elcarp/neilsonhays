'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, CreditCard, Users } from 'lucide-react'

interface EventBookingProps {
  event: {
    slug: string
    title: string
    date: string
    time: string
    location: string
    price: string
    product_id: number
    attendees: number
    maxAttendees: number
    available: boolean
  }
}

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  quantity: number
  specialRequests: string
}

export default function EventBooking({ event }: EventBookingProps) {
  const [showForm, setShowForm] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    quantity: 1,
    specialRequests: ''
  })

  const availableSpots = event.maxAttendees - event.attendees
  const isFree = !event.price || event.price === '0' || event.price === '0.00'
  const pricePerPerson = parseFloat(event.price || '0')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBookingStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/book-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: event.product_id,
          quantity: formData.quantity,
          customer: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          meta_data: [
            { key: '_special_requests', value: formData.specialRequests },
            { key: '_event_slug', value: event.slug },
            { key: '_event_title', value: event.title },
          ],
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create booking')
      }

      const booking = await response.json()
      setBookingStatus('success')
      console.log('Booking created:', booking)

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        quantity: 1,
        specialRequests: ''
      })

    } catch (error) {
      console.error('Booking error:', error)
      setBookingStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while booking')
    }
  }

  if (!event.available) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-xl font-semibold mb-4 text-gray-600'>Event Full</h3>
        <p className='text-gray-500 mb-4'>
          This event is currently full. Please check back later or contact us to be added to the waiting list.
        </p>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-gray-600'>Attendees</span>
          <span className='font-semibold text-red-600'>
            {event.attendees}/{event.maxAttendees} (Full)
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2 mb-4'>
          <div className='bg-red-500 h-2 rounded-full w-full'></div>
        </div>
        <Button
          className='w-full bg-gray-400 cursor-not-allowed'
          disabled
        >
          Event Full
        </Button>
      </div>
    )
  }

  if (bookingStatus === 'success') {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-xl font-semibold mb-4 text-green-600'>Booking Confirmed!</h3>
        <p className='text-gray-700 mb-4'>
          Thank you for your booking! You will receive a confirmation email shortly with all the details.
        </p>
        <div className='space-y-2 text-sm text-gray-600 mb-4'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4' />
            <span>{event.date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4' />
            <span>{event.time}</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4' />
            <span>{event.location}</span>
          </div>
        </div>
        <Button
          onClick={() => {
            setBookingStatus('idle')
            setShowForm(false)
          }}
          className='w-full bg-teal-600 hover:bg-teal-700'
        >
          Book Another Event
        </Button>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-xl font-semibold mb-4'>Book Your Spot</h3>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-1'>
                First Name *
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              />
            </div>

            <div>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1'>
                Last Name *
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              />
            </div>
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address *
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
          </div>

          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
              Phone Number
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
          </div>

          <div>
            <label htmlFor='quantity' className='block text-sm font-medium text-gray-700 mb-1'>
              Number of Attendees
            </label>
            <select
              id='quantity'
              name='quantity'
              value={formData.quantity}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
            >
              {Array.from({ length: Math.min(availableSpots, 10) }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='specialRequests' className='block text-sm font-medium text-gray-700 mb-1'>
              Special Requests or Dietary Requirements
            </label>
            <textarea
              id='specialRequests'
              name='specialRequests'
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              placeholder='Any special requirements or requests...'
            />
          </div>

          {!isFree && (
            <div className='bg-gray-50 p-4 rounded-md'>
              <div className='flex justify-between items-center'>
                <span className='font-medium'>Total Cost:</span>
                <span className='text-lg font-bold text-teal-600'>
                  ฿{(pricePerPerson * formData.quantity).toFixed(2)}
                </span>
              </div>
              <p className='text-sm text-gray-600 mt-1'>
                ฿{pricePerPerson.toFixed(2)} × {formData.quantity} {formData.quantity === 1 ? 'person' : 'people'}
              </p>
            </div>
          )}

          {errorMessage && (
            <div className='bg-red-50 border border-red-200 rounded-md p-3'>
              <p className='text-red-600 text-sm'>{errorMessage}</p>
            </div>
          )}

          <div className='flex gap-3'>
            <Button
              type='button'
              onClick={() => setShowForm(false)}
              variant='outline'
              className='flex-1'
              disabled={bookingStatus === 'loading'}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-teal-600 hover:bg-teal-700'
              disabled={bookingStatus === 'loading'}
            >
              {bookingStatus === 'loading' ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className='w-4 h-4 mr-2' />
                  {isFree ? 'Confirm Booking' : 'Book & Pay'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h3 className='text-xl font-semibold mb-4'>Registration</h3>

      <div className='space-y-4 mb-6'>
        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>Available Spots</span>
          <span className='font-semibold'>
            {availableSpots} of {event.maxAttendees}
          </span>
        </div>

        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-teal-600 h-2 rounded-full transition-all duration-300'
            style={{
              width: `${((event.maxAttendees - availableSpots) / event.maxAttendees) * 100}%`,
            }}
          ></div>
        </div>

        {!isFree && (
          <div className='flex justify-between items-center'>
            <span className='text-gray-600'>Price per person</span>
            <span className='font-semibold text-teal-600'>
              ฿{pricePerPerson.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <Button
        onClick={() => setShowForm(true)}
        className='w-full bg-teal-600 hover:bg-teal-700'
        disabled={availableSpots === 0}
      >
        <Users className='w-4 h-4 mr-2' />
        {isFree ? 'Register for Event' : 'Book Now'}
      </Button>
    </div>
  )
}
