import { UpdateCardRepository } from '@data/protocols/db/card/update-card-repository'
import { Card } from '@domain/models/card'
import { UpdateCard } from '@domain/usecases/update-card'
import { DBUpdateCard } from './db-update-card'

type SutTypes = {
  sut: UpdateCard
  updateCardRepositoryStub: UpdateCardRepository
}

const fakeCardToUpdate = {
  conteudo: 'any_conteudo',
  id: 'any_id',
  lista: 'any_lista',
  titulo: 'any_titulo'
} as Card

const makeDBUpdateCardRepositoryStub = () => {
  class DBUpdateCardRepositoryStub implements UpdateCardRepository {
    update() {
      return Promise.resolve(fakeCardToUpdate)
    }
  }

  return new DBUpdateCardRepositoryStub()
}

const makeSut = (): SutTypes => {
  const updateCardRepositoryStub = makeDBUpdateCardRepositoryStub()
  const sut = new DBUpdateCard(updateCardRepositoryStub)

  return { sut, updateCardRepositoryStub }
}

describe('DBUpdateCardRepository usecase', () => {
  it('should return null if DBUpdateCardRepository return null', async () => {
    const { sut, updateCardRepositoryStub } = makeSut()
    jest.spyOn(updateCardRepositoryStub, 'update').mockResolvedValueOnce(null)
    const updatedCard = await sut.update(fakeCardToUpdate)
    expect(updatedCard).toBeNull()
  })

  it('should throw if DBUpdateCardRepository throws', async () => {
    const { sut, updateCardRepositoryStub } = makeSut()
    jest
      .spyOn(updateCardRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error())
    const promise = sut.update(fakeCardToUpdate)
    expect(promise).rejects.toThrow()
  })

  it('should return cardUpdated correctly', async () => {
    const { sut } = makeSut()
    const card = await sut.update(fakeCardToUpdate)
    expect(card).toEqual(fakeCardToUpdate)
  })
})
