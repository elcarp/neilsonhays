// lib/omise.ts
import Omise from 'omise'

// Initialize Omise with your credentials
const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY!,
  secretKey: process.env.OMISE_SECRET_KEY!,
})

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
  token?: string
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
    const charge = await omise.charges.create(params)
    return {
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      status: charge.status as 'successful' | 'failed' | 'pending',
      customer: charge.customer,
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
    throw new Error('Failed to process payment')
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
      customer: charge.customer,
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
}) {
  try {
    const token = await omise.tokens.create({ card })
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
