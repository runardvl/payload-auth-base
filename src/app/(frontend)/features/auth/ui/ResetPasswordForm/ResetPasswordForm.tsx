'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Button, Input, Message } from '@/app/(frontend)/shared/ui'

interface IFormData {
  password: string
  token: string
}

export const ResetPasswordForm = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IFormData>()

  const onSubmit = useCallback(
    async (data: IFormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
        {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      )

      if (response.ok) {
        const json = await response.json()

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password })

        // Redirect them to `/account` with success message in URL
        router.push('/account?success=Password reset successfully.')
      } else {
        setError('There was a problem while resetting your password. Please try again later.')
      }
    },
    [router, login],
  )

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    reset({ token: token || undefined })
  }, [reset, token])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Message className={styles.message} error={error} />
      <Input
        error={errors.password}
        label="New Password"
        name="password"
        register={register}
        required
        type="password"
      />
      <input type="hidden" {...register('token')} />
      <Button appearance="primary" className={styles.submit} label="Reset Password" type="submit" />
    </form>
  )
}
