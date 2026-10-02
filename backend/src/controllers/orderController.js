import * as Order from '../models/orderModel.js'
import { success, fail } from '../utils/response.js'

export async function list(req, res) {
  const orders = await Order.listForUser(req.user.id)
  const withCounts = await Promise.all(orders.map(async (o) => {
    const items = await Order.itemsForOrder(o.id)
    return { ...Order.toPublic(o), itemCount: items.reduce((s, i) => s + i.quantity, 0) }
  }))
  return success(res, withCounts, 'Orders retrieved successfully')
}

export async function getOne(req, res) {
  const id = Number(req.params.id)
  const order = Number.isInteger(id) && id > 0 ? await Order.findOwnedById(id, req.user.id) : null
  if (!order) return fail(res, 'Order not found', 404)

  const items = await Order.itemsForOrder(order.id)
  return success(res, {
    ...Order.toPublic(order),
    items: items.map(i => ({ productId: i.product_id, name: i.product_name, price: Number(i.price), quantity: i.quantity, image: i.image_url })),
  })
}