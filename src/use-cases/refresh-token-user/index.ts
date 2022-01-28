import { isAfter } from 'date-fns'

import { client } from '../../prisma/client'
import GenerateRefreshTokenUser from '../../provider/generate-refresh-token'
import GenerateTokenProvider from '../../provider/generate-token-provider'

export default class RefreshTokenUser {
  async execute(refreshToken: string) {
    const findRefreshToken = await client.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    })

    if (!findRefreshToken) {
      throw new Error('Refresh token invalid')
    }

    const refreshTokenExpired = isAfter(new Date(), findRefreshToken.expiresIn)

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute(findRefreshToken.userId)

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: findRefreshToken.userId
        }
      })

      const generateRefreshTokenProvider = new GenerateRefreshTokenUser()
      const refreshToken = await generateRefreshTokenProvider.execute(findRefreshToken.userId)

      return { token, refreshToken }
    }


    return { token }
  }
}