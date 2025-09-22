// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createCharge, createCustomer } from '@/lib/omise'
import { wcPost, WcOrder } from '@/lib/woocommerce'
import { CartManager, Cart, CustomerInfo } from '@/lib/cart'

export interface CheckoutRequest {
  cart: Cart
  customer: CustomerInfo
  payment: {
    token: string // Omise token from frontend
    save_card?: boolean
  }
}

export interface CheckoutResponse {
  success: boolean
  order_id?: number
  charge_id?: string
  error?: string
  redirect_url?: string
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<CheckoutResponse>> {
  try {
    const body: CheckoutRequest = await request.json()
    const { cart, customer, payment } = body

    // Validate request
    if (!cart.items.length) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!customer.email || !customer.first_name || !customer.last_name) {
      return NextResponse.json(
        { success: false, error: 'Customer information is incomplete' },
        { status: 400 }
      )
    }

    if (!payment.token) {
      return NextResponse.json(
        { success: false, error: 'Payment token is required' },
        { status: 400 }
      )
    }

    // Step 1: Create WooCommerce order (pending payment)
    console.log('Creating WooCommerce order...')
    const orderData = CartManager.cartToWooCommerceOrder(cart, customer)
    const order = await wcPost<WcOrder>('orders', orderData)

    if (!order.id) {
      throw new Error('Failed to create WooCommerce order')
    }

    console.log(`Created WooCommerce order #${order.id}`)

    try {
      // Step 2: Create Omise customer (optional, for saved cards)
      let omiseCustomerId: string | undefined
      if (payment.save_card) {
        console.log('Creating Omise customer...')
        const omiseCustomer = await createCustomer({
          email: customer.email,
          description: `${customer.first_name} ${customer.last_name}`,
          metadata: {
            wc_customer_id: order.customer_id.toString(),
            wc_order_id: order.id.toString(),
          },
        })
        omiseCustomerId = omiseCustomer.id
        console.log(`Created Omise customer: ${omiseCustomerId}`)
      }

      // Step 3: Process payment with Omise
      console.log('Processing payment with Omise...')
      console.log('Payment details:', {
        amount: Math.round(cart.total * 100),
        currency: 'thb',
        card: payment.token,
        customer: omiseCustomerId,
        total: cart.total,
      })

      // Ensure minimum amount of 20 THB (2000 satangs) for Omise Thailand
      const amountInSatangs = Math.round(cart.total * 100)
      const minimumAmount = 2000 // 20 THB minimum
      const chargeAmount = Math.max(amountInSatangs, minimumAmount)

      if (amountInSatangs < minimumAmount) {
        console.warn(
          `Cart total (${cart.total} THB) is below minimum. Charging minimum amount of 20 THB.`
        )
      }

      const charge = await createCharge({
        amount: chargeAmount, // Use minimum amount if cart total is too low
        currency: 'thb',
        card: payment.token, // Use 'card' parameter instead of 'token'
        customer: omiseCustomerId,
        description: `Neilson Hays Library - Order #${order.id}`,
        metadata: {
          wc_order_id: order.id.toString(),
          customer_email: customer.email,
          order_total: cart.total.toString(),
        },
        return_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${order.id}`,
      })

      console.log(
        `Created Omise charge: ${charge.id} with status: ${charge.status}`
      )

      // Step 4: Update WooCommerce order based on payment result
      if (charge.status === 'successful') {
        // Payment successful - mark order as processing
        await wcPost(`orders/${order.id}`, {
          status: 'processing',
          set_paid: true,
          transaction_id: charge.id,
          meta_data: [
            ...order.meta_data,
            {
              key: '_omise_charge_id',
              value: charge.id,
            },
            {
              key: '_omise_customer_id',
              value: omiseCustomerId || '',
            },
          ],
        })

        console.log(`Updated WooCommerce order #${order.id} to processing`)

        return NextResponse.json({
          success: true,
          order_id: order.id,
          charge_id: charge.id,
          redirect_url: `/checkout/success?order_id=${order.id}&charge_id=${charge.id}`,
        })
      } else if (charge.status === 'pending') {
        // Payment pending (e.g., 3D Secure)
        await wcPost(`orders/${order.id}`, {
          status: 'on-hold',
          meta_data: [
            ...order.meta_data,
            {
              key: '_omise_charge_id',
              value: charge.id,
            },
            {
              key: '_payment_status',
              value: 'pending',
            },
          ],
        })

        return NextResponse.json({
          success: true,
          order_id: order.id,
          charge_id: charge.id,
          redirect_url: `/checkout/pending?order_id=${order.id}&charge_id=${charge.id}`,
        })
      } else {
        // Payment failed
        await wcPost(`orders/${order.id}`, {
          status: 'failed',
          meta_data: [
            ...order.meta_data,
            {
              key: '_omise_charge_id',
              value: charge.id,
            },
            {
              key: '_payment_failure_reason',
              value: charge.failure_message || 'Payment failed',
            },
            {
              key: '_payment_failure_code',
              value: charge.failure_code || 'unknown',
            },
          ],
        })

        // Provide more specific error messages based on failure code
        let errorMessage = 'Payment failed'
        if (charge.failure_code === 'payment_rejected') {
          errorMessage =
            'Payment was rejected. Please check your card details or try a different payment method.'
        } else if (charge.failure_message) {
          errorMessage = charge.failure_message
        }

        return NextResponse.json(
          {
            success: false,
            error: errorMessage,
            order_id: order.id,
            charge_id: charge.id,
            failure_code: charge.failure_code,
          },
          { status: 400 }
        )
      }
    } catch (paymentError) {
      // Payment processing failed - mark order as failed
      console.error('Payment processing failed:', paymentError)

      await wcPost(`orders/${order.id}`, {
        status: 'failed',
        meta_data: [
          ...order.meta_data,
          {
            key: '_payment_failure_reason',
            value:
              paymentError instanceof Error
                ? paymentError.message
                : 'Payment processing failed',
          },
        ],
      })

      return NextResponse.json(
        {
          success: false,
          error:
            paymentError instanceof Error
              ? paymentError.message
              : 'Payment processing failed',
          order_id: order.id,
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Checkout failed',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve order status
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Retrieve order from WooCommerce
    const order = await wcPost<WcOrder>(`orders/${orderId}`, {})

    return NextResponse.json({
      order_id: order.id,
      status: order.status,
      total: order.total,
      currency: order.currency,
      payment_method: order.payment_method,
      transaction_id: order.transaction_id,
    })
  } catch (error) {
    console.error('Failed to retrieve order:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    )
  }
}
