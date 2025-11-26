import type { CollectionConfig } from 'payload'
import { fieldsAdmins } from './access/fields/admins'
import { adminsAndUser } from './access/collections/adminsAndUser'
import { admins } from './access/collections/admins'
import { protectRoles } from './hooks/protectRoles'
import { welcomeEmail } from './hooks/welcomeEmail'
import { checkRole } from './access/checkRole'

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
  },
  access: {
    read: adminsAndUser, // Пользователи видят только себя, админы - всех
    update: adminsAndUser, // Пользователи могут обновлять только себя, админы - всех
    delete: admins, // Только админы могут удалять
    create: admins, // Только админы могут создавать пользователей
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
      required: true,
      label: 'Роли',
      hasMany: true,
      saveToJWT: true,
      access: {
        read: () => true, // Все могут видеть поле role
        create: fieldsAdmins,
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
