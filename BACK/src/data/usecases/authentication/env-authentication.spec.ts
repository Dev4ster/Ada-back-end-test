/* eslint-disable @typescript-eslint/no-explicit-any */

import { Authentication } from '@domain/usecases/authentication'
import { UnauthorizedError } from '@presentation/errors'
import { Encrypter } from '@data/protocols'
import { EnvAuthentication } from './env-authentication'

interface SutTypes {
  sut: Authentication
  encrypterStub: Encrypter
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt() {
      return Promise.resolve('any_token')
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new EnvAuthentication(encrypterStub)

  return { sut, encrypterStub }
}

const makeFakeCorrectAuth = () => ({
  login: 'any_login',
  password: 'any_password'
})

jest.mock('../../../main/config/env', () => ({
  login: 'any_login',
  password: 'any_password'
}))

const makeFakeInCorrectAuth = () => ({
  login: 'any_login_incorrect',
  password: 'any_password_incorrect'
})

describe('EnvAuthentication usecase', () => {
  beforeAll(() => {
    process.env.PASSWORD = 'any_password'
    process.env.LOGIN = 'any_login'
  })
  it('should throws if login and password is incorrect', async () => {
    const { sut } = makeSut()
    const tokenHandler = await sut.auth(makeFakeInCorrectAuth())
    await expect(tokenHandler).toBeInstanceOf(UnauthorizedError)
  })

  it('should throws if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValue(Promise.reject(new Error()))
    const tokenHandler = sut.auth(makeFakeCorrectAuth())
    await expect(tokenHandler).rejects.toThrow()
  })

  it('should credentials are correctly return token value', async () => {
    const { sut } = makeSut()

    const tokenHandler = await sut.auth(makeFakeCorrectAuth())
    expect(tokenHandler).toBe('any_token')
  })

  it('should credentials are correctly return token value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypt = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeCorrectAuth())
    expect(encrypt).toBeCalledWith({ id: 'any_login' })
  })
})
