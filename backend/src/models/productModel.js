import { db } from '../config/db.js'

// whitelist: user input picks a KEY, never becomes raw SQL
const SORTS = {
  newest: ['p.created_at', 'desc'],
  price_asc: ['p.price', 'asc'],
  price_desc: ['p.price', 'desc'],
  name_asc: ['p.name', 'asc'],
}

export async function list(query) {
  const search = String(query.search || '').trim()
  const category = String(query.category || '').trim().toLowerCase()
  const page = Math.max(parseInt(query.page) || 1, 1)
  const limit = Math.min(Math.max(parseInt(query.limit) || 12, 1), 50)
  const [col, dir] = SORTS[query.sort] || SORTS.newest

  // shared filters, reused for both the count and the page of results
  const base = db('products as p')
    .join('categories as c', 'c.id', 'p.category_id')
    .where('p.status', 'active')
    .andWhere('c.status', 'active')

  if (search) {
    base.andWhere((q) =>
      q.where('p.name', 'like', `%${search}%`).orWhere('p.description', 'like', `%${search}%`)
    )
  }
  if (category) base.andWhereRaw('LOWER(c.name) = ?', [category])
  if (query.featured === 'true') base.andWhere('p.featured', true)
  if (query.new === 'true') base.andWhere('p.new_arrival', true)

  const [{ total }] = await base.clone().count({ total: '*' })

  const rows = await base
    .clone()
    .select('p.*', 'c.name as category_name')
    .orderBy(col, dir)
    .orderBy('p.id', 'desc') // tie-breaker so pages never repeat or skip items
    .limit(limit)
    .offset((page - 1) * limit)

  return { rows, total: Number(total), page, limit }
}

export async function findById(id) {
  const product = await db('products as p')
    .join('categories as c', 'c.id', 'p.category_id')
    .where('p.id', id)
    .andWhere('p.status', 'active')
    .select('p.*', 'c.name as category_name')
    .first()
  if (!product) return null

  const images = await db('product_images')
    .where({ product_id: id })
    .orderBy('sort_order')
    .pluck('image_url')

  return { ...product, images }
}

// the shape the frontend receives
export const toPublic = (p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  sku: p.sku,
  price: Number(p.price), // MySQL returns DECIMAL as a string, so convert
  oldPrice: p.old_price === null ? null : Number(p.old_price),
  stock: p.stock_quantity,
  inStock: p.stock_quantity > 0,
  image: p.image_url,
  ...(p.images && { images: p.images.length ? p.images : [p.image_url] }),
  featured: Boolean(p.featured), // tinyint 0/1 → true/false
  newArrival: Boolean(p.new_arrival),
  status: p.status,
  category: { id: p.category_id, name: p.category_name },
})

export const create = async (data) => {
  const [id] = await db('products').insert(data)
  return db('products').where({ id }).first()
}

export const update = async (id, data) => {
  await db('products').where({ id }).update(data)
  return db('products').where({ id }).first()
}

export const remove = (id) => db('products').where({ id }).del()

export const findAnyById = (id) => db('products').where({ id }).first()

// admin listing — every status, no category-active requirement
export async function listAllAdmin({ search, categoryId, status, page = 1, limit = 20 }) {
  const base = db('products as p').join('categories as c', 'c.id', 'p.category_id')

  const term = String(search || '').trim()
  if (term) {
    base.andWhere((q) =>
      q.where('p.name', 'like', `%${term}%`).orWhere('p.sku', 'like', `%${term}%`)
    )
  }
  if (categoryId) base.andWhere('p.category_id', categoryId)
  if (status) base.andWhere('p.status', status)

  const [{ total }] = await base.clone().count({ total: '*' })

  const rows = await base
    .clone()
    .select('p.*', 'c.name as category_name')
    .orderBy('p.created_at', 'desc')
    .limit(limit)
    .offset((page - 1) * limit)

  return { rows, total: Number(total), page, limit }
}