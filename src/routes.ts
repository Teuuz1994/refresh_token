import { Router } from 'express'

import AuthenticateUserController from './controllers/authenticate-user-controller'
import CreateUserController from './controllers/create-user-controller'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router.post('/user', createUserController.handle)
router.post('/login', authenticateUserController.handle)

export default router