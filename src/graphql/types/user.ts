import { UserStatus } from './user-status';

export type User = {
  id: string
  email: string
  name: string
  role: string
  status: UserStatus
  picture: string
  created_at: Date
  updated_at: Date
}