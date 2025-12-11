'use client'

import { useAuth } from '@/app/(frontend)/features/auth'
import styles from './styles.module.scss'
import Link from 'next/link'

export const HeaderNav = () => {
  const { user } = useAuth()

  return (
    <nav className={`${styles.nav} ${user === undefined ? styles.hide : ''}`}>
      {user && (
        <>
          <Link href="/account">Account</Link>
          <Link href="/logout">Logout</Link>
        </>
      )}
      {!user && (
        <>
          <Link href="/login">Login</Link>
          <Link href="/create-account">Create Account</Link>
        </>
      )}
    </nav>
  )
}
