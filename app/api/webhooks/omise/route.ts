// app/api/webhooks/omise/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/omise'
import { wcPost, wcGet, WcOrder } from '@/lib/woocommerce'

export interface OmiseWebhookEvent {
  object: string
  id: string
  livemode: boolean
  location: string
  created: string
  data: {
    object: string
    id: string
    amount: number
    currency: string
    status: string
    customer?: string
    metadata?: Record<string, string>
    failure_code?: string
    failure_message?: string
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-omise-signature')
    const webhookKey = process.env.OMISE_WEBHOOK_SECRET

    if (!signature || !webhookKey) {
      console.error('Missing webhook signature or secret')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(body, signature, webhookKey)
    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event: OmiseWebhookEvent = JSON.parse(body)
    console.log(
      `Received Omise webhook: ${event.object} for charge ${event.data.id}`
    )

    // Handle charge events
    if (event.object === 'event' && event.data.object === 'charge') {
      const chargeId = event.data.id
      const chargeStatus = event.data.status
      const metadata = event.data.metadata || {}
      const wcOrderId = metadata.wc_order_id

      if (!wcOrderId) {
        console.error('No WooCommerce order ID found in charge metadata')
        return NextResponse.json(
          { error: 'No order ID found' },
          { status: 400 }
        )
      }

      try {
        // Get the current order from WooCommerce
        const order = await wcGet<WcOrder>(`orders/${wcOrderId}`)

        if (!order) {
          console.error(`WooCommerce order ${wcOrderId} not found`)
          return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
          )
        }

        // Update order based on charge status
        let newOrderStatus: string
        const updateData: Record<string, unknown> = {
          meta_data: [
            ...order.meta_data,
            {
              key: '_omise_webhook_processed',
              value: new Date().toISOString(),
            },
            {
              key: '_omise_charge_status',
              value: chargeStatus,
            },
          ],
        }

        switch (chargeStatus) {
          case 'successful':
            newOrderStatus = 'processing'
            updateData.transaction_id = chargeId
            updateData.set_paid = true
            console.log(`Payment successful for order ${wcOrderId}`)
            break

          case 'failed':
            newOrderStatus = 'failed'
            updateData.meta_data.push({
              key: '_payment_failure_reason',
              value: event.data.failure_message || 'Payment failed',
            })
            console.log(
              `Payment failed for order ${wcOrderId}: ${event.data.failure_message}`
            )
            break

          case 'pending':
            newOrderStatus = 'on-hold'
            console.log(`Payment pending for order ${wcOrderId}`)
            break

          default:
            console.log(
              `Unknown charge status: ${chargeStatus} for order ${wcOrderId}`
            )
            return NextResponse.json({ received: true })
        }

        // Only update if status has changed
        if (order.status !== newOrderStatus) {
          updateData.status = newOrderStatus

          await wcPost(`orders/${wcOrderId}`, updateData)
          console.log(
            `Updated WooCommerce order ${wcOrderId} to status: ${newOrderStatus}`
          )

          // Send notification emails if needed
          if (chargeStatus === 'successful') {
            // Trigger WooCommerce order completion emails
            await wcPost(`orders/${wcOrderId}/notes`, {
              note: 'Payment completed successfully via Omise',
              customer_note: false,
            })
          } else if (chargeStatus === 'failed') {
            // Add order note for failed payment
            await wcPost(`orders/${wcOrderId}/notes`, {
              note: `Payment failed: ${event.data.failure_message || 'Unknown error'}`,
              customer_note: false,
            })
          }
        }

        return NextResponse.json({ received: true })
      } catch (wcError) {
        console.error(
          `Failed to update WooCommerce order ${wcOrderId}:`,
          wcError
        )
        return NextResponse.json(
          { error: 'Failed to update order' },
          { status: 500 }
        )
      }
    }

    // Handle other event types if needed
    console.log(`Unhandled webhook event type: ${event.object}`)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle GET requests (for webhook endpoint verification)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'Omise webhook endpoint is active',
    timestamp: new Date().toISOString(),
  })
}
