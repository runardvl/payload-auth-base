'use client'

import { PayloadRequest, Permissions } from 'payload'
import { useAuth } from './AuthProvider'
import { useEffect } from 'react'

interface Props {
  permissions: Permissions
  user: PayloadRequest['user']
}

export const HydrateClientUser = ({ permissions, user }: Props) => {
  const { setPermissions, setUser } = useAuth()

  useEffect(() => {
    setUser(user)
    setPermissions(permissions)
  }, [user, permissions, setUser, setPermissions])

  return null
}
