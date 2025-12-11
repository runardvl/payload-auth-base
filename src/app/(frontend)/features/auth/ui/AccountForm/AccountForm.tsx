'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../providers/AuthProvider'

import styles from './styles.module.scss'
import { Button, Input, Message } from '@/app/(frontend)/shared/ui'

interface IFormData {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

export const AccountForm = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const router = useRouter()

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<IFormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: IFormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updatind your account')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(`/login?unauthorized=account`)
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Message className={styles.message} error={error} success={success} />
      {!changePassword ? (
        <>
          <p>
            {'To change password, '}
            <button
              className={styles.changePassword}
              onClick={() => setChangePassword(!changePassword)}
            >
              click here
            </button>
          </p>
          <Input
            error={errors.email}
            label="Email Address"
            name="email"
            register={register}
            required
            type="email"
          />
        </>
      ) : (
        <>
          <p>
            {'Change your password below, or '}
            <button
              className={styles.changePassword}
              onClick={() => setChangePassword(!changePassword)}
              type="button"
            >
              cancel
            </button>
            .
          </p>
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
            validate={(value) => value === password.current || 'The password do not match'}
          />
        </>
      )}
      <Button
        appearance="primary"
        className={styles.submit}
        label={isLoading ? 'Processing' : changePassword ? 'Change password' : 'Update account'}
        type="submit"
      />
    </form>
  )
}
