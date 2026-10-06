// Single source of truth for the 6-stage delivery pipeline, shared between
// the admin orders/dashboard pages and the customer-facing order/tracking pages.
export const DELIVERY_STATUS_ORDER = [
  'order_placed',
  'payment_confirmed',
  'preparing',
  'shipped',
  'out_for_delivery',
  'delivered',
]

export const DELIVERY_STATUS_LABELS = {
  order_placed: 'Order Placed',
  payment_confirmed: 'Payment Confirmed',
  preparing: 'Preparing Order',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
}

export const DELIVERY_STATUS_COLORS = {
  order_placed: '#94a3b8',
  payment_confirmed: '#36abf6',
  preparing: '#ff9a37',
  shipped: '#0c8ee7',
  out_for_delivery: '#f06006',
  delivered: '#16a34a',
}
