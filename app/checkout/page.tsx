'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { CartManager, CustomerInfo } from '@/lib/cart'
import { CheckoutRequest, CheckoutResponse } from '@/app/api/checkout/route'

declare global {
  interface Window {
    Omise: {
      setPublicKey: (key: string) => void
      createToken: (
        type: string,
        data: {
          name: string
          number: string
          expiration_month: number
          expiration_year: number
          security_code: string
        },
        callback: (statusCode: number, response: { id: string; message?: string }) => void
      ) => void
    }
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [customer, setCustomer] = useState<CustomerInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [omiseLoaded, setOmiseLoaded] = useState(false)

  // Load Omise.js
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.omise.co/omise.js'
    script.onload = () => {
      if (window.Omise) {
        window.Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY!)
        setOmiseLoaded(true)
      }
    }
    document.head.appendChild(script)

    // Load saved customer info
    const savedCustomer = CartManager.getCustomerInfo()
    if (savedCustomer) {
      setCustomer(savedCustomer)
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Redirect if cart is empty (with a small delay to allow for cart updates)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart.items.length === 0) {
        router.push('/products')
      }
    }, 100) // 100ms delay to allow cart state to update

    return () => clearTimeout(timer)
  }, [cart.items.length, router])

  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    const updatedCustomer = { ...customer, [field]: value }
    setCustomer(updatedCustomer)
    CartManager.saveCustomerInfo(updatedCustomer)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!omiseLoaded || isProcessing) return

    setIsProcessing(true)
    setError(null)

    try {
      // Create Omise token
      const token = await new Promise<{ id: string }>((resolve, reject) => {
        window.Omise.createToken('card', {
          name: `${customer.first_name} ${customer.last_name}`,
          number: (document.getElementById('card-number') as HTMLInputElement).value,
          expiration_month: parseInt((document.getElementById('expiry-month') as HTMLInputElement).value),
          expiration_year: parseInt((document.getElementById('expiry-year') as HTMLInputElement).value),
          security_code: (document.getElementById('cvv') as HTMLInputElement).value,
        }, (statusCode: number, response: { id: string; message?: string }) => {
          if (statusCode === 200) {
            resolve(response)
          } else {
            reject(new Error(response.message || 'Failed to create payment token'))
          }
        })
      })

      // Process checkout
      const checkoutData: CheckoutRequest = {
        cart,
        customer,
        payment: {
          token: token.id,
          save_card: false,
        },
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })

      const result: CheckoutResponse = await response.json()

      if (result.success && result.redirect_url) {
        // Clear cart and redirect to success page
        clearCart()
        CartManager.clearCustomerInfo()
        router.push(result.redirect_url)
      } else {
        setError(result.error || 'Payment failed')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <div className="space-x-4">
            <Button onClick={() => router.push('/products')}>Browse Products</Button>
            <Button onClick={() => router.push('/events')} variant="outline">Browse Events</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ฿{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">
                  ฿{cart.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.first_name}
                    onChange={(e) => handleCustomerChange('first_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.last_name}
                    onChange={(e) => handleCustomerChange('last_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => handleCustomerChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => handleCustomerChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Card Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Card Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month *
                    </label>
                    <select
                      id="expiry-month"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year *
                    </label>
                    <select
                      id="expiry-year"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      required
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!omiseLoaded || isProcessing}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg"
              >
                {isProcessing ? 'Processing...' : `Pay ฿${cart.total.toFixed(2)}`}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Secured by Omise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
