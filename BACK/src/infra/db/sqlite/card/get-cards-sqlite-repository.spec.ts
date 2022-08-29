/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@domain/models/card'
import { GetCardsSqliteRepository } from './get-cards-sqlite-repository'

const makeSut = () => {
  const sut = new GetCardsSqliteRepository()

  return sut
}

let hasErrorMock: Error | undefined = undefined

const hasRowsMock: Card[] = [
  {
    titulo: 'any_titulo',
    conteudo: 'any_conteudo',
    lista: 'any_lista',
    id: 'any_id'
  }
]

jest.mock('../helpers/sqlite-helper', () => ({
  db: {
    all: (_: any, __: any, callback: (error?: Error, rows?: any[]) => void) => {
      callback(hasErrorMock, hasRowsMock)
    }
  }
}))

describe('GetCardsSqlite Repository', () => {
  it('should throws if db throws', async () => {
    hasErrorMock = new Error('any error')
    const sut = makeSut()
    await expect(sut.getAll()).rejects.toThrowError('any error')
  })

  it('should return cards if db does not have an error and have cards', async () => {
    hasErrorMock = undefined
    const sut = makeSut()
    const cards = await sut.getAll()
    expect(cards).toHaveLength(1)
  })
})
