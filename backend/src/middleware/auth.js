import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AUTH_COOKIE } from '../utils/token.js'
import * as User from '../models/userModel.js'
import { fail } from '../utils/response.js'

export async function authenticateUser(req, res, next) {
  const token = req.cookies?.[AUTH_COOKIE]
  if (!token) return fail(res, 'Please log in to continue', 401)

  let payload
  try {
    payload = jwt.verify(token, env.jwtSecret)
  } catch {
    return fail(res, 'Session expired, please log in again', 401)
  }

  // reload from the DB so a deleted/suspended user is blocked immediately
  const user = await User.findById(payload.id)
  if (!user || user.status !== 'active') return fail(res, 'Please log in to continue', 401)

  req.user = user
  next()
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return fail(res, 'Admin access required', 403)
  next()
}