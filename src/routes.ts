import { Router } from 'express'

import AuthenticateUserController from './controllers/authenticate-user-controller'
import CreateUserController from './controllers/create-user-controller'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router.post('/user', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.get('/courses', ensureAuthenticated, (request, response) => {
  return response.json(
    [
      {
        id: 1,
        name: 'NodeJS'
      },
      {
        id: 2,
        name: 'ReactJS'
      },
      {
        id: 3,
        name: 'React Native'
      },
      {
        id: 4,
        name: 'Flutter'
      },
      {
        id: 5,
        name: 'Elixir'
      },
    ]
  )
})

export default router