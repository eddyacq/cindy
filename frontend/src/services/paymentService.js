import { api } from './api'

export const paymentService = {
  initialize: (data) => api.post('/payments/initialize', data), // { addressId, deliveryMethod, items }
  verify: (reference) => api.get(`/payments/verify/${reference}`),
}