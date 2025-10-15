'use client'

import { useState, useEffect } from 'react'
import { CartManager, Cart } from '@/lib/cart'
import { WcProduct } from '@/lib/woocommerce'

// React hook for cart management
export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    currency: 'THB',
  })

  useEffect(() => {
    setCart(CartManager.getCart())

    // Listen for cart changes from other components
    const handleCartChange = () => {
      setCart(CartManager.getCart())
    }

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', handleCartChange)

    // Listen for localStorage changes (in case of multiple tabs)
    window.addEventListener('storage', e => {
      if (e.key === 'neilson_hays_cart') {
        handleCartChange()
      }
    })

    return () => {
      window.removeEventListener('cartUpdated', handleCartChange)
      window.removeEventListener('storage', handleCartChange)
    }
  }, [])

  const addItem = (
    product: WcProduct,
    quantity: number = 1,
    metadata?: Record<string, unknown>
  ) => {
    const updatedCart = CartManager.addItem(product, quantity, metadata)
    setCart(updatedCart)
    return updatedCart
  }

  const removeItem = (itemId: string) => {
    const updatedCart = CartManager.removeItem(itemId)
    setCart(updatedCart)
    return updatedCart
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedCart = CartManager.updateQuantity(itemId, quantity)
    setCart(updatedCart)
    return updatedCart
  }

  const clearCart = () => {
    const updatedCart = CartManager.clearCart()
    setCart(updatedCart)
    return updatedCart
  }

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
  }
}
