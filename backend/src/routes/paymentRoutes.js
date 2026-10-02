import { Router } from 'express'
import { initialize, verify, getOrder } from '../controllers/paymentController.js'
import { authenticateUser } from '../middleware/auth.js'

const router = Router()
router.use(authenticateUser)

router.post('/initialize', initialize)
router.get('/verify/:reference', verify)
router.get('/orders/:reference', getOrder)

export default router