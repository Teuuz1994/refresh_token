import { hash } from 'bcryptjs'

import { client } from '../../prisma/client'

interface HttpRequest {
  name: string
  username: string
  password: string
}

export class AuthenticationUser {
  async execute({ name, password, username }: HttpRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordEncrypted = await hash(password, 12)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordEncrypted
      }
    })

    return user
  }
}