import { Router } from 'express'
import { register, login, me, logout } from '../controllers/authController.js'
import { registerRules, loginRules } from '../validators/authValidators.js'
import { validate } from '../middleware/validate.js'
import { authenticateUser } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/register', authLimiter, registerRules, validate, register)
router.post('/login', authLimiter, loginRules, validate, login)
router.post('/logout', logout)
router.get('/me', authenticateUser, me)

export default router