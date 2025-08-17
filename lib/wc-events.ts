// lib/wc-events.ts
import {
  wcGet,
  wcPost,
  wcPut,
  type WcProduct,
  type WcOrder,
} from './woocommerce'

// Event booking product type
export interface EventProduct extends WcProduct {
  // Additional event-specific fields
  event_date?: string
  event_time?: string
  event_location?: string
  max_attendees?: number
  current_attendees?: number
  booking_status?: 'open' | 'closed' | 'full'
}

// Event booking order
export interface EventBooking extends WcOrder {
  event_details?: {
    event_id: number
    event_name: string
    event_date: string
    event_time: string
    attendee_count: number
  }
}

// Get all event products
export async function getEventProducts(limit = 20): Promise<EventProduct[]> {
  console.log(`Fetching ${limit} event products from WooCommerce...`)

  try {
    const products = await wcGet<EventProduct[]>(
      `products?per_page=${limit}&category=events&status=publish`
    )

    console.log(`Retrieved ${products?.length || 0} event products`)
    return products || []
  } catch (error) {
    console.error('Error fetching event products:', error)
    return []
  }
}

// Get a specific event product by slug
export async function getEventProductBySlug(
  slug: string
): Promise<EventProduct | null> {
  console.log(`Fetching event product with slug: ${slug}`)

  try {
    const products = await wcGet<EventProduct[]>(`products?slug=${slug}`)

    if (!products || products.length === 0) {
      console.log(`No event product found with slug: ${slug}`)
      return null
    }

    console.log(`Found event product: ${products[0].name}`)
    return products[0]
  } catch (error) {
    console.error(`Error fetching event product with slug ${slug}:`, error)
    return null
  }
}

// Create an event booking (order)
export async function createEventBooking(bookingData: {
  product_id: number
  quantity: number
  customer: {
    email: string
    first_name: string
    last_name: string
    phone?: string
  }
  billing?: Record<string, string>
  shipping?: Record<string, string>
  payment_method?: string
  meta_data?: Array<{ key: string; value: string | number | boolean | null }>
}): Promise<EventBooking | null> {
  console.log('Creating event booking...')

  try {
    const orderData = {
      payment_method: bookingData.payment_method || 'bacs', // Bank transfer as default
      payment_method_title:
        bookingData.payment_method || 'Direct Bank Transfer',
      set_paid: false, // Set to true if payment is processed immediately
      billing: {
        first_name: bookingData.customer.first_name,
        last_name: bookingData.customer.last_name,
        email: bookingData.customer.email,
        phone: bookingData.customer.phone || '',
        ...bookingData.billing,
      },
      shipping: bookingData.shipping || {
        first_name: bookingData.customer.first_name,
        last_name: bookingData.customer.last_name,
      },
      line_items: [
        {
          product_id: bookingData.product_id,
          quantity: bookingData.quantity,
        },
      ],
      meta_data: bookingData.meta_data || [],
    }

    const order = await wcPost<EventBooking>('orders', orderData)
    console.log(`Created event booking with ID: ${order.id}`)
    return order
  } catch (error) {
    console.error('Error creating event booking:', error)
    return null
  }
}

// Update event booking status
export async function updateEventBookingStatus(
  orderId: number,
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled'
): Promise<EventBooking | null> {
  console.log(`Updating booking ${orderId} status to: ${status}`)

  try {
    const order = await wcPut<EventBooking>(`orders/${orderId}`, { status })
    console.log(`Updated booking ${orderId} status to ${status}`)
    return order
  } catch (error) {
    console.error(`Error updating booking ${orderId} status:`, error)
    return null
  }
}

// Get event bookings for a specific event product
export async function getEventBookings(
  productId: number
): Promise<EventBooking[]> {
  console.log(`Fetching bookings for event product ${productId}...`)

  try {
    // Get all orders that contain the specific product
    const orders = await wcGet<EventBooking[]>(
      `orders?product=${productId}&status=processing,completed,on-hold`
    )

    console.log(
      `Retrieved ${orders?.length || 0} bookings for event ${productId}`
    )
    return orders || []
  } catch (error) {
    console.error(`Error fetching bookings for event ${productId}:`, error)
    return []
  }
}

// Calculate current attendee count for an event
export async function getEventAttendeeCount(
  productId: number
): Promise<number> {
  console.log(`Calculating attendee count for event ${productId}...`)

  try {
    const bookings = await getEventBookings(productId)

    const attendeeCount = bookings.reduce((total, booking) => {
      // Sum up quantities from line items for this product
      const eventItems = booking.line_items.filter(
        item => item.product_id === productId
      )
      return (
        total +
        eventItems.reduce((itemTotal, item) => itemTotal + item.quantity, 0)
      )
    }, 0)

    console.log(`Event ${productId} has ${attendeeCount} attendees`)
    return attendeeCount
  } catch (error) {
    console.error(
      `Error calculating attendee count for event ${productId}:`,
      error
    )
    return 0
  }
}

// Check if event is available for booking
export async function isEventAvailable(productId: number): Promise<{
  available: boolean
  reason?: string
  current_attendees: number
  max_attendees: number
}> {
  console.log(`Checking availability for event ${productId}...`)

  try {
    const [product, currentAttendees] = await Promise.all([
      wcGet<EventProduct>(`products/${productId}`),
      getEventAttendeeCount(productId),
    ])

    if (!product) {
      return {
        available: false,
        reason: 'Event not found',
        current_attendees: 0,
        max_attendees: 0,
      }
    }

    if (product.status !== 'publish') {
      return {
        available: false,
        reason: 'Event is not published',
        current_attendees: currentAttendees,
        max_attendees: product.max_attendees || 0,
      }
    }

    if (product.stock_status === 'outofstock') {
      return {
        available: false,
        reason: 'Event is sold out',
        current_attendees: currentAttendees,
        max_attendees: product.max_attendees || 0,
      }
    }

    const maxAttendees = product.max_attendees || product.stock_quantity || 999

    if (currentAttendees >= maxAttendees) {
      return {
        available: false,
        reason: 'Event is full',
        current_attendees: currentAttendees,
        max_attendees: maxAttendees,
      }
    }

    return {
      available: true,
      current_attendees: currentAttendees,
      max_attendees: maxAttendees,
    }
  } catch (error) {
    console.error(`Error checking availability for event ${productId}:`, error)
    return {
      available: false,
      reason: 'Error checking availability',
      current_attendees: 0,
      max_attendees: 0,
    }
  }
}

// Create or update an event product
export async function createEventProduct(eventData: {
  name: string
  slug: string
  description: string
  short_description: string
  regular_price: string
  event_date: string
  event_time: string
  event_location: string
  max_attendees: number
  images?: Array<{ src: string; alt?: string }>
  categories?: Array<{ id: number }>
}): Promise<EventProduct | null> {
  console.log(`Creating event product: ${eventData.name}`)

  try {
    const productData = {
      name: eventData.name,
      slug: eventData.slug,
      type: 'simple',
      regular_price: eventData.regular_price,
      description: eventData.description,
      short_description: eventData.short_description,
      manage_stock: true,
      stock_quantity: eventData.max_attendees,
      stock_status: 'instock',
      virtual: true, // Events are virtual products
      downloadable: false,
      sold_individually: false,
      categories: eventData.categories || [{ id: 1 }], // Default category
      images: eventData.images || [],
      meta_data: [
        { key: '_event_date', value: eventData.event_date },
        { key: '_event_time', value: eventData.event_time },
        { key: '_event_location', value: eventData.event_location },
        { key: '_max_attendees', value: eventData.max_attendees.toString() },
      ],
    }

    const product = await wcPost<EventProduct>('products', productData)
    console.log(`Created event product with ID: ${product.id}`)
    return product
  } catch (error) {
    console.error('Error creating event product:', error)
    return null
  }
}

// Helper function to transform WooCommerce event product to your event format
export function transformWcEventToEvent(wcEvent: EventProduct) {
  const eventDate = String(
    wcEvent.meta_data?.find(meta => meta.key === '_event_date')?.value ||
      wcEvent.event_date ||
      ''
  )
  const eventTime = String(
    wcEvent.meta_data?.find(meta => meta.key === '_event_time')?.value ||
      wcEvent.event_time ||
      ''
  )
  const eventLocation = String(
    wcEvent.meta_data?.find(meta => meta.key === '_event_location')?.value ||
      wcEvent.event_location ||
      ''
  )
  const maxAttendees = Number(
    wcEvent.meta_data?.find(meta => meta.key === '_max_attendees')?.value ||
      wcEvent.max_attendees ||
      wcEvent.stock_quantity ||
      50
  )

  return {
    slug: wcEvent.slug,
    title: wcEvent.name,
    date: eventDate,
    time: eventTime,
    location: eventLocation,
    description: wcEvent.short_description.replace(/<[^>]+>/g, ''),
    longDescription: wcEvent.description.replace(/<[^>]+>/g, ''),
    image: wcEvent.images?.[0]?.src || '/images/libraryexterior.jpg',
    author: 'Library Staff', // Default, could be in meta_data
    attendees: wcEvent.current_attendees || 0,
    maxAttendees: maxAttendees || 50,
    category: wcEvent.categories?.[0]?.name || 'Event',
    featured: wcEvent.featured,
    price: wcEvent.price || '0',
    product_id: wcEvent.id,
    available: wcEvent.stock_status === 'instock',
  }
}
