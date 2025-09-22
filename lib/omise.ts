// lib/omise.ts
import Omise from 'omise'

// Initialize Omise with your credentials
const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY!,
  secretKey: process.env.OMISE_SECRET_KEY!,
})

// Verify Omise credentials are available
if (!process.env.OMISE_PUBLIC_KEY || !process.env.OMISE_SECRET_KEY) {
  console.error(
    'Missing Omise credentials! Please check your environment variables.'
  )
}

export interface OmiseCustomer {
  id: string
  email: string
  description?: string
  metadata?: Record<string, string>
}

export interface OmiseCharge {
  id: string
  amount: number
  currency: string
  status: 'successful' | 'failed' | 'pending'
  customer?: string
  card?: {
    id: string
    last_digits: string
    brand: string
    expiration_month: number
    expiration_year: number
  }
  metadata?: Record<string, string>
  failure_code?: string
  failure_message?: string
}

export interface CreateChargeParams {
  amount: number // Amount in smallest currency unit (e.g., satang for THB)
  currency: string
  customer?: string
  card?: string
  source?: string
  description?: string
  metadata?: Record<string, string>
  return_uri?: string
}

export interface CreateCustomerParams {
  email: string
  description?: string
  card?: string
  metadata?: Record<string, string>
}

// Create a customer in Omise
export async function createCustomer(
  params: CreateCustomerParams
): Promise<OmiseCustomer> {
  try {
    const customer = await omise.customers.create(params)
    return {
      id: customer.id,
      email: customer.email,
      description: customer.description,
      metadata: customer.metadata,
    }
  } catch (error) {
    console.error('Failed to create Omise customer:', error)
    throw new Error('Failed to create customer')
  }
}

// Create a charge in Omise
export async function createCharge(
  params: CreateChargeParams
): Promise<OmiseCharge> {
  try {
    console.log('Creating Omise charge with params:', {
      ...params,
      card: params.card ? `${params.card.substring(0, 10)}...` : 'none',
      source: params.source ? `${params.source.substring(0, 10)}...` : 'none',
    })

    const charge = await omise.charges.create(params)

    console.log('Omise charge created:', {
      id: charge.id,
      status: charge.status,
      amount: charge.amount,
      currency: charge.currency,
      failure_code: charge.failure_code,
      failure_message: charge.failure_message,
    })

    return {
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      status: charge.status as 'successful' | 'failed' | 'pending',
      customer:
        typeof charge.customer === 'string'
          ? charge.customer
          : charge.customer?.id,
      card: charge.card
        ? {
            id: charge.card.id,
            last_digits: charge.card.last_digits,
            brand: charge.card.brand,
            expiration_month: charge.card.expiration_month,
            expiration_year: charge.card.expiration_year,
          }
        : undefined,
      metadata: charge.metadata,
      failure_code: charge.failure_code,
      failure_message: charge.failure_message,
    }
  } catch (error) {
    console.error('Failed to create Omise charge:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      params: {
        ...params,
        card: params.card ? `${params.card.substring(0, 10)}...` : 'none',
        source: params.source ? `${params.source.substring(0, 10)}...` : 'none',
      },
    })
    throw new Error(
      `Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

// Retrieve a charge from Omise
export async function retrieveCharge(chargeId: string): Promise<OmiseCharge> {
  try {
    const charge = await omise.charges.retrieve(chargeId)
    return {
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      status: charge.status as 'successful' | 'failed' | 'pending',
      customer:
        typeof charge.customer === 'string'
          ? charge.customer
          : charge.customer?.id,
      card: charge.card
        ? {
            id: charge.card.id,
            last_digits: charge.card.last_digits,
            brand: charge.card.brand,
            expiration_month: charge.card.expiration_month,
            expiration_year: charge.card.expiration_year,
          }
        : undefined,
      metadata: charge.metadata,
      failure_code: charge.failure_code,
      failure_message: charge.failure_message,
    }
  } catch (error) {
    console.error('Failed to retrieve Omise charge:', error)
    throw new Error('Failed to retrieve payment information')
  }
}

// Create a token for card payments (used on frontend)
export async function createToken(card: {
  name: string
  number: string
  expiration_month: number
  expiration_year: number
  security_code: string
  city?: string
  postal_code?: string
}) {
  try {
    const cardData = {
      name: card.name,
      number: card.number,
      expiration_month: card.expiration_month,
      expiration_year: card.expiration_year,
      security_code: card.security_code,
      city: card.city || '',
      postal_code: card.postal_code || '',
    }
    const token = await omise.tokens.create({ card: cardData })
    return token
  } catch (error) {
    console.error('Failed to create Omise token:', error)
    throw new Error('Failed to process card information')
  }
}

// Verify webhook signature
export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookKey: string
): Promise<boolean> {
  const crypto = await import('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', webhookKey)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )
}

export default omise
