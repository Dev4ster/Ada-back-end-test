import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token')
  },
  async verify(): Promise<string> {
    return Promise.resolve('any_data')
  }
}))
describe('JWT Adapter', () => {
  test('should call sign with correct values ', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ id: 'any_id' })
    expect(signSpy).toHaveBeenCalledWith(
      {
        id: 'any_id'
      },
      'secret',
      { expiresIn: '1d' }
    )
  })

  test('should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')

    const token = await sut.encrypt({ id: 'any_id' })
    expect(token).toBe('any_token')
  })

  test('should throw if sign throw', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const promise = sut.encrypt({ id: 'any_id' })
    await expect(promise).rejects.toThrow()
  })

  test('should return a data on verify success', async () => {
    const sut = new JwtAdapter('secret')

    const decriptToken = await sut.decrypt('any_token')
    expect(decriptToken).toBe('any_data')
  })

  test('should throw if verify throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const promise = sut.decrypt('any_token')
    await expect(promise).rejects.toThrow()
  })
})
