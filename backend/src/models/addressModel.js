import { db } from '../config/db.js'

export const listForUser = (userId) =>
  db('addresses').where({ user_id: userId }).orderBy('is_default', 'desc').orderBy('id', 'desc')

// scoped to userId — this is what stops one customer reading another's address
export const findOwned = (id, userId) => db('addresses').where({ id, user_id: userId }).first()

export async function create(userId, data) {
  return db.transaction(async (trx) => {
    if (data.is_default) await trx('addresses').where({ user_id: userId }).update({ is_default: false })
    const [id] = await trx('addresses').insert({ ...data, user_id: userId })
    return trx('addresses').where({ id }).first()
  })
}

export async function update(id, userId, data) {
  return db.transaction(async (trx) => {
    if (data.is_default) await trx('addresses').where({ user_id: userId }).update({ is_default: false })
    await trx('addresses').where({ id, user_id: userId }).update(data)
    return trx('addresses').where({ id, user_id: userId }).first()
  })
}

export const remove = (id, userId) => db('addresses').where({ id, user_id: userId }).del()

export const toPublic = (a) => ({
  id: a.id,
  fullName: a.full_name,
  phone: a.phone,
  country: a.country,
  region: a.region,
  city: a.city,
  area: a.area,
  address: a.address,
  directions: a.directions,
  isDefault: Boolean(a.is_default),
})