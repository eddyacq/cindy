import { validationResult } from 'express-validator'
import { fail } from '../utils/response.js'

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()
  return fail(res, errors.array()[0].msg, 400)
}