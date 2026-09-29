import { api } from './api'

export const categoryService = {
  list: () => api.get('/categories'),
  getById: (id, withProducts = false) => api.get(`/categories/${id}${withProducts ? '?withProducts=true' : ''}`),
}