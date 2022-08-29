import { MissingParamError, UnauthorizedError } from '@presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@presentation/helpers'
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Controller
} from './login-protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { login, senha } = httpRequest.body
    if (!login) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('login')))
      )
    }
    if (!senha) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }

    try {
      const token = await this.authentication.auth({
        password: senha,
        login
      })
      if (token instanceof UnauthorizedError) {
        return unauthorized()
      }

      return new Promise((resolve) => resolve(ok(token)))
    } catch (error) {
      return serverError(new Error())
    }
  }
}
