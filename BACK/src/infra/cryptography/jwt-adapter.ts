/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { Decrypter, Encrypter } from '@data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(data: any): Promise<string> {
    const result = jwt.sign(data, this.secret, {
      expiresIn: '1d'
    })
    return new Promise((resolve) => resolve(result))
  }

  async decrypt(value: string): Promise<any> {
    const result = jwt.verify(value, this.secret)
    return new Promise((resolve) => resolve(result))
  }
}
