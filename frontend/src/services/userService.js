import { api } from './api'

export const userService = {
  updateMe: (data) => api.put('/users/me', data),
}