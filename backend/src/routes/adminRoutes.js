import { Router } from 'express'
import { stats, listOrders, getOrder, updateOrderStatus, listProducts } from '../controllers/adminController.js'
import { authenticateUser, requireAdmin } from '../middleware/auth.js'

const router = Router()
router.use(authenticateUser, requireAdmin)

router.get('/stats', stats)
router.get('/orders', listOrders)
router.get('/orders/:id', getOrder)
router.patch('/orders/:id/status', updateOrderStatus)
router.get('/products', listProducts)

export default router