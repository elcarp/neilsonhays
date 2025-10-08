// Diagnostic API route to help identify 403 issues
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasWcCredentials: {
      consumerKey: !!process.env.WC_CONSUMER_KEY,
      consumerSecret: !!process.env.WC_CONSUMER_SECRET,
    },
    requestHeaders: Object.fromEntries(request.headers.entries()),
    wcUrl: process.env.WC_URL || 'https://store.neilsonhayslibrary.org',
  }

  console.log('Diagnostic info:', diagnostics)

  // Test basic connectivity to WordPress
  const tests = []

  try {
    console.log('Testing basic WordPress connectivity...')
    const wpResponse = await fetch(`${diagnostics.wcUrl}/wp-json/`, {
      headers: {
        'User-Agent': 'NeilsonHaysLibrary-Diagnostic/1.0',
      },
    })

    tests.push({
      name: 'WordPress REST API Base',
      url: `${diagnostics.wcUrl}/wp-json/`,
      status: wpResponse.status,
      ok: wpResponse.ok,
      headers: Object.fromEntries(wpResponse.headers.entries()),
    })
  } catch (error) {
    tests.push({
      name: 'WordPress REST API Base',
      url: `${diagnostics.wcUrl}/wp-json/`,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Test WooCommerce API endpoint without auth
  try {
    console.log('Testing WooCommerce API without auth...')
    const wcResponse = await fetch(
      `${diagnostics.wcUrl}/wp-json/wc/v3/products?per_page=1`,
      {
        headers: {
          'User-Agent': 'NeilsonHaysLibrary-Diagnostic/1.0',
        },
      }
    )

    tests.push({
      name: 'WooCommerce API (no auth)',
      url: `${diagnostics.wcUrl}/wp-json/wc/v3/products?per_page=1`,
      status: wcResponse.status,
      ok: wcResponse.ok,
      headers: Object.fromEntries(wcResponse.headers.entries()),
    })
  } catch (error) {
    tests.push({
      name: 'WooCommerce API (no auth)',
      url: `${diagnostics.wcUrl}/wp-json/wc/v3/products?per_page=1`,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Test with authentication if credentials are available
  if (process.env.WC_CONSUMER_KEY && process.env.WC_CONSUMER_SECRET) {
    try {
      console.log('Testing WooCommerce API with auth...')
      const authHeader = `Basic ${Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
      ).toString('base64')}`

      const wcAuthResponse = await fetch(
        `${diagnostics.wcUrl}/wp-json/wc/v3/products?per_page=1`,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
            'User-Agent': 'NeilsonHaysLibrary-Diagnostic/1.0',
          },
        }
      )

      let responseText = ''
      try {
        responseText = await wcAuthResponse.text()
      } catch {
        responseText = 'Could not read response'
      }

      tests.push({
        name: 'WooCommerce API (with auth)',
        url: `${diagnostics.wcUrl}/wp-json/wc/v3/products?per_page=1`,
        status: wcAuthResponse.status,
        ok: wcAuthResponse.ok,
        headers: Object.fromEntries(wcAuthResponse.headers.entries()),
        responsePreview: responseText.substring(0, 500),
      })
    } catch (error) {
      tests.push({
        name: 'WooCommerce API (with auth)',
        url: `${diagnostics.wcUrl}/wp-json/wc/v3/products?per_page=1`,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  return NextResponse.json({
    diagnostics,
    tests,
    recommendations: [
      'Check the test results above to identify where the 403 is coming from',
      'If WordPress REST API Base fails, check hosting provider firewall',
      "If WooCommerce API (no auth) returns 401, that's normal",
      'If WooCommerce API (with auth) returns 403, check API credentials and permissions',
      'Look at response headers for clues (server, x-powered-by, etc.)',
    ],
  })
}
