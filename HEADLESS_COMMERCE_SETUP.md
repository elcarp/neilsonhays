# Headless Commerce Setup Guide

This guide explains how to set up the headless commerce implementation using Next.js with Omise payments and WooCommerce as a backend.

## Overview

The headless commerce approach allows you to:

- Keep all transactions on your main domain (`neilsonhayslibrary.org`)
- Use WooCommerce for product/order management
- Process payments directly through Omise in Next.js
- Maintain full control over the user experience

## Architecture

```
User → Next.js Frontend → Omise (Payment) → WooCommerce (Orders)
                      ↓
                   Webhooks → Update Orders
```

## Prerequisites

1. **WooCommerce installed** on your WordPress site
2. **Omise account** with API keys
3. **Next.js application** (this project)

## Step 1: Install Required Dependencies

```bash
npm install omise@^1.0.0
```

## Step 2: Environment Variables

Create a `.env.local` file in your project root:

```bash
# WordPress REST API Configuration
WP_APP_USER=your_wordpress_username
WP_APP_PASS=your_wordpress_app_password

# WooCommerce REST API Configuration
WC_CONSUMER_KEY=ck_your_consumer_key_here
WC_CONSUMER_SECRET=cs_your_consumer_secret_here

# Omise Payment Gateway Configuration
OMISE_PUBLIC_KEY=pkey_test_your_public_key_here
OMISE_SECRET_KEY=skey_test_your_secret_key_here
OMISE_WEBHOOK_SECRET=your_webhook_secret_here

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=https://neilsonhayslibrary.org
NEXT_PUBLIC_OMISE_PUBLIC_KEY=pkey_test_your_public_key_here

# Optional: Debug Mode
DEBUG_WC_API=false
DEBUG_OMISE=false
```

## Step 3: Configure Omise

### 3.1 Get API Keys

1. Log into your Omise Dashboard
2. Go to **API Keys** section
3. Copy your **Public Key** and **Secret Key**
4. For production, use live keys; for testing, use test keys

### 3.2 Set Up Webhooks

1. In Omise Dashboard, go to **Webhooks**
2. Create a new webhook endpoint: `https://neilsonhayslibrary.org/api/webhooks/omise`
3. Select events to listen for:
   - `charge.complete`
   - `charge.create`
   - `charge.update`
4. Copy the **Webhook Secret** for verification

## Step 4: Configure WooCommerce

### 4.1 Create API Keys

1. Go to **WooCommerce > Settings > Advanced > REST API**
2. Click **Add Key**
3. Set permissions to **Read/Write**
4. Copy the **Consumer Key** and **Consumer Secret**

### 4.2 Set Up Products

Create products in WooCommerce for your events:

1. **Product Type**: Simple Product
2. **Virtual**: Yes (events are virtual products)
3. **Manage Stock**: Yes
4. **Stock Quantity**: Maximum attendees
5. **Price**: Event price (or 0 for free events)

Add custom fields for event details:

- `_event_date`: Event date
- `_event_time`: Event time
- `_event_location`: Event location

## Step 5: Test the Integration

### 5.1 Test Cart Functionality

1. Visit an event page
2. Click "Add to Cart"
3. Verify item appears in cart
4. Test quantity changes and removal

### 5.2 Test Checkout Process

1. Add items to cart
2. Go to `/checkout`
3. Fill in customer and payment details
4. Use Omise test card numbers:
   - **Success**: 4242424242424242
   - **Failure**: 4000000000000002

### 5.3 Verify Order Creation

1. Check WooCommerce orders after test purchase
2. Verify order status updates correctly
3. Check webhook processing in logs

## Step 6: Production Deployment

### 6.1 Update Environment Variables

Replace test keys with production keys:

- Omise live keys (start with `pkey_live_` and `skey_live_`)
- Update webhook URL to production domain
- Set `NEXT_PUBLIC_BASE_URL` to your live domain

### 6.2 SSL Certificate

Ensure your site has a valid SSL certificate for secure payments.

### 6.3 Test Production

1. Test with small amounts first
2. Verify email notifications work
3. Check order fulfillment process

## Key Features

### Cart Management

- **Persistent Cart**: Stored in localStorage
- **Multiple Items**: Support for multiple events
- **Metadata**: Special requests and event details
- **Quantity Management**: Easy quantity updates

### Payment Processing

- **Secure**: All payments processed through Omise
- **3D Secure**: Automatic support for 3D Secure
- **Multiple Cards**: Support for various card types
- **Real-time Status**: Instant payment status updates

### Order Management

- **Automatic Creation**: Orders created in WooCommerce
- **Status Sync**: Payment status synced via webhooks
- **Email Notifications**: Automatic confirmation emails
- **Inventory Management**: Stock levels updated automatically

## Troubleshooting

### Common Issues

1. **"Payment failed"**
   - Check Omise API keys
   - Verify webhook URL is accessible
   - Check card details format

2. **"Order not created"**
   - Verify WooCommerce API credentials
   - Check product exists and is in stock
   - Review WooCommerce logs

3. **"Webhook not received"**
   - Verify webhook URL is publicly accessible
   - Check webhook secret matches
   - Review webhook logs in Omise dashboard

### Debug Mode

Enable debug logging by setting environment variables:

```bash
DEBUG_WC_API=true
DEBUG_OMISE=true
```

Check browser console and server logs for detailed error information.

## Security Considerations

1. **API Keys**: Never expose secret keys in frontend code
2. **Webhook Verification**: Always verify webhook signatures
3. **HTTPS**: Use HTTPS for all payment-related pages
4. **Input Validation**: Validate all user inputs
5. **Rate Limiting**: Implement rate limiting on API endpoints

## Migration from Current Setup

### Phase 1: Parallel Setup

1. Set up headless commerce alongside existing WooCommerce
2. Test thoroughly with small transactions
3. Train staff on new order management

### Phase 2: Domain Migration

1. Update DNS to point to Next.js application
2. Set up redirects from old WooCommerce URLs
3. Update Omise webhook URLs
4. Monitor for any issues

### Phase 3: Full Migration

1. Disable old WooCommerce frontend
2. Update all marketing materials
3. Monitor order processing
4. Provide customer support for any issues

## Support

For technical issues:

1. Check this documentation
2. Review error logs
3. Test in development environment
4. Contact Omise support for payment issues
5. Check WooCommerce documentation for order issues

## Benefits of This Approach

1. **Same Domain**: All transactions on `neilsonhayslibrary.org`
2. **Better UX**: Seamless user experience
3. **Full Control**: Complete control over checkout flow
4. **Modern Stack**: Built with modern web technologies
5. **Scalable**: Easy to add new features and payment methods
6. **SEO Friendly**: Better SEO with unified domain
7. **Performance**: Faster loading with Next.js optimization
