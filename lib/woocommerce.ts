// lib/woocommerce.ts
// import crypto from 'crypto' // Currently unused - for OAuth signature generation

const WC_URL = 'https://store.neilsonhayslibrary.org'
const WC_API_VERSION = 'v3'

// WooCommerce API credentials - add these to your .env.local
function getWcCredentials() {
  const consumerKey = process.env.WC_CONSUMER_KEY
  const consumerSecret = process.env.WC_CONSUMER_SECRET

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials not found. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your environment variables.'
    )
  }

  return { consumerKey, consumerSecret }
}

// Generate OAuth 1.0a signature for WooCommerce API (for future use with HTTP sites)
// Currently unused as we use Basic Auth for HTTPS
// function generateOAuthSignature(
//   method: string,
//   url: string,
//   params: Record<string, string>,
//   consumerSecret: string
// ): string {
//   // Sort parameters
//   const sortedParams = Object.keys(params)
//     .sort()
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     .join('&')

//   // Create signature base string
//   const signatureBaseString = [
//     method.toUpperCase(),
//     encodeURIComponent(url),
//     encodeURIComponent(sortedParams),
//   ].join('&')

//   // Create signing key (consumer secret + '&' + token secret, but we don't have token secret)
//   const signingKey = `${encodeURIComponent(consumerSecret)}&`

//   // Generate signature
//   return crypto
//     .createHmac('sha1', signingKey)
//     .update(signatureBaseString)
//     .digest('base64')
// }

// Generate OAuth parameters for WooCommerce API (for future use with HTTP sites)
// Currently unused as we use Basic Auth for HTTPS
// function generateOAuthParams(
//   method: string,
//   url: string,
//   consumerKey: string,
//   consumerSecret: string
// ): Record<string, string> {
//   const timestamp = Math.floor(Date.now() / 1000).toString()
//   const nonce = crypto.randomBytes(16).toString('hex')

//   const params = {
//     oauth_consumer_key: consumerKey,
//     oauth_nonce: nonce,
//     oauth_signature_method: 'HMAC-SHA1',
//     oauth_timestamp: timestamp,
//     oauth_version: '1.0',
//   }

//   const signature = generateOAuthSignature(method, url, params, consumerSecret)

//   return {
//     ...params,
//     oauth_signature: signature,
//   }
// }

// Main WooCommerce API function
export async function wcGet<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { consumerKey, consumerSecret } = getWcCredentials()
  const url = `${WC_URL}/wp-json/wc/${WC_API_VERSION}/${endpoint.replace(/^\//, '')}`

  try {
    console.log(`Making WooCommerce API request to: ${url}`)

    // For HTTPS, we can use basic auth instead of OAuth (simpler)
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64'
    )

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
        ...(options.headers || {}),
      },
      signal: AbortSignal.timeout(20000), // 20 second timeout for WooCommerce
      ...options,
    })

    console.log(`WooCommerce API response status: ${res.status}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`WooCommerce API error: ${res.status} - ${errorText}`)
      throw new Error(
        `WooCommerce API returned ${res.status}: ${res.statusText}`
      )
    }

    const data = (await res.json()) as T
    console.log('Successfully retrieved WooCommerce data')
    return data
  } catch (error) {
    console.error(`WooCommerce API request failed for ${endpoint}:`, error)

    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
        throw new Error(
          'WooCommerce API is taking too long to respond. Please try again later.'
        )
      }
      if (
        error.message.includes('fetch failed') ||
        error.message.includes('network')
      ) {
        throw new Error(
          'Unable to connect to WooCommerce API. Please check your internet connection.'
        )
      }
      throw new Error(`WooCommerce API error: ${error.message}`)
    }

    throw new Error('WooCommerce API request failed due to an unknown error')
  }
}

// POST request for creating orders, etc.
export async function wcPost<T>(
  endpoint: string,
  data: Record<string, unknown>,
  options: RequestInit = {}
): Promise<T> {
  return wcGet<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  })
}

// PUT request for updating orders, etc.
export async function wcPut<T>(
  endpoint: string,
  data: Record<string, unknown>,
  options: RequestInit = {}
): Promise<T> {
  return wcGet<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  })
}

// DELETE request
export async function wcDelete<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return wcGet<T>(endpoint, {
    method: 'DELETE',
    ...options,
  })
}

// Type definitions for WooCommerce entities
export interface WcProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: 'simple' | 'grouped' | 'external' | 'variable' | 'booking'
  status: 'draft' | 'pending' | 'private' | 'publish'
  featured: boolean
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden'
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: Array<{
    id: string
    name: string
    file: string
  }>
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: 'taxable' | 'shipping' | 'none'
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  backorders: 'no' | 'notify' | 'yes'
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: Array<{
    id: number
    date_created: string
    date_modified: string
    src: string
    name: string
    alt: string
  }>
  attributes: Array<{
    id: number
    name: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }>
  default_attributes: Array<{
    id: number
    name: string
    option: string
  }>
  variations: number[]
  grouped_products: number[]
  menu_order: number
  meta_data: Array<{
    id: number
    key: string
    value: string | number | boolean | null
  }>
}

export interface WcOrder {
  id: number
  parent_id: number
  number: string
  order_key: string
  created_via: string
  version: string
  status:
    | 'pending'
    | 'processing'
    | 'on-hold'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'trash'
  currency: string
  date_created: string
  date_modified: string
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  prices_include_tax: boolean
  customer_id: number
  customer_ip_address: string
  customer_user_agent: string
  customer_note: string
  billing: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
  }
  payment_method: string
  payment_method_title: string
  transaction_id: string
  date_paid: string | null
  date_completed: string | null
  cart_hash: string
  meta_data: Array<{
    id: number
    key: string
    value: string | number | boolean | null
  }>
  line_items: Array<{
    id: number
    name: string
    product_id: number
    variation_id: number
    quantity: number
    tax_class: string
    subtotal: string
    subtotal_tax: string
    total: string
    total_tax: string
    taxes: Array<{
      id: number
      total: string
      subtotal: string
    }>
    meta_data: Array<{
      id: number
      key: string
      value: string | number | boolean | null
    }>
    sku: string
    price: number
  }>
  tax_lines: Array<{
    id: number
    rate_code: string
    rate_id: number
    label: string
    compound: boolean
    tax_total: string
    shipping_tax_total: string
  }>
  shipping_lines: Array<{
    id: number
    method_title: string
    method_id: string
    total: string
    total_tax: string
  }>
  fee_lines: Array<{
    id: number
    name: string
    tax_class: string
    tax_status: string
    total: string
    total_tax: string
  }>
  coupon_lines: Array<{
    id: number
    code: string
    discount: string
    discount_tax: string
  }>
  refunds: Array<{
    id: number
    reason: string
    total: string
  }>
}

export interface WcCustomer {
  id: number
  date_created: string
  date_modified: string
  email: string
  first_name: string
  last_name: string
  role: string
  username: string
  billing: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
  }
  is_paying_customer: boolean
  avatar_url: string
  meta_data: Array<{
    id: number
    key: string
    value: string | number | boolean | null
  }>
}
