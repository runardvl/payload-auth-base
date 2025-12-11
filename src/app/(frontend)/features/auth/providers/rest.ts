import type { User } from '@/payload-types'

export const rest = async (
  url: string,
  args?: any,
  options?: RequestInit,
): Promise<null | undefined | User> => {
  const method = options?.method || 'POST'

  try {
    const res = await fetch(url, {
      method,
      ...(method === 'POST' ? { body: JSON.stringify(args) } : {}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    const responseData = await res.json()
    const { errors, user } = responseData

    // Handle "No User" error specifically for logout
    if (url.includes('/api/users/logout') && errors?.[0]?.message === 'No User') {
      return null
    }

    // Handle other errors
    if (errors) {
      throw new Error(errors[0].message)
    }

    // Handle successful responses
    if (res.ok) {
      return user
    }

    // Handle non-200 status codes that don't have errors in JSON
    throw new Error(`Request failed with status ${res.status}`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(String(error))
  }
}
