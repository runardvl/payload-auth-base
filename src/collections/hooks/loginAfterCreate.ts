import type { CollectionAfterChangeHook } from 'payload'

export const loginAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  req: { body = {}, payload },
}) => {
  if (operation === 'create') {
    const email = doc.email
    const password = (body as any)?.password

    if (email && password) {
      const { token, user } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
      })

      return { ...doc, token, user }
    }
  }

  return doc
}
