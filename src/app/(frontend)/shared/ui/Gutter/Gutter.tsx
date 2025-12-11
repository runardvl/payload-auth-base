import React from 'react'
import styles from './styles.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
  left?: boolean
  right?: boolean
}

export const Gutter = ({ children, className, left = true, right = true }: Props) => {
  return (
    <div
      className={[styles.gutter, left && styles.gutterLeft, right && styles.gutterRight, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
