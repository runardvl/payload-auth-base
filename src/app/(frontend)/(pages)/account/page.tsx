import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { AccountForm, HydrateClientUser } from '../../features/auth'
import { Button, Gutter, RenderParams } from '../../shared/ui'
import styles from './styles.module.scss'

export default async function Account() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { permissions, user } = await payload.auth({ headers })

  if (!user) {
    redirect(
      `/login?error=${encodeURIComponent('You must be logged in to access your account.')}&redirect=/account')}`,
    )
  }

  return (
    <>
      <HydrateClientUser
        permissions={{
          canAccessAdmin: permissions?.canAccessAdmin ?? false,
          globals: permissions?.globals || {},
        }}
        user={user}
      />
      <Gutter className={styles.login}>
        <RenderParams className={styles.params} />
        <h1>Account</h1>
        <p>
          {`This is your account dashboard. Here you can update your account information and more. To manage all users, `}
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
            login to the admin dashboard
          </Link>
          .
        </p>
        <AccountForm />
        <Button appearance="secondary" href="/logout" label="Log out" />
      </Gutter>
    </>
  )
}
