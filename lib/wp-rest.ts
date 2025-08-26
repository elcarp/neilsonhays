// lib/wp-rest.ts
const WP_URL = 'https://neilsonhayslibrary.org'

function authHeaders(): Record<string, string> {
  if (!process.env.WP_APP_USER || !process.env.WP_APP_PASS) return {}
  const token = Buffer.from(
    `${process.env.WP_APP_USER}:${process.env.WP_APP_PASS}`
  ).toString('base64')
  return { Authorization: `Basic ${token}` }
}

export async function wpGet<T>(
  path: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const authHeadersToUse = authHeaders()
  const maxRetries = 2

  try {
    console.log(
      `Making WordPress API request to: ${WP_URL}/wp-json${path}${retryCount > 0 ? ` (retry ${retryCount})` : ''}`
    )

    const res = await fetch(`${WP_URL}/wp-json${path}`, {
      // Cache strategies: 'force-cache' (SSG), 'no-store' (SSR),
      // or { next: { revalidate: N } } for ISR.
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        ...authHeadersToUse,
        ...(options.headers || {}),
      },
      // Add timeout to prevent hanging - increased to 15 seconds for slower WordPress responses
      signal: AbortSignal.timeout(15000), // 15 second timeout
    })

    console.log(`WordPress API response status: ${res.status}`)

    return await handleResponse<T>(res, path, authHeadersToUse, options)
  } catch (error) {
    console.error(`WordPress API request failed for ${path}:`, error)

    // Retry on timeout or network errors
    if (retryCount < maxRetries && error instanceof Error) {
      if (
        error.name === 'TimeoutError' ||
        error.message.includes('timeout') ||
        error.message.includes('fetch failed') ||
        error.message.includes('network')
      ) {
        console.log(
          `Retrying WordPress API request (${retryCount + 1}/${maxRetries})...`
        )
        await new Promise(resolve =>
          setTimeout(resolve, 1000 * (retryCount + 1))
        ) // Exponential backoff
        return wpGet<T>(path, options, retryCount + 1)
      }
    }

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
        throw new Error(
          'WordPress site is taking too long to respond. Please try again later.'
        )
      }
      if (
        error.message.includes('fetch failed') ||
        error.message.includes('network')
      ) {
        throw new Error(
          'Unable to connect to WordPress site. Please check your internet connection.'
        )
      }
      throw new Error(`WordPress API error: ${error.message}`)
    }

    throw new Error('WordPress API request failed due to an unknown error')
  }
}

async function handleResponse<T>(
  res: Response,
  path: string,
  authHeadersToUse: Record<string, string>,
  options: RequestInit
): Promise<T> {
  // If we get a 401 and we were trying to use auth, try again without auth
  if (res.status === 401 && Object.keys(authHeadersToUse).length > 0) {
    console.warn('WordPress authentication failed, trying without auth...')
    try {
      const resWithoutAuth = await fetch(`${WP_URL}/wp-json${path}`, {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        signal: AbortSignal.timeout(15000), // 15 second timeout
      })

      console.log(
        `Retry without auth response status: ${resWithoutAuth.status}`
      )

      if (!resWithoutAuth.ok) {
        throw new Error(`WP error ${resWithoutAuth.status}`)
      }

      const data = (await resWithoutAuth.json()) as T
      console.log('Successfully retrieved data without auth')
      return data
    } catch (retryError) {
      console.error('Retry without auth also failed:', retryError)
      throw new Error(
        `WordPress API failed even without auth: ${retryError instanceof Error ? retryError.message : 'Unknown error'}`
      )
    }
  }

  if (!res.ok) {
    throw new Error(`WordPress API returned ${res.status}: ${res.statusText}`)
  }

  try {
    const data = (await res.json()) as T
    console.log('Successfully retrieved data with auth')
    return data
  } catch (parseError) {
    console.error('Failed to parse WordPress API response:', parseError)
    throw new Error('WordPress API returned invalid JSON')
  }
}
