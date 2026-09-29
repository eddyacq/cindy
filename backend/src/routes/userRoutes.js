import { Router } from 'express'
import { getMe, updateMe } from '../controllers/userController.js'
import { updateProfileRules } from '../validators/userValidators.js'
import { validate } from '../middleware/validate.js'
import { authenticateUser } from '../middleware/auth.js'

const router = Router()

router.use(authenticateUser)

router.get('/me', getMe)
router.put('/me', updateProfileRules, validate, updateMe)

export default router