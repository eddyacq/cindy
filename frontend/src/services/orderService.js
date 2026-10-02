import { api } from './api'

export const orderService = {
  list: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
}