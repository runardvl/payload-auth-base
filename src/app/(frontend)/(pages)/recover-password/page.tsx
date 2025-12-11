import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Gutter } from '../../shared/ui'

import styles from './styles.module.scss'
import { RecoverPasswordForm } from '../../features/auth'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('Cannot recover password while logged in.')}`)
  }

  return (
    <Gutter className={styles.recoverPassword}>
      <RecoverPasswordForm />
    </Gutter>
  )
}
