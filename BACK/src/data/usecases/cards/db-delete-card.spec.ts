import { DeleteCardRepository } from '@data/protocols/db/card/delete-card-repository'
import { DeleteCard } from '@domain/usecases/delete-card'
import { DBDeleteCard } from './db-delete-card'

type SutTypes = {
  sut: DeleteCard
  deleteCardRepositoryStub: DeleteCardRepository
}

const makeDBDeleteCardRepositoryStub = () => {
  class DBDeleteCardRepositoryStub implements DeleteCardRepository {
    delete() {
      return Promise.resolve(true)
    }
  }

  return new DBDeleteCardRepositoryStub()
}

const makeSut = (): SutTypes => {
  const deleteCardRepositoryStub = makeDBDeleteCardRepositoryStub()
  const sut = new DBDeleteCard(deleteCardRepositoryStub)

  return { sut, deleteCardRepositoryStub }
}

describe('DBUpdateCardRepository usecase', () => {
  it('should return null if DBDeleteCardRepository return false', async () => {
    const { sut, deleteCardRepositoryStub } = makeSut()
    jest.spyOn(deleteCardRepositoryStub, 'delete').mockResolvedValueOnce(false)
    const updatedCard = await sut.delete('any_id')
    expect(updatedCard).toBeFalsy()
  })

  it('should throw if DBDeleteCardRepository throws', async () => {
    const { sut, deleteCardRepositoryStub } = makeSut()
    jest
      .spyOn(deleteCardRepositoryStub, 'delete')
      .mockRejectedValueOnce(new Error())
    const promise = sut.delete('any_id')
    expect(promise).rejects.toThrow()
  })

  it('should return card delete correctly', async () => {
    const { sut } = makeSut()
    const card = await sut.delete('any_id')
    expect(card).toBeTruthy()
  })
})
