import { Decrypter } from '@data/protocols/cryptography/dencrypter'
import { AccessDeniedError } from '@presentation/errors/access-denied-error'
import {
  forbidden,
  ok,
  serverError
} from '@presentation/helpers/http/http-helper'
import { JsonWebTokenError } from 'jsonwebtoken'
import {
  Middleware,
  HttpResponse,
  HttpRequest
} from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor(private readonly decryptToken: Decrypter) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const header = httpRequest?.headers?.['authorization']
      if (header) {
        const [, token] = header.split(' ')
        if (token) {
          const auth = await this.decryptToken.decrypt(token)
          if (auth) {
            return ok(auth)
          }
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error: unknown) {
      if (error instanceof JsonWebTokenError) {
        return forbidden(new AccessDeniedError())
      }
      return serverError(error as Error)
    }
  }
}
