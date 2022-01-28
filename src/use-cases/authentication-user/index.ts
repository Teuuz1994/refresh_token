import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import { client } from "../../prisma/client";

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

    const token = sign({}, 'c0718872-f15a-4deb-bc30-a445d795dadb', {
      subject: userAlreadyExists.id,
      expiresIn: '20s'
    })

    return { token }
  }
}