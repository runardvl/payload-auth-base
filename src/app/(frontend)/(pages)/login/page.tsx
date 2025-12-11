import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { Gutter, RenderParams } from '../../shared/ui'
import styles from './styles.module.scss'
import { LoginForm } from '../../features/auth/ui'

export default async function Login() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <Gutter className={styles.login}>
      <RenderParams className={styles.params} />
      <h1>Log in</h1>
      <LoginForm />
    </Gutter>
  )
}
