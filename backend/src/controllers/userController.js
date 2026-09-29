import * as User from '../models/userModel.js'
import { success } from '../utils/response.js'

export const getMe = (req, res) => success(res, User.toPublic(req.user), 'Profile retrieved successfully')

export async function updateMe(req, res) {
  const { firstName, lastName, phone } = req.body // only these three, whatever else is in the body is ignored

  const updated = await User.updateProfile(req.user.id, {
    first_name: firstName,
    last_name: lastName,
    phone: phone || null,
  })

  return success(res, User.toPublic(updated), 'Profile updated successfully')
}