import { Router } from 'express'
import { list, getOne, adminCreate, adminUpdate, adminRemove } from '../controllers/productController.js'
import { productRules } from '../validators/productValidators.js'
import { validate } from '../middleware/validate.js'
import { authenticateUser, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', list)
router.get('/:id', getOne)

router.post('/', authenticateUser, requireAdmin, productRules, validate, adminCreate)
router.put('/:id', authenticateUser, requireAdmin, productRules, validate, adminUpdate)
router.delete('/:id', authenticateUser, requireAdmin, adminRemove)

export default router