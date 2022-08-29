/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddCardSqliteRepository } from './add-card-sqlite-repository'

const makeSut = () => {
  const sut = new AddCardSqliteRepository()

  return sut
}

let hasErrorMock: Error | undefined = undefined

jest.mock('../helpers/sqlite-helper', () => ({
  db: {
    run: (_: any, __: any, callback: (error?: Error) => void) => {
      callback(hasErrorMock)
    }
  }
}))

const fakeCard = {
  titulo: 'any_titulo',
  conteudo: 'any_conteudo',
  lista: 'any_lista'
}

describe('AddCardSqlite Repository', () => {
  it('should throws if db throws', async () => {
    hasErrorMock = new Error('any error')
    const sut = makeSut()
    await expect(sut.add(fakeCard)).rejects.toThrowError('any error')
  })

  it('should return card if db does not have an error', async () => {
    hasErrorMock = undefined
    const sut = makeSut()
    const card = await sut.add(fakeCard)
    expect(card).toHaveProperty('id')
  })
})
