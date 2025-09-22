'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, RefreshCw } from 'lucide-react'

interface OrderDetails {
  order_id: number
  status: string
  total: string
  currency: string
  payment_method: string
  transaction_id: string
}

function CheckoutPendingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')
  const chargeId = searchParams.get('charge_id')

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)

  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/checkout?order_id=${orderId}`)
      if (response.ok) {
        const details = await response.json()
        setOrderDetails(details)

        // Redirect to success page if payment is completed
        if (details.status === 'processing' || details.status === 'completed') {
          router.push(`/checkout/success?order_id=${orderId}&charge_id=${chargeId}`)
        } else if (details.status === 'failed' || details.status === 'cancelled') {
          setError('Payment was not successful')
        }
      } else {
        setError('Failed to load order details')
      }
    } catch {
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }, [orderId, chargeId, router])

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()

      // Set up polling to check payment status
      const interval = setInterval(() => {
        fetchOrderDetails()
      }, 5000) // Check every 5 seconds

      return () => clearInterval(interval)
    }
  }, [orderId, fetchOrderDetails])

  const handleRefresh = async () => {
    setChecking(true)
    await fetchOrderDetails()
    setChecking(false)
  }

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Issue</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <Button onClick={handleRefresh} disabled={checking}>
              {checking ? 'Checking...' : 'Check Again'}
            </Button>
            <Link href="/events">
              <Button variant="outline">Browse Events</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-teal-500 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Pending
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your payment is being processed. This may take a few moments.
          </p>

          {orderDetails && (
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

                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize text-yellow-600">
                    {orderDetails.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-2">Please Wait</h3>
            <p className="text-yellow-800 text-sm">
              Your payment is being verified. This page will automatically update when the payment is complete.
              If you&apos;re using 3D Secure, please complete the verification process in your bank&apos;s window.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRefresh}
              disabled={checking}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {checking ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Status
                </>
              )}
            </Button>

            <Link href="/events">
              <Button variant="outline">
                Browse Events
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Having trouble? <Link href="/contact" className="text-teal-600 hover:underline">Contact us</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutPendingPageContent />
    </Suspense>
  )
}
