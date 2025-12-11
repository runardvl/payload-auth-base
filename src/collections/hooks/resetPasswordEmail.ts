import type {} from 'payload'
export const resetPasswordEmail = (args: { token?: string; user?: any }) => {
  const { token, user } = args || {}
  return `
      <h1>Восстановление пароля</h1>
      <p>Для восстановления пароля перейдите по ссылке:</p>
      <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}">
        ${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}
      </a>
      <p>Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.</p>
    `
}
