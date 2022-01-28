import { addSeconds, getUnixTime } from 'date-fns'

import { client } from '../prisma/client'

export default class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = getUnixTime(addSeconds(new Date(), 15))

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })

    return generateRefreshToken
  }
}