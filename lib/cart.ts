// lib/cart.ts
import { WcProduct } from './woocommerce'

export interface CartItem {
  id: string
  product_id: number
  name: string
  price: number
  quantity: number
  image?: string
  metadata?: Record<string, unknown>
}

export interface Cart {
  items: CartItem[]
  total: number
  currency: string
}

export interface CustomerInfo {
  first_name: string
  last_name: string
  email: string
  phone?: string
  billing?: {
    address_1?: string
    address_2?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
  shipping?: {
    address_1?: string
    address_2?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
}

// Cart management utilities
export class CartManager {
  private static CART_KEY = 'neilson_hays_cart'
  private static CUSTOMER_KEY = 'neilson_hays_customer'

  // Get cart from localStorage (client-side only)
  static getCart(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, currency: 'THB' }
    }

    try {
      const cartData = localStorage.getItem(this.CART_KEY)
      if (!cartData) {
        return { items: [], total: 0, currency: 'THB' }
      }
      return JSON.parse(cartData)
    } catch (error) {
      console.error('Failed to parse cart data:', error)
      return { items: [], total: 0, currency: 'THB' }
    }
  }

  // Save cart to localStorage
  static saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }

  // Add item to cart
  static addItem(
    product: WcProduct,
    quantity: number = 1,
    metadata?: Record<string, unknown>
  ): Cart {
    const cart = this.getCart()
    const existingItemIndex = cart.items.findIndex(
      item =>
        item.product_id === product.id &&
        JSON.stringify(item.metadata) === JSON.stringify(metadata)
    )

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product_id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity,
        image: product.images[0]?.src,
        metadata,
      }
      cart.items.push(newItem)
    }

    cart.total = this.calculateTotal(cart.items)
    this.saveCart(cart)
    return cart
  }

  // Remove item from cart
  static removeItem(itemId: string): Cart {
    const cart = this.getCart()
    cart.items = cart.items.filter(item => item.id !== itemId)
    cart.total = this.calculateTotal(cart.items)
    this.saveCart(cart)
    return cart
  }

  // Update item quantity
  static updateQuantity(itemId: string, quantity: number): Cart {
    const cart = this.getCart()
    const itemIndex = cart.items.findIndex(item => item.id === itemId)

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1)
      } else {
        cart.items[itemIndex].quantity = quantity
      }
    }

    cart.total = this.calculateTotal(cart.items)
    this.saveCart(cart)
    return cart
  }

  // Clear cart
  static clearCart(): Cart {
    const emptyCart: Cart = { items: [], total: 0, currency: 'THB' }
    this.saveCart(emptyCart)
    return emptyCart
  }

  // Calculate total
  static calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Get customer info
  static getCustomerInfo(): CustomerInfo | null {
    if (typeof window === 'undefined') return null

    try {
      const customerData = localStorage.getItem(this.CUSTOMER_KEY)
      return customerData ? JSON.parse(customerData) : null
    } catch (error) {
      console.error('Failed to parse customer data:', error)
      return null
    }
  }

  // Save customer info
  static saveCustomerInfo(customer: CustomerInfo): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.CUSTOMER_KEY, JSON.stringify(customer))
    } catch (error) {
      console.error('Failed to save customer info:', error)
    }
  }

  // Clear customer info
  static clearCustomerInfo(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.CUSTOMER_KEY)
  }

  // Convert cart to WooCommerce order format
  static cartToWooCommerceOrder(cart: Cart, customer: CustomerInfo) {
    return {
      payment_method: 'omise',
      payment_method_title: 'Credit Card (Omise)',
      set_paid: false, // Will be set to true after successful payment
      billing: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone || '',
        ...customer.billing,
      },
      shipping: customer.shipping || customer.billing,
      line_items: cart.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        meta_data: item.metadata
          ? Object.entries(item.metadata).map(([key, value]) => ({
              key,
              value: String(value),
            }))
          : [],
      })),
      meta_data: [
        {
          key: '_payment_processor',
          value: 'omise',
        },
        {
          key: '_cart_total',
          value: cart.total.toString(),
        },
      ],
    }
  }
}
