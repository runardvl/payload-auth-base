'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useCallback, useRef, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Button, Input, Message } from '@/app/(frontend)/shared/ui'

interface IFormData {
  email: string
  password: string
}

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<IFormData>({
    defaultValues: {
      email: 'runardvl@gmail.com',
      password: '1234',
    },
  })

  const onSubmit = useCallback(
    async (data: IFormData) => {
      try {
        await login(data)
        if (redirect?.current) {
          router.push(redirect.current)
        } else {
          router.push('/account')
        }
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p>
        To manage your users,{' '}
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
          login to the admin dashboard
        </Link>
        .
      </p>
      <Message className={styles.message} error={error} />
      <Input
        error={errors.email}
        label="Email Address"
        name="email"
        register={register}
        required
        type="email"
      />
      <Input
        error={errors.email}
        label="Password"
        name="password"
        register={register}
        required
        type="password"
      />
      <Button
        appearance="primary"
        className={styles.submit}
        disabled={isLoading}
        label={isLoading ? 'Processing' : 'Login'}
        type="submit"
      />
      <div>
        <Link href={`/create-account${allParams}`}>Create an account</Link>
        <br />
        <Link href={`/recover-password${allParams}`}>Recover your password</Link>
      </div>
    </form>
  )
}
