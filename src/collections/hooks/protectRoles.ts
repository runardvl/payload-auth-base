import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<{ id: string } & User> = ({ data, req }) => {
  const isAdmin = req.user?.roles?.includes('admin') ?? false

  if (!isAdmin) {
    const roles = new Set(data?.roles || [])
    roles.add('user')
    return [...roles].filter((role) => role === 'user')
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user')
  return [...userRoles]
}
