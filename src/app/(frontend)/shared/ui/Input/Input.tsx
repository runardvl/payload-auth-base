import React from 'react'
import styles from './styles.module.scss'
import { UseFormRegister, FieldValues } from 'react-hook-form'

const EMAIL_PATTERN = /\S[^\s@]*@\S+\.\S+/

interface Props {
  error: any
  label: string
  name: string
  register: UseFormRegister<any & FieldValues>
  required?: boolean
  type?: 'email' | 'number' | 'password' | 'text'
  validate?: (value: string) => boolean | string
}

export const Input = ({
  name,
  type = 'text',
  error,
  label,
  register,
  required,
  validate,
}: Props) => (
  <div className={styles.inputWrap}>
    <label className={styles.label} htmlFor="name">{`${label} ${required ? '*' : ''}`}</label>

    <input
      className={`${styles.input} ${error ? styles.error : ''}`.trim()}
      {...{ type }}
      {...register(name, {
        required,
        validate,
        ...(type === 'email'
          ? {
              pattern: {
                message: 'Please enter a valid email',
                value: EMAIL_PATTERN,
              },
            }
          : {}),
      })}
    />
    {error && (
      <div className={styles.errorMessage}>
        {!error?.message && error?.type === 'required' ? 'This field is required' : error?.message}
      </div>
    )}
  </div>
)
