import * as Order from '../models/orderModel.js'
import { success, fail } from '../utils/response.js'

export async function stats(req, res) {
  return success(res, await Order.getStats(), 'Stats retrieved successfully')
}

export async function listOrders(req, res) {
  const { status, page, limit } = req.query
  const { rows, total, page: p, limit: l } = await Order.listAllAdmin({
    status: status || undefined,
    page: Number(page) || 1,
    limit: Number(limit) || 20,
  })

  const data = await Promise.all(rows.map(async (o) => {
    const items = await Order.itemsForOrder(o.id)
    return {
      ...Order.toPublic(o),
      deliveryStatus: o.delivery_status,
      customer: { firstName: o.first_name, lastName: o.last_name, email: o.email },
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
    }
  }))

  return success(res, data, 'Orders retrieved successfully', 200, {
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) },
  })
}

export async function getOrder(req, res) {
  const order = await Order.findAnyById(Number(req.params.id))
  if (!order) return fail(res, 'Order not found', 404)

  const items = await Order.itemsForOrder(order.id)
  return success(res, {
    ...Order.toPublic(order),
    deliveryStatus: order.delivery_status,
    customer: { firstName: order.first_name, lastName: order.last_name, email: order.email },
    items: items.map(i => ({ productId: i.product_id, name: i.product_name, price: Number(i.price), quantity: i.quantity, image: i.image_url })),
  })
}

export async function updateOrderStatus(req, res) {
  const id = Number(req.params.id)
  const { status } = req.body
  if (!Order.STATUS_ORDER.includes(status)) return fail(res, 'Invalid status', 400)

  const order = await Order.findAnyById(id)
  if (!order) return fail(res, 'Order not found', 404)
  if (order.payment_status !== 'paid') return fail(res, 'Cannot update delivery status before payment is confirmed', 400)

  const updated = await Order.updateDeliveryStatus(id, status)
  return success(res, { ...Order.toPublic(updated), deliveryStatus: updated.delivery_status }, 'Order status updated')
}