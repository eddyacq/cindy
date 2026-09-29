import { Router } from 'express'
import { list, getOne, adminCreate, adminUpdate, adminRemove } from '../controllers/categoryController.js'
import { categoryRules } from '../validators/categoryValidators.js'
import { validate } from '../middleware/validate.js'
import { authenticateUser, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', list)
router.get('/:id', getOne)

router.post('/', authenticateUser, requireAdmin, categoryRules, validate, adminCreate)
router.put('/:id', authenticateUser, requireAdmin, categoryRules, validate, adminUpdate)
router.delete('/:id', authenticateUser, requireAdmin, adminRemove)

export default router