import type { Permissions } from 'payload'
import type { User } from '@/payload-types'

export type TResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<User>

export type TForgotPassword = (args: { email: string }) => Promise<User>

export type TCreate = (args: {
  email: string
  firstName: string
  lastName: string
  password: string
}) => Promise<User>

export type TLogin = (args: { email: string; password: string }) => Promise<User>

export type TLogout = () => Promise<void>

export interface IAuthContext {
  create: TCreate
  forgotPassword: TForgotPassword
  login: TLogin
  logout: TLogout
  permissions?: null | Permissions
  resetPassword: TResetPassword
  setPermissions: (permissions: null | Permissions) => void
  setUser: (user: null | User) => void
  user?: null | User
}
