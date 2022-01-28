import { sign } from 'jsonwebtoken'

import { config } from '../config/jsonwebtoken-config';

export default class GenerateTokenProvider {
  execute(userId: string) {
    const token = sign({}, config.secret, {
      subject: userId,
      expiresIn: '20s'
    })

    return token
  }
}