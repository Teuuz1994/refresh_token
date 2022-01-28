import { Request, Response } from 'express'

import RefreshTokenUser from '../use-cases/refresh-token-user'

export default class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refreshToken } = request.body

    const refreshTokenUser = new RefreshTokenUser()
    const token = await refreshTokenUser.execute(refreshToken)

    return response.json(token)
  }
}