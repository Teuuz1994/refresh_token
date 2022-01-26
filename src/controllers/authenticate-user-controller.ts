import { Request, Response } from 'express'
import { AuthenticationUser } from '../use-cases/authenticate-user'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      username,
      password
    } = request.body

    const authentitionUserService = new AuthenticationUser()

    const user = await authentitionUserService.execute({
      name,
      username,
      password
    })

    return response.json(user)
  }
}