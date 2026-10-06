import { db } from '../config/db.js'

export const listActive = () => db('categories').where('status', 'active').orderBy('name')

export const findById = (id) => db('categories').where({ id, status: 'active' }).first()

// optional=true lets us include products only on the detail page, not the list
export async function findByIdWithProducts(id) {
  const category = await findById(id)
  if (!category) return null

  const products = await db('products')
    .where({ category_id: id, status: 'active' })
    .orderBy('created_at', 'desc')

  return { ...category, products }
}

export const toPublic = (c) => ({
  id: c.id,
  name: c.name,
  description: c.description,
  image: c.image_url,
  status: c.status,
  ...(c.product_count !== undefined && { productCount: Number(c.product_count) }),
})

export const create = async (data) => {
  const [id] = await db('categories').insert(data)
  return db('categories').where({ id }).first()
}

export const update = async (id, data) => {
  await db('categories').where({ id }).update(data)
  return db('categories').where({ id }).first()
}

export const remove = (id) => db('categories').where({ id }).del()

export const findAnyById = (id) => db('categories').where({ id }).first() // no status filter — admin can see inactive too

// admin listing — every status, with a product count so the UI can explain why delete is blocked
export const listAllAdmin = () =>
  db('categories as c')
    .leftJoin('products as p', 'p.category_id', 'c.id')
    .select('c.*')
    .count('p.id as product_count')
    .groupBy('c.id')
    .orderBy('c.name')