import crypto from 'crypto'
import { db } from '../config/db.js'
import * as Order from '../models/orderModel.js'
import { verifyPaystackTransaction } from '../config/paystack.js'
import { success, fail } from '../utils/response.js'

const DELIVERY_FEES = { standard: 30, express: 60 }

export async function initialize(req, res) {
  const { addressId, deliveryMethod, items } = req.body

  if (!Array.isArray(items) || items.length === 0) return fail(res, 'Cart is empty', 400)
  if (!DELIVERY_FEES[deliveryMethod]) return fail(res, 'Invalid delivery method', 400)

  const address = await db('addresses').where({ id: addressId, user_id: req.user.id }).first()
  if (!address) return fail(res, 'Address not found', 404)

  // recompute name/price from the database — a tampered client payload can't change what's actually charged
  const resolvedItems = []
  for (const item of items) {
    const product = await db('products').where({ id: item.productId, status: 'active' }).first()
    if (!product) return fail(res, `A product in your cart is no longer available`, 400)
    const quantity = Math.max(1, parseInt(item.quantity) || 1)
    resolvedItems.push({ productId: product.id, name: product.name, price: Number(product.price), quantity })
  }

  const deliveryFee = DELIVERY_FEES[deliveryMethod]
  const reference = `SH-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`

  const order = await Order.createPendingOrder({
    userId: req.user.id,
    items: resolvedItems,
    address: {
      fullName: address.full_name, phone: address.phone, region: address.region,
      city: address.city, area: address.area, address: address.address, directions: address.directions,
    },
    deliveryFee,
    reference,
  })

  return success(res, {
    reference,
    amount: Number(order.total), // in GHS — the frontend converts to pesewas for Paystack
    email: req.user.email,
  }, 'Order created, ready for payment', 201)
}

export async function verify(req, res) {
  const { reference } = req.params

  const order = await Order.findOwnedByReference(reference, req.user.id)
  if (!order) return fail(res, 'Order not found', 404)

  if (order.payment_status === 'paid') {
    return success(res, Order.toPublic(order), 'Payment already verified')
  }

  let paystackData
  try {
    paystackData = await verifyPaystackTransaction(reference)
  } catch (err) {
    return fail(res, err.message, 502)
  }

  const amountMatches = paystackData.amount === Math.round(Number(order.total) * 100)
  if (paystackData.status === 'success' && amountMatches) {
    const updated = await Order.markPaid(reference, paystackData.channel)
    return success(res, Order.toPublic(updated), 'Payment verified successfully')
  }

  await Order.markFailed(reference)
  return fail(res, 'Payment could not be verified', 400)
}

export async function getOrder(req, res) {
  const order = await Order.findOwnedByReference(req.params.reference, req.user.id)
  if (!order) return fail(res, 'Order not found', 404)
  const items = await Order.itemsForOrder(order.id)
  return success(res, {
    ...Order.toPublic(order),
    items: items.map(i => ({ productId: i.product_id, name: i.product_name, price: Number(i.price), quantity: i.quantity })),
  })
}