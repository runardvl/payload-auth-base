import React from 'react'
import styles from './styles.module.scss'

interface Props {
  className?: string
  error?: React.ReactNode
  message?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
}

export const Message = ({ className, error, message, success, warning }: Props) => {
  const messageToRender = message || error || success || warning

  if (messageToRender) {
    return (
      <div
        className={[
          styles.message,
          className,
          error && styles.error,
          success && styles.success,
          warning && styles.warning,
          !error && !success && !warning && styles.default,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {messageToRender}
      </div>
    )
  }
  return null
}
