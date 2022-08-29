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
    const { login, password } = httpRequest.body
    if (!login) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('login')))
      )
    }
    if (!password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }

    try {
      const token = await this.authentication.auth({
        password,
        login
      })
      if (token instanceof UnauthorizedError) {
        return unauthorized()
      }

      return new Promise((resolve) => resolve(ok({ accessToken: token })))
    } catch (error) {
      console.log('login', error)
      return serverError(new Error())
    }
  }
}
