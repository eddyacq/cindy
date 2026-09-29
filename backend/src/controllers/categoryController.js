import * as Category from '../models/categoryModel.js'
import { toPublic as toPublicProduct } from '../models/productModel.js'
import { success, fail } from '../utils/response.js'
import { db } from '../config/db.js'

export async function list(req, res) {
  const categories = await Category.listActive()
  return success(res, categories.map(Category.toPublic), 'Categories retrieved successfully')
}

export async function getOne(req, res) {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) return fail(res, 'Category not found', 404)

  // ?withProducts=true lets the frontend load a category page in one request
  const includeProducts = req.query.withProducts === 'true'
  const category = includeProducts
    ? await Category.findByIdWithProducts(id)
    : await Category.findById(id)

  if (!category) return fail(res, 'Category not found', 404)

  const data = Category.toPublic(category)
  if (includeProducts) data.products = category.products.map(toPublicProduct)
  return success(res, data, 'Category retrieved successfully')
}


const toRow = (b) => ({
  name: b.name,
  description: b.description || null,
  image_url: b.imageUrl || null,
  ...(b.status && { status: b.status }),
})

export async function adminCreate(req, res) {
  const existing = await db('categories').where({ name: req.body.name }).first()
  if (existing) return fail(res, 'A category with this name already exists', 409)

  const category = await Category.create(toRow(req.body))
  return success(res, Category.toPublic(category), 'Category created successfully', 201)
}

export async function adminUpdate(req, res) {
  const id = Number(req.params.id)
  const existing = await Category.findAnyById(id)
  if (!existing) return fail(res, 'Category not found', 404)

  const updated = await Category.update(id, toRow(req.body))
  return success(res, Category.toPublic(updated), 'Category updated successfully')
}

export async function adminRemove(req, res) {
  const id = Number(req.params.id)
  const inUse = await db('products').where({ category_id: id }).first()
  if (inUse) return fail(res, 'Cannot delete a category that still has products', 409)

  const deleted = await Category.remove(id)
  if (!deleted) return fail(res, 'Category not found', 404)
  return success(res, null, 'Category deleted successfully')
}