import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

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

    const token = sign({}, config.secret, {
      subject: userAlreadyExists.id,
      expiresIn: '20s'
    })

    return { token }
  }
}