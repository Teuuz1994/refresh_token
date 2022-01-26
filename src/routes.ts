import { Router } from 'express'

import CreateUserController from './controllers/create-user-controller'

const router = Router()

const createUser = new CreateUserController()

router.post('/user', createUser.handle)

export default router