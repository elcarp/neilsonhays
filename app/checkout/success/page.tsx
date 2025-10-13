'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface OrderDetails {
  order_id: number
  status: string
  total: string
  currency: string
  payment_method: string
  transaction_id: string
}

function CheckoutSuccessPageContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentMethod = searchParams.get('payment_method')

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/checkout?order_id=${orderId}`)
      if (response.ok) {
        const details = await response.json()
        setOrderDetails(details)
      } else {
        setError('Failed to load order details')
      }
    } catch {
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }, [orderId])

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId, fetchOrderDetails])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || 'Order not found'}</p>
          <Link href="/membership">
            <Button>Browse Memberships</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-teal-500 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {paymentMethod === 'bank_transfer' ? 'Order Placed Successfully!' : 'Payment Successful!'}
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            {paymentMethod === 'bank_transfer'
              ? 'Thank you for your order. Please complete the bank transfer to confirm your booking.'
              : 'Thank you for your booking. Your payment has been processed successfully.'
            }
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>

            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">#{orderDetails.order_id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">
                  {orderDetails.currency.toUpperCase()} {orderDetails.total}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{orderDetails.payment_method}</span>
              </div>

              {orderDetails.transaction_id && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-sm">{orderDetails.transaction_id}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize text-green-600">
                  {orderDetails.status}
                </span>
              </div>
            </div>
          </div>

          {paymentMethod === 'bank_transfer' ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-yellow-900 mb-3">Bank Transfer Instructions</h3>
              <div className="text-left text-sm text-yellow-800 space-y-2">
                <p>
                  <span className="text-gray-700">To complete payment, please use the account information below to transfer funds.</span>
                </p>
                <p>
                  Email your transfer confirmation to <span className="font-medium text-black underline">info@neilsonhayslibrary.org</span> with your Order Number <span className="font-bold">#{orderDetails?.order_id}</span> in the subject line.
                </p>
                <p className="font-medium text-red-600">
                  Transfers must be completed within 3 days or your order will be cancelled.
                </p>
                <div className="mt-3 pt-3 border-t border-yellow-300">
                  <p className="text-gray-700">
                    หลังจากโอนเงินแล้ว กรุณาอีเมล์สลิปไปที่ <span className="font-medium text-black underline">info@neilsonhayslibrary.org</span> พร้อมระบุ Order Number <span className="font-bold">#{orderDetails?.order_id}</span> ในหัวข้อของอีเมล์
                  </p>
                  <p className="text-red-600 font-medium">
                    หากไม่โอนเงินภายใน 3 วัน order จะถูกตัดออกจากระบบ
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">What&apos;s Next?</h3>
              <p className="text-blue-800 text-sm">
                You will receive a confirmation email shortly with your booking details and any additional information about your event(s).
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Browse Memberships
              </Button>
            </Link>

            <Link href="/events">
              <Button variant="outline">
                Browse Events
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessPageContent />
    </Suspense>
  )
}
