import * as Address from '../models/addressModel.js'
import { success, fail } from '../utils/response.js'

const toRow = (b) => ({
  full_name: b.fullName,
  phone: b.phone,
  country: b.country || 'Ghana',
  region: b.region,
  city: b.city,
  area: b.area || null,
  address: b.address,
  directions: b.directions || null,
  is_default: Boolean(b.isDefault),
})

export async function list(req, res) {
  const addresses = await Address.listForUser(req.user.id)
  return success(res, addresses.map(Address.toPublic), 'Addresses retrieved successfully')
}

export async function create(req, res) {
  const address = await Address.create(req.user.id, toRow(req.body))
  return success(res, Address.toPublic(address), 'Address added successfully', 201)
}

export async function update(req, res) {
  const id = Number(req.params.id)
  const existing = await Address.findOwned(id, req.user.id)
  if (!existing) return fail(res, 'Address not found', 404)

  const updated = await Address.update(id, req.user.id, toRow(req.body))
  return success(res, Address.toPublic(updated), 'Address updated successfully')
}

export async function remove(req, res) {
  const id = Number(req.params.id)
  const deleted = await Address.remove(id, req.user.id)
  if (!deleted) return fail(res, 'Address not found', 404)
  return success(res, null, 'Address deleted successfully')
}