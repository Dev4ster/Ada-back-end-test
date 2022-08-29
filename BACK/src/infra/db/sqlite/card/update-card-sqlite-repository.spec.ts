/* eslint-disable @typescript-eslint/no-explicit-any */
import { RunResult } from 'sqlite3'
import { Card } from '@domain/models/card'
import { UpdateCardSqliteRepository } from './update-card-sqlite-repository'

const makeSut = () => {
  const sut = new UpdateCardSqliteRepository()

  return sut
}

let hasErrorMock: Error | undefined

const cardUpdatedMock: Card = {
  titulo: 'any_titulo',
  conteudo: 'any_conteudo',
  lista: 'any_lista',
  id: 'any_id'
}

const runResultMock = {
  changes: 1
} as RunResult

jest.mock('../helpers/sqlite-helper', () => ({
  db: {
    run: (_: any, __: any, callback: (error?: Error) => void) => {
      callback.bind(runResultMock)(hasErrorMock)
    }
  }
}))

describe('UpdateCardSqlite Repository', () => {
  it('should throws if db throws', async () => {
    hasErrorMock = new Error('any error')
    const sut = makeSut()
    await expect(sut.update(cardUpdatedMock)).rejects.toThrowError('any error')
  })

  it('should return null if db does not have affected rows', async () => {
    hasErrorMock = undefined
    const sut = makeSut()
    runResultMock.changes = 0
    const card = await sut.update(cardUpdatedMock)
    expect(card).toBeNull()
  })

  it('should return a card if db have affected rows', async () => {
    hasErrorMock = undefined
    const sut = makeSut()
    runResultMock.changes = 1
    const card = await sut.update(cardUpdatedMock)
    expect(card).toEqual(cardUpdatedMock)
  })
})
