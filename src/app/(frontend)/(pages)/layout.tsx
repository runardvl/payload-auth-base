import React from 'react'
import { Header } from '../widgets'
import { AuthProvider } from '../features/auth'
import '../shared/styles/app.scss'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template Auth',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <AuthProvider api="rest">
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
