import { Authentication } from './login-protocols'
import { MissingParamError, UnauthorizedError } from '@presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@presentation/helpers'
import { LoginController } from './login'

interface SutType {
  sut: LoginController
  authenticationStub: Authentication
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(): Promise<string> {
      return 'token_valid'
    }
  }

  return new AuthenticationStub()
}

const makeSut = (): SutType => {
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(authenticationStub)
  return { sut, authenticationStub }
}

describe('LoginController', () => {
  it('should return 400 if no login is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        senha: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('login')))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        login: 'any_login'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('Should return 401 if invalid credentials are provided ', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.resolve(new UnauthorizedError()))
    const httpRequest = {
      body: {
        login: 'any_email@mail.com',
        senha: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        login: 'any_login',
        senha: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        login: 'any_login',
        senha: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok('token_valid'))
  })
})
