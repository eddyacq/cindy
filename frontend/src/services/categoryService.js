import { api } from './api'

export const categoryService = {
  list: () => api.get('/categories'),
  getById: (id, withProducts = false) => api.get(`/categories/${id}${withProducts ? '?withProducts=true' : ''}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  remove: (id) => api.delete(`/categories/${id}`),
}