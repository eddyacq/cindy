import { env } from './env.js'

const BASE_URL = 'https://api.paystack.co'

export async function verifyPaystackTransaction(reference) {
  const res = await fetch(`${BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${env.paystackSecretKey}` },
  })
  const body = await res.json()
  if (!res.ok || !body.status) {
    throw new Error(body.message || 'Unable to verify transaction with Paystack')
  }
  return body.data // { status, amount, currency, channel, reference, ... }
}