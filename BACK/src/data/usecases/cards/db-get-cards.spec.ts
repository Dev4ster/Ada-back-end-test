import { GetCardsRepository } from '@data/protocols/db/card/get-cards-repository'
import { GetCards } from '@domain/usecases/get-cards'
import { DbGetCards } from './db-get-cards'

type SutTypes = {
  sut: GetCards
  getCardsRepositoryStub: GetCardsRepository
}

const makeGetCardsRepositoryStub = () => {
  class GetCardsRepositoryStub implements GetCardsRepository {
    getAll() {
      return Promise.resolve([
        {
          id: 'any_id',
          conteudo: 'any_conteudo',
          lista: 'any_lista',
          titulo: 'any_titulo'
        }
      ])
    }
  }
  return new GetCardsRepositoryStub()
}
const makeSut = (): SutTypes => {
  const getCardsRepositoryStub = makeGetCardsRepositoryStub()
  const sut = new DbGetCards(getCardsRepositoryStub)

  return { sut, getCardsRepositoryStub }
}

describe('DBGetCards usecase', () => {
  it('should throws if repository throws', async () => {
    const { sut, getCardsRepositoryStub } = makeSut()
    jest
      .spyOn(getCardsRepositoryStub, 'getAll')
      .mockRejectedValueOnce(new Error())
    await expect(sut.getAll()).rejects.toThrow()
  })

  it('should return correct list of cards if getAll returns correctly', async () => {
    const { sut } = makeSut()
    const card = await sut.getAll()
    expect(card).toHaveLength(1)
    expect(card[0]).toHaveProperty('id')
  })
})
