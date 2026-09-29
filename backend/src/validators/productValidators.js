import { body } from 'express-validator'

export const productRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').optional({ values: 'falsy' }).trim(),
  body('categoryId').isInt({ min: 1 }).withMessage('A valid category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('oldPrice').optional({ values: 'falsy' }).isFloat({ min: 0 }).withMessage('Old price must be a positive number'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('stockQuantity').isInt({ min: 0 }).withMessage('Stock must be zero or more'),
  body('imageUrl').optional({ values: 'falsy' }).trim().isURL().withMessage('Image must be a valid URL'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  body('featured').optional().isBoolean(),
  body('newArrival').optional().isBoolean(),
]