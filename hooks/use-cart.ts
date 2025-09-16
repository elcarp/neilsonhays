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
