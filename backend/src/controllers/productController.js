import * as Product from '../models/productModel.js'
import { success, fail } from '../utils/response.js'
import { db } from '../config/db.js'

export async function list(req, res) {
  const { rows, total, page, limit } = await Product.list(req.query)
  return success(res, rows.map(Product.toPublic), 'Products retrieved successfully', 200, {
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}

export async function getOne(req, res) {
  const id = Number(req.params.id)
  const product = Number.isInteger(id) && id > 0 ? await Product.findById(id) : null
  if (!product) return fail(res, 'Product not found', 404)
  return success(res, Product.toPublic(product), 'Product retrieved successfully')
}


const toRow = (b) => ({
  name: b.name,
  description: b.description || null,
  category_id: b.categoryId,
  price: b.price,
  old_price: b.oldPrice || null,
  sku: b.sku,
  stock_quantity: b.stockQuantity,
  image_url: b.imageUrl || null,
  featured: Boolean(b.featured),
  new_arrival: Boolean(b.newArrival),
  ...(b.status && { status: b.status }),
})

export async function adminCreate(req, res) {
  const category = await db('categories').where({ id: req.body.categoryId }).first()
  if (!category) return fail(res, 'Category does not exist', 400)

  const skuTaken = await db('products').where({ sku: req.body.sku }).first()
  if (skuTaken) return fail(res, 'A product with this SKU already exists', 409)

  const product = await Product.create(toRow(req.body))
  return success(res, Product.toPublic({ ...product, category_name: category.name }), 'Product created successfully', 201)
}

export async function adminUpdate(req, res) {
  const id = Number(req.params.id)
  const existing = await Product.findAnyById(id)
  if (!existing) return fail(res, 'Product not found', 404)

  if (req.body.categoryId) {
    const category = await db('categories').where({ id: req.body.categoryId }).first()
    if (!category) return fail(res, 'Category does not exist', 400)
  }

  const updated = await Product.update(id, toRow(req.body))
  const category = await db('categories').where({ id: updated.category_id }).first()
  return success(res, Product.toPublic({ ...updated, category_name: category.name }), 'Product updated successfully')
}

export async function adminRemove(req, res) {
  const id = Number(req.params.id)
  const deleted = await Product.remove(id)
  if (!deleted) return fail(res, 'Product not found', 404)
  return success(res, null, 'Product deleted successfully')
}