import { body } from 'express-validator'

export const updateProfileRules = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('phone').optional({ values: 'falsy' }).trim().isLength({ min: 7, max: 30 })
    .withMessage('Enter a valid phone number'),
]