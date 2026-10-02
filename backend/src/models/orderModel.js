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


