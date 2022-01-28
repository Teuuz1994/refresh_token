import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import GenerateTokenProvider from "../../provider/generate-token-provider";
import GenerateRefreshToken from '../../provider/generate-refresh-token'
import { client } from "../../prisma/client";
import { config } from '../../config/jsonwebtoken-config'

interface HttpRequest {
  username: string
  password: string
}

export default class AuthenticationUser {
  async execute({ username, password }: HttpRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (!userAlreadyExists) {
      throw new Error('User or password is incorrect, try again')
    }

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('User or password is incorrect, try again')
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute(userAlreadyExists.id)

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

    return { token, refreshToken }
  }
}