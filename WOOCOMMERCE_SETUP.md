# WooCommerce Integration Setup Guide

This guide will help you set up WooCommerce integration with your Neilson Hays Library website for event bookings and product sales.

## Prerequisites

1. **WordPress with WooCommerce installed** on your server
2. **WooCommerce REST API enabled**
3. **Environment variables configured** in your Next.js application

## Step 1: Install and Configure WooCommerce

### 1.1 Install WooCommerce Plugin

1. Log into your WordPress admin dashboard
2. Go to **Plugins > Add New**
3. Search for "WooCommerce"
4. Install and activate the plugin
5. Follow the setup wizard to configure basic settings

### 1.2 Enable REST API

1. Go to **WooCommerce > Settings > Advanced > REST API**
2. Click **Add Key**
3. Fill in the details:
   - **Description**: "Next.js Frontend API Access"
   - **User**: Select an admin user
   - **Permissions**: Read/Write
4. Click **Generate API Key**
5. **Save the Consumer Key and Consumer Secret** - you'll need these for environment variables

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# WordPress REST API Configuration
WP_APP_USER=your_wordpress_username
WP_APP_PASS=your_wordpress_app_password

# WooCommerce REST API Configuration
WC_CONSUMER_KEY=ck_your_consumer_key_here
WC_CONSUMER_SECRET=cs_your_consumer_secret_here
```

## Step 3: Set Up Event Products in WooCommerce

### 3.1 Create Event Category

1. Go to **Products > Categories**
2. Add a new category called "Events"
3. Note the category ID for later use

### 3.2 Create Event Products

For each event you want to make bookable:

1. Go to **Products > Add New**
2. Fill in basic details:
   - **Product name**: Event title
   - **Product slug**: Should match your event slug
   - **Product type**: Simple product
   - **Virtual**: Check this box (events are virtual products)
   - **Price**: Set the event price (or 0 for free events)

3. In **Inventory** section:
   - **Manage stock**: Enable this
   - **Stock quantity**: Set to maximum attendees
   - **Stock status**: In stock

4. In **Product Categories**: Select "Events"

5. Add **Custom Fields** (meta data) for event details:
   - `_event_date`: Event date (YYYY-MM-DD format)
   - `_event_time`: Event time (e.g., "7:00 PM")
   - `_event_location`: Event location
   - `_max_attendees`: Maximum number of attendees

6. **Publish** the product

## Step 4: Test the Integration

### 4.1 Test Event Display

1. Visit your event detail page: `/events/your-event-slug`
2. You should see the booking form instead of the basic registration card
3. Check that event details are displayed correctly

### 4.2 Test Booking Process

1. Fill out the booking form
2. Submit a test booking
3. Check WooCommerce orders to see if the booking was created
4. Verify email notifications are sent (if configured)

## Step 5: Configure Payment Methods (Optional)

### 5.1 Enable Payment Gateways

1. Go to **WooCommerce > Settings > Payments**
2. Enable desired payment methods:
   - **Direct Bank Transfer** (BACS)
   - **PayPal Standard**
   - **Stripe** (requires Stripe plugin)
   - **Check payments**

### 5.2 Configure Payment Settings

Configure each payment method according to your requirements.

## Step 6: Customize Email Templates (Optional)

### 6.1 Booking Confirmation Emails

1. Go to **WooCommerce > Settings > Emails**
2. Customize the "New Order" and "Processing Order" email templates
3. Add event-specific information to the templates

## API Endpoints

The integration provides the following API endpoints:

### Book Event

```
POST /api/book-event
```

Request body:

```json
{
  "product_id": 123,
  "quantity": 2,
  "customer": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+66123456789"
  },
  "meta_data": [{ "key": "_special_requests", "value": "Vegetarian meal" }]
}
```

### Check Event Availability

```
GET /api/book-event?product_id=123
```

Response:

```json
{
  "available": true,
  "current_attendees": 15,
  "max_attendees": 50
}
```

## Troubleshooting

### Common Issues

1. **"WooCommerce API credentials not found"**
   - Check your `.env.local` file has the correct WC_CONSUMER_KEY and WC_CONSUMER_SECRET
   - Ensure the keys are properly generated in WooCommerce settings

2. **"Event is not available for booking"**
   - Check the product is published in WooCommerce
   - Verify stock management is enabled and stock quantity is set
   - Ensure the product is in the "Events" category

3. **"Failed to create booking"**
   - Check WooCommerce logs in **WooCommerce > Status > Logs**
   - Verify the API user has proper permissions
   - Check network connectivity between your Next.js app and WordPress

### Debug Mode

To enable debug logging, add this to your environment variables:

```bash
DEBUG_WC_API=true
```

## Security Considerations

1. **Use HTTPS**: Ensure your WordPress site uses HTTPS for API security
2. **Limit API Permissions**: Only give the API user necessary permissions
3. **Regular Updates**: Keep WooCommerce and WordPress updated
4. **Monitor API Usage**: Regularly check API logs for unusual activity

## Advanced Features

### Custom Fields

You can add custom fields to the booking form by modifying the `EventBooking` component and adding corresponding meta_data to the API request.

### Inventory Management

The system automatically manages event capacity by updating WooCommerce stock levels when bookings are made.

### Order Status Management

Bookings go through standard WooCommerce order statuses:

- **Pending**: Booking submitted, awaiting payment
- **Processing**: Payment received, booking confirmed
- **Completed**: Event completed
- **Cancelled**: Booking cancelled

## Support

For technical support with the integration, check:

1. WooCommerce documentation: https://woocommerce.com/documentation/
2. WordPress REST API documentation: https://developer.wordpress.org/rest-api/
3. Next.js documentation: https://nextjs.org/docs

## Migration from Mock Data

If you're migrating from the mock event system:

1. Create WooCommerce products for existing events
2. Use the same slugs to maintain URL compatibility
3. The system will automatically prefer WooCommerce events over WordPress/fallback events
4. Test each event page to ensure proper functionality
