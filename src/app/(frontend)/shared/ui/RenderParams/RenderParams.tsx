'use client'

import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { Message } from '../Message/Message'
import styles from './styles.module.scss'

interface Props {
  className?: string
  message?: string
  params?: string[]
  maxLength?: number
}

const DEFAULT_PARAMS = ['error', 'message', 'success']

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value
  return value.slice(0, maxLength - 1) + '...'
}

export const RenderParams = ({
  className,
  message,
  params = DEFAULT_PARAMS,
  maxLength = 200,
}: Props) => {
  const searchParams = useSearchParams()

  const paramEntries = useMemo(() => {
    if (!searchParams) return []

    const seen = new Set<string>()
    const list: { name: string; value: string }[] = []

    params.forEach((name) => {
      const val = searchParams.get(name)
      if (!val) return
      const trimmed = val.trim()
      const key = `${name}:${trimmed}`
      if (seen.has(key)) return
      seen.add(key)
      list.push({ name, value: trimmed })
    })
    return list
  }, [searchParams, params])

  if (!paramEntries.length) return null

  return (
    <div className={className} role="status" aria-live="polite" aria-atomic="false">
      {paramEntries.map(({ name, value }, idx) => {
        const rendered = message ? message.replace('PARAM', value) : value
        const safe = truncate(rendered, maxLength)

        const props: {
          error?: React.ReactNode
          success?: React.ReactNode
          warning?: React.ReactNode
          message?: React.ReactNode
        } = {}

        if (name.toLowerCase() === 'error') {
          props.error = safe
        } else if (name.toLowerCase() === 'success') {
          props.success = safe
        } else if (name.toLowerCase() === 'warning') {
          props.warning = safe
        } else {
          props.message = safe
        }

        return <Message key={`${name}-${idx}`} className={styles.paramMessage} {...props} />
      })}
    </div>
  )
}
