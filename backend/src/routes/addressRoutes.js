import { Router } from 'express'
import { list, create, update, remove } from '../controllers/addressController.js'
import { addressRules } from '../validators/addressValidators.js'
import { validate } from '../middleware/validate.js'
import { authenticateUser } from '../middleware/auth.js'

const router = Router()

router.use(authenticateUser) // every route below requires login

router.get('/', list)
router.post('/', addressRules, validate, create)
router.put('/:id', addressRules, validate, update)
router.delete('/:id', remove)

export default router