import React, { ElementType } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

interface Props {
  appearance?: 'default' | 'primary' | 'secondary'
  className?: string
  disabled?: boolean
  el?: 'a' | 'button' | 'link'
  href?: string
  invert?: boolean
  label?: string
  newTab?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const Button = ({
  type = 'button',
  appearance,
  className: classNameFromProps,
  disabled,
  el: elFromProps = 'link',
  href,
  invert,
  label,
  newTab,
  onClick,
}: Props) => {
  let el = elFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const className = [
    styles.button,
    classNameFromProps,
    styles[`appearance--${appearance}`],
    invert && styles[`${appearance}--invert`],
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className={styles.content}>
      <span className={styles.label}>{label}</span>
    </div>
  )

  if (onClick || type === 'submit') {
    el = 'button'
  }

  if (el === 'link') {
    return (
      <Link className={className} href={href || ''} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      className={className}
      href={href}
      type={type}
      {...newTabProps}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </Element>
  )
}
