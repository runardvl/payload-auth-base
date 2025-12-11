import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Gutter } from '../../shared/ui'

import styles from './styles.module.scss'
import Link from 'next/link'
import { LogoutTemplate } from '../../features/auth'

export default async function Logout() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <Gutter className={styles.logout}>
        <h1>You are already logged out.</h1>
        <p>
          {'What would you like to do next? '}
          <Link href="/">Click here</Link>
          {` to go to the home page. To log back in, `}
          <Link href="/login">click here</Link>
        </p>
      </Gutter>
    )
  }

  return (
    <Gutter className={styles.logout}>
      <LogoutTemplate />
    </Gutter>
  )
}
