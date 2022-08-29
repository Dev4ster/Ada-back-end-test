import { CreateCardRepository } from '@data/protocols/db/card/create-card-repository'
import { CreateCard } from '@domain/usecases/create-card'
import { DBCreateCard } from './db-create-card'

type SutTypes = {
  sut: CreateCard
  createCardRepositoryStub: CreateCardRepository
}

const fakeCardToAdd = {
  conteudo: 'any_conteudo',
  lista: 'any_lista',
  titulo: 'any_titulo'
}

const makeCreateCardRepositoryStub = () => {
  class CreateCardRepositoryStub implements CreateCardRepository {
    add() {
      return Promise.resolve({
        id: 'any_id',
        conteudo: 'any_conteudo',
        lista: 'any_lista',
        titulo: 'any_titulo'
      })
    }
  }
  return new CreateCardRepositoryStub()
}
const makeSut = (): SutTypes => {
  const createCardRepositoryStub = makeCreateCardRepositoryStub()
  const sut = new DBCreateCard(createCardRepositoryStub)

  return { sut, createCardRepositoryStub }
}

describe('DBCreateCard usecase', () => {
  it('should throws if repository throws', async () => {
    const { sut, createCardRepositoryStub } = makeSut()
    jest
      .spyOn(createCardRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())
    await expect(sut.add(fakeCardToAdd)).rejects.toThrow()
  })

  it('should return correct card if add is successfully', async () => {
    const { sut } = makeSut()
    const card = await sut.add(fakeCardToAdd)
    expect(card).toHaveProperty('id')
  })
})
