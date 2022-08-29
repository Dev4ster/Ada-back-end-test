/* eslint-disable @typescript-eslint/no-explicit-any */
import { RunResult } from 'sqlite3'
import { DeleteCardSqliteRepository } from './delete-card-sqlite-repository'

const makeSut = () => {
  const sut = new DeleteCardSqliteRepository()

  return sut
}

let hasErrorMock: Error | undefined

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

describe('DeleteCardSqlite Repository', () => {
  it('should throws if db throws', async () => {
    hasErrorMock = new Error('any error')
    const sut = makeSut()
    await expect(sut.delete('any_id')).rejects.toThrowError('any error')
  })

  it('should return null if db does not have affected rows', async () => {
    hasErrorMock = undefined
    const sut = makeSut()
    runResultMock.changes = 0
    const card = await sut.delete('any_id')
    expect(card).toBe(false)
  })

  it('should return a true if db have affected rows', async () => {
    hasErrorMock = undefined
    const sut = makeSut()
    runResultMock.changes = 1
    const cardDeleted = await sut.delete('any_id')
    expect(cardDeleted).toEqual(true)
  })
})
