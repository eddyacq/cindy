import { db } from '../config/db.js'

export const findByEmail = (email) => db('users').where({ email }).first()
export const findById = (id) => db('users').where({ id }).first()

export const create = async (data) => {
  const [id] = await db('users').insert(data)
  return findById(id)
}

// the ONLY shape of a user that ever leaves the API (no password_hash)
export const toPublic = (u) => ({
  id: u.id,
  firstName: u.first_name,
  lastName: u.last_name,
  email: u.email,
  phone: u.phone,
  role: u.role,
})

export const updateProfile = async (id, data) => {
  await db('users').where({ id }).update(data)
  return findById(id)
}