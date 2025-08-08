// lib/wp-rest.ts
const WP_URL = 'https://neilsonhayslibrary.org'

function authHeaders(): Record<string, string> {
  if (!process.env.WP_APP_USER || !process.env.WP_APP_PASS) return {}
  const token = Buffer.from(
    `${process.env.WP_APP_USER}:${process.env.WP_APP_PASS}`
  ).toString('base64')
  return { Authorization: `Basic ${token}` }
}

export async function wpGet<T>(path: string, options: RequestInit = {}) {
  const authHeadersToUse = authHeaders()

  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    // Cache strategies: 'force-cache' (SSG), 'no-store' (SSR),
    // or { next: { revalidate: N } } for ISR.
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      ...authHeadersToUse,
      ...(options.headers || {}),
    },
  })

  // If we get a 401 and we were trying to use auth, try again without auth
  if (res.status === 401 && Object.keys(authHeadersToUse).length > 0) {
    console.warn('WordPress authentication failed, trying without auth...')
    const resWithoutAuth = await fetch(`${WP_URL}/wp-json${path}`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })
    if (!resWithoutAuth.ok) throw new Error(`WP error ${resWithoutAuth.status}`)
    const data = (await resWithoutAuth.json()) as T
    return data
  }

  if (!res.ok) throw new Error(`WP error ${res.status}`)
  const data = (await res.json()) as T
  return data
}
