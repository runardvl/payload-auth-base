import type { User } from '@/payload-types'
import { checkRole } from '../checkRole'
import { FieldAccess } from 'payload'

export const fieldsAdmins: FieldAccess = ({ req: { user } }) => checkRole(['admin'], user)
