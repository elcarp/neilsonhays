'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, CreditCard, Users, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { wcGet, WcProduct } from '@/lib/woocommerce'

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


export default function EventBooking({ event }: EventBookingProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [specialRequests, setSpecialRequests] = useState('')

  const availableSpots = event.maxAttendees - event.attendees
  const isFree = !event.price || event.price === '0' || event.price === '0.00'
  const pricePerPerson = parseFloat(event.price || '0')

  const handleAddToCart = async () => {
    setBookingStatus('loading')
    setErrorMessage('')

    try {
      // Get product details from WooCommerce
      const product = await wcGet<WcProduct>(`products/${event.product_id}`)

      if (!product) {
        throw new Error('Event not found')
      }

      // Add to cart with metadata
      const metadata = {
        event_slug: event.slug,
        event_date: event.date,
        event_time: event.time,
        event_location: event.location,
        special_requests: specialRequests,
      }

      addItem(product, quantity, metadata)
      setBookingStatus('success')

      // Reset form
      setQuantity(1)
      setSpecialRequests('')

    } catch (error) {
      console.error('Add to cart error:', error)
      setBookingStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add event to cart')
    }
  }

  const handleDirectBooking = async () => {
    setBookingStatus('loading')
    setErrorMessage('')

    try {
      // Get product details from WooCommerce
      const product = await wcGet<WcProduct>(`products/${event.product_id}`)

      if (!product) {
        throw new Error('Event not found')
      }

      // Add to cart with metadata
      const metadata = {
        event_slug: event.slug,
        event_date: event.date,
        event_time: event.time,
        event_location: event.location,
        special_requests: specialRequests,
      }

      addItem(product, quantity, metadata)

      // Navigate to checkout immediately after adding to cart
      router.push('/checkout')

    } catch (error) {
      console.error('Buy now error:', error)
      setBookingStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process purchase')
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
        <h3 className='text-xl font-semibold mb-4 text-green-600'>Added to Cart!</h3>
        <p className='text-gray-700 mb-4'>
          Event has been added to your cart. You can continue browsing or proceed to checkout.
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
        <div className='flex gap-3'>
          <Button
            onClick={() => {
              setBookingStatus('idle')
              setShowForm(false)
            }}
            variant='outline'
            className='flex-1'
          >
            Continue Browsing
          </Button>
          <Button
            onClick={() => router.push('/checkout')}
            className='flex-1 bg-teal-600 hover:bg-teal-700'
          >
            <CreditCard className='w-4 h-4 mr-2' />
            Checkout
          </Button>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-xl font-semibold mb-4'>Add to Cart</h3>

        <div className='space-y-4'>
          <div>
            <label htmlFor='quantity' className='block text-sm font-medium text-gray-700 mb-1'>
              Number of Attendees
            </label>
            <select
              id='quantity'
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
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
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
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
                  ฿{(pricePerPerson * quantity).toFixed(2)}
                </span>
              </div>
              <p className='text-sm text-gray-600 mt-1'>
                ฿{pricePerPerson.toFixed(2)} × {quantity} {quantity === 1 ? 'person' : 'people'}
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
              onClick={handleAddToCart}
              className='flex-1 bg-gray-600 hover:bg-gray-700'
              disabled={bookingStatus === 'loading'}
            >
              {bookingStatus === 'loading' ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className='w-4 h-4 mr-2' />
                  Add to Cart
                </>
              )}
            </Button>
            <Button
              onClick={handleDirectBooking}
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
                  {isFree ? 'Book Now' : 'Buy Now'}
                </>
              )}
            </Button>
          </div>
        </div>
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
        {isFree ? 'Register for Event' : 'Add to Cart'}
      </Button>
    </div>
  )
}
