// app/api/book-event/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createEventBooking, isEventAvailable } from '@/lib/wc-events'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { product_id, quantity, customer } = body

    if (
      !product_id ||
      !quantity ||
      !customer?.email ||
      !customer?.first_name ||
      !customer?.last_name
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if event is available
    const availability = await isEventAvailable(product_id)

    if (!availability.available) {
      return NextResponse.json(
        {
          error: 'Event is not available for booking',
          reason: availability.reason,
          current_attendees: availability.current_attendees,
          max_attendees: availability.max_attendees,
        },
        { status: 400 }
      )
    }

    // Check if requested quantity is available
    const availableSpots =
      availability.max_attendees - availability.current_attendees
    if (quantity > availableSpots) {
      return NextResponse.json(
        {
          error: `Only ${availableSpots} spots available, but ${quantity} requested`,
          available_spots: availableSpots,
        },
        { status: 400 }
      )
    }

    // Create the booking
    const booking = await createEventBooking({
      product_id,
      quantity,
      customer,
      billing: body.billing,
      shipping: body.shipping,
      payment_method: body.payment_method || 'bacs',
      meta_data: body.meta_data || [],
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      booking_id: booking.id,
      order_number: booking.number,
      status: booking.status,
      total: booking.total,
      message: 'Booking created successfully',
    })
  } catch (error) {
    console.error('Event booking API error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check event availability
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const availability = await isEventAvailable(parseInt(productId))

    return NextResponse.json(availability)
  } catch (error) {
    console.error('Event availability API error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
