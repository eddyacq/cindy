import { Router } from 'express'
import { list, getOne } from '../controllers/orderController.js'
import { authenticateUser } from '../middleware/auth.js'

const router = Router()
router.use(authenticateUser)

router.get('/', list)
router.get('/:id', getOne)

export default router