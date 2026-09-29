import bcrypt from 'bcryptjs'
import * as User from '../models/userModel.js'
import { signToken, setAuthCookie, clearAuthCookie } from '../utils/token.js'
import { success, fail } from '../utils/response.js'

export async function register(req, res) {
  const { firstName, lastName, email, phone, password } = req.body

  if (await User.findByEmail(email)) return fail(res, 'Email is already registered', 409)

  // role is never read from req.body, so the DB default ('customer') always applies
  const user = await User.create({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    password_hash: await bcrypt.hash(password, 10),
  })

  setAuthCookie(res, signToken(user))
  return success(res, User.toPublic(user), 'Account created successfully', 201)
}

export async function login(req, res) {
  const { email, password } = req.body
  const user = await User.findByEmail(email)

  // same message for "no such email" and "wrong password" so attackers can't probe which emails exist
  const valid = user && (await bcrypt.compare(password, user.password_hash))
  if (!valid) return fail(res, 'Invalid email or password', 401)
  if (user.status !== 'active') return fail(res, 'This account is suspended', 403)

  setAuthCookie(res, signToken(user))
  return success(res, User.toPublic(user), 'Logged in successfully')
}

export const me = (req, res) =>
  success(res, User.toPublic(req.user), 'Current user retrieved')

export function logout(req, res) {
  clearAuthCookie(res)
  return success(res, null, 'Logged out successfully')
}