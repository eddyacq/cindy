import { body } from 'express-validator'

export const registerRules = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').trim().toLowerCase().isEmail().withMessage('Enter a valid email'),
  body('phone').optional({ values: 'falsy' }).trim().isLength({ min: 7, max: 30 })
    .withMessage('Enter a valid phone number'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('confirmPassword').optional()
    .custom((v, { req }) => v === req.body.password).withMessage('Passwords do not match'),
]

export const loginRules = [
  body('email').trim().toLowerCase().isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
]