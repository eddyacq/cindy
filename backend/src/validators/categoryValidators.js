import { body } from 'express-validator'

export const categoryRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').optional({ values: 'falsy' }).trim(),
  body('imageUrl').optional({ values: 'falsy' }).trim().isURL().withMessage('Image must be a valid URL'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
]