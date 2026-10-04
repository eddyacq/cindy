import { db } from '../config/db.js'

export async function createPendingOrder({ userId, items, address, deliveryFee, reference }) {
  return db.transaction(async (trx) => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const total = subtotal + deliveryFee

    const [orderId] = await trx('orders').insert({
      user_id: userId,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      payment_status: 'pending',
      payment_reference: reference,
      delivery_address: JSON.stringify(address),
    })

    await trx('order_items').insert(
      items.map((i) => ({
        order_id: orderId,
        product_id: i.productId,
        product_name: i.name,
        price: i.price,
        quantity: i.quantity,
      }))
    )

    return trx('orders').where({ id: orderId }).first()
  })
}

export const findByReference = (reference) => db('orders').where({ payment_reference: reference }).first()

export const findOwnedByReference = (reference, userId) =>
  db('orders').where({ payment_reference: reference, user_id: userId }).first()

export async function markPaid(reference, channel) {
  await db('orders').where({ payment_reference: reference }).update({ payment_status: 'paid', payment_channel: channel })
  return findByReference(reference)
}

export const markFailed = (reference) =>
  db('orders').where({ payment_reference: reference }).update({ payment_status: 'failed' })

export const listForUser = (userId) => db('orders').where({ user_id: userId }).orderBy('created_at', 'desc')
export const findOwnedById = (id, userId) => db('orders').where({ id, user_id: userId }).first()

export const itemsForOrder = (orderId) =>
  db('order_items as oi')
    .join('products as p', 'p.id', 'oi.product_id')
    .where('oi.order_id', orderId)
    .select('oi.*', 'p.image_url')

export const toPublic = (o) => ({
  id: o.id,
  reference: o.payment_reference,
  subtotal: Number(o.subtotal),
  deliveryFee: Number(o.delivery_fee),
  total: Number(o.total),
  paymentStatus: o.payment_status,
  paymentChannel: o.payment_channel,
  address: typeof o.delivery_address === 'string' ? JSON.parse(o.delivery_address) : o.delivery_address,
  createdAt: o.created_at,
})

export const STATUS_ORDER = ['order_placed', 'payment_confirmed', 'preparing', 'shipped', 'out_for_delivery', 'delivered']

export async function listAllAdmin({ status, page = 1, limit = 20 }) {
  const base = db('orders as o').join('users as u', 'u.id', 'o.user_id')
  if (status) base.andWhere('o.delivery_status', status)

  const [{ total }] = await base.clone().count({ total: '*' })
  const rows = await base.clone()
    .select('o.*', 'u.first_name', 'u.last_name', 'u.email')
    .orderBy('o.created_at', 'desc')
    .limit(limit)
    .offset((page - 1) * limit)

  return { rows, total: Number(total), page, limit }
}

export const findAnyById = (id) =>
  db('orders as o').join('users as u', 'u.id', 'o.user_id').where('o.id', id)
    .select('o.*', 'u.first_name', 'u.last_name', 'u.email').first()

export async function updateDeliveryStatus(id, status) {
  await db('orders').where({ id }).update({ delivery_status: status })
  return db('orders').where({ id }).first()
}

export async function getStats() {
  const [{ totalRevenue }] = await db('orders').where('payment_status', 'paid').sum({ totalRevenue: 'total' })
  const [{ totalOrders }] = await db('orders').count({ totalOrders: '*' })

  const statusBreakdown = await db('orders').select('delivery_status').count({ count: '*' }).groupBy('delivery_status')

  const revenueByDay = await db('orders')
    .where('payment_status', 'paid')
    .andWhere('created_at', '>=', db.raw("DATE_SUB(CURDATE(), INTERVAL 6 DAY)"))
    .select(db.raw('DATE(created_at) as day'))
    .sum({ revenue: 'total' })
    .groupBy('day')
    .orderBy('day')

  return {
    totalRevenue: Number(totalRevenue) || 0,
    totalOrders: Number(totalOrders),
    statusBreakdown: statusBreakdown.map(s => ({ status: s.delivery_status, count: Number(s.count) })),
    revenueByDay: revenueByDay.map(r => ({ day: r.day, revenue: Number(r.revenue) })),
  }
}
