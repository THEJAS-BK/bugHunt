import { mockUser } from '../mock/user'
import type { User } from '../types'

export function useUserStats(): User {
  return mockUser
}
