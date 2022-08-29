import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from './auth-middleware-protocols'
import { Decrypter } from '@data/protocols/cryptography/dencrypter'
import { AccessDeniedError } from '@presentation/errors'
import {
  forbidden,
  ok,
  serverError
} from '@presentation/helpers/http/http-helper'

const makeHttpRequest = (): HttpRequest => ({
  headers: {
    authorization: 'bearer any_token'
  }
})
const makeDecryptStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt() {
      return Promise.resolve({ ok: true })
    }
  }

  return new DecrypterStub()
}

interface SutTypes {
  sut: AuthMiddleware
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecryptStub()
  const sut = new AuthMiddleware(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}

describe('Auth Middleware', () => {
  test('should return 403 if no Authorization existis in headers', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call Decrypt with correct accessToken', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.handle(makeHttpRequest())
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return 403 if Decrypt returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if Decrypt returns an auth', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({ ok: true }))
  })

  test('should return 500 if Decrypt throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
