import type { CollectionConfig } from 'payload'
import { fieldsAdmins } from './access/fields/admins'
import { adminsAndUser } from './access/collections/adminsAndUser'
import { admins } from './access/collections/admins'
import { protectRoles } from './hooks/protectRoles'
import { welcomeEmail } from './hooks/welcomeEmail'
import { checkRole } from './access/checkRole'
import { anyone } from './access/anyone'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 28800, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 15,
    verify: false,
    cookies: {
      sameSite: 'None',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
    forgotPassword: {
      generateEmailHTML: ({ token, user } = {}) => {
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token || ''}`

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Восстановление пароля</h1>
              <p>Здравствуйте, ${user.email}!</p>
              <p>Для восстановления пароля перейдите по ссылке ниже:</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
              <p>Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.</p>
            </body>
          </html>
          `
      },
    },
  },
  access: {
    read: adminsAndUser, // Пользователи видят только себя, админы - всех
    update: adminsAndUser, // Пользователи могут обновлять только себя, админы - всех
    delete: admins, // Только админы могут удалять
    create: anyone, // Только админы могут создавать пользователей
    unlock: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user), // Только админы могут заходить в админ-панель
  },
  fields: [
    // Email added by default
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'resetPasswordToken',
      type: 'text',
      hidden: true,
    },
    {
      name: 'resetPasswordExpiration',
      type: 'date',
      hidden: true,
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Пользователь', value: 'user' },
      ],
      defaultValue: 'user',
      required: false,
      label: 'Roles',
      hasMany: true,
      saveToJWT: true,
      access: {
        read: () => true, // Все могут видеть поле role
        create: () => true,
        update: fieldsAdmins,
      },
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],
  hooks: {
    afterChange: [welcomeEmail],
  },
}
