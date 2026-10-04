import { api } from './api'

// turns { search: 'phone', category: 'electronics', page: 2 } into "?search=phone&category=electronics&page=2"
function toQueryString(params = {}) {
  const clean = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  return clean.length ? `?${new URLSearchParams(clean).toString()}` : ''
}

export const productService = {
  list: (params) => api.get(`/products${toQueryString(params)}`), // { data, pagination }
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
}