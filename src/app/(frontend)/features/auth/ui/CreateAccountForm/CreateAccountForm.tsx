'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../providers/AuthProvider'
import styles from './styles.module.scss'
import { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Button, Input, Message } from '@/app/(frontend)/shared/ui'

interface IFormData {
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName?: string
}

export const CreateAccountForm = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<IFormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: IFormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push(`/account?success=${encodeURIComponent('Account created successfully.')}`)
        }
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p>
        {`This is where new customers can signup and create a new account. To manage all users, `}
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
          login to the admin dashboard
        </Link>
        .
      </p>
      <Message className={styles.message} error={error} />
      <Input
        error={errors.firstName}
        label="First Name"
        name="firstName"
        register={register}
        required
        type="text"
      />
      <Input
        error={errors.email}
        label="Email Address"
        name="email"
        register={register}
        required
        type="email"
      />
      <Input
        error={errors.password}
        label="Password"
        name="password"
        register={register}
        required
        type="password"
      />
      <Input
        error={errors.passwordConfirm}
        label="Confirm Password"
        name="passwordConfirm"
        register={register}
        required
        type="password"
        validate={(value) => value === password.current || 'The passwords do not match'}
      />
      <Button
        appearance="primary"
        className={styles.submit}
        label={loading ? 'Processing' : 'Create Account'}
        type="submit"
      />
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div>
    </form>
  )
}
