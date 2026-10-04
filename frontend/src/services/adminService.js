import { api } from './api'

function toQueryString(params = {}) {
  const clean = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  return clean.length ? `?${new URLSearchParams(clean).toString()}` : ''
}

export const adminService = {
  getStats: () => api.get('/admin/stats'), // { totalRevenue, totalOrders, statusBreakdown, revenueByDay }
  listOrders: (params) => api.get(`/admin/orders${toQueryString(params)}`), // { data, pagination }
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  listProducts: (params) => api.get(`/admin/products${toQueryString(params)}`), // { data, pagination } — every status
}
