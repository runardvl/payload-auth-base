import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Gutter } from '../shared/ui/Gutter/Gutter'
import { HydrateClientUser } from '../features/auth'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { permissions, user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <>
      <HydrateClientUser
        permissions={{
          canAccessAdmin: permissions?.canAccessAdmin ?? false,
          globals: permissions?.globals || {},
        }}
        user={user}
      />
      <Gutter>
        <div className="home">
          <div className="content">
            {!user && <h1>Welcome to your new project.</h1>}
            {user && <h1>Welcome back, {user.email}</h1>}
            <div className="links">
              <a
                className="admin"
                href={payloadConfig.routes.admin}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to admin panel
              </a>
              <a
                className="docs"
                href="https://payloadcms.com/docs"
                rel="noopener noreferrer"
                target="_blank"
              >
                Documentation
              </a>
            </div>
          </div>
          <div className="footer">
            <p>Update this page by editing</p>
            <a className="codeLink" href={fileURL}>
              <code>app/(frontend)/page.tsx</code>
            </a>
          </div>
        </div>
      </Gutter>
    </>
  )
}
