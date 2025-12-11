'use client'

import { useCallback, useState } from 'react'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Button, Input, Message } from '@/app/(frontend)/shared/ui'

interface IFormData {
  email: string
}

export const RecoverPasswordForm = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IFormData>()

  const onSubmit = useCallback(async (data: IFormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <>
      {!success && (
        <>
          <h1>Recover Password</h1>
          <div className={styles.formWrapper}>
            <p>
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage all of your users, `}
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
                login to the admin dashboard
              </Link>
              .
            </p>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Message className={styles.message} error={error} />
              <Input
                error={errors.email}
                label="Email Address"
                name="email"
                register={register}
                required
                type="email"
              />
              <Button
                appearance="primary"
                className={styles.submit}
                label="Recover Password"
                type="submit"
              />
            </form>
          </div>
        </>
      )}
      {success && (
        <>
          <h1>Request submitted</h1>
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </>
      )}
    </>
  )
}
