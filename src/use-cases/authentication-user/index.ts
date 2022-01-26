import { compare } from "bcryptjs";
import { client } from "../../prisma/client";

interface HttpRequest {
  username: string
  password: string
}

export default class AuthenticationUser {
  async handle({ username, password }: HttpRequest) {
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
  }
}