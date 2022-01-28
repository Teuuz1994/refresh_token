import { Request, Response } from "express"

import AuthenticateUserService from '../use-cases/authentication-user'

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const {
      username,
      password
    } = request.body

    const authenticateUser = new AuthenticateUserService()

    const token = await authenticateUser.execute({
      username,
      password
    })

    response.json(token)
  }
}