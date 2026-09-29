import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const AUTH_COOKIE = 'token'

const cookieOptions = { httpOnly: true, sameSite: 'lax', secure: env.isProd }

// only the id goes in the token; we reload the user from the DB on each request
export const signToken = (user) =>
  jwt.sign({ id: user.id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })

export const setAuthCookie = (res, token) =>
  res.cookie(AUTH_COOKIE, token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })

export const clearAuthCookie = (res) => res.clearCookie(AUTH_COOKIE, cookieOptions)