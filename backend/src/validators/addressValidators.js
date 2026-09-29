import { body } from 'express-validator'

export const addressRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('phone').trim().isLength({ min: 7, max: 30 }).withMessage('Enter a valid phone number'),
  body('region').trim().notEmpty().withMessage('Region is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('area').optional({ values: 'falsy' }).trim(),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('directions').optional({ values: 'falsy' }).trim(),
  body('country').optional({ values: 'falsy' }).trim(),
  body('isDefault').optional().isBoolean().withMessage('isDefault must be true or false'),
]