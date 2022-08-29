import { notFound, ok } from '@presentation/helpers/http/http-helper'
import { DeleteCardController } from '.'
import { badRequest, serverError } from '@presentation/helpers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { DeleteCard, Controller } from './delete-card-protocols'
import { GetCards } from '../get-cards/get-cards-protocols'
import { Card } from '@domain/models/card'

type SutType = {
  sut: Controller
  deleteCardStub: DeleteCard
}

const fakeHttpRequest = {
  params: {
    id: 'any_id'
  }
}

const mockItems = [
  {
    conteudo: 'any_conteudo',
    id: 'any_id',
    lista: 'any_lista',
    titulo: 'any_titulo'
  }
]

const makeGetCardsStub = (): GetCards => {
  class GetCardsStub implements GetCards {
    async getAll() {
      return mockItems as Card[]
    }
  }
  return new GetCardsStub()
}

const makeDeleteCardStub = (): DeleteCard => {
  class DeleteCardStub implements DeleteCard {
    delete() {
      return Promise.resolve(true)
    }
  }

  return new DeleteCardStub()
}

const makeSut = (): SutType => {
  const deleteCardStub = makeDeleteCardStub()
  const getCardsStub = makeGetCardsStub()
  const sut = new DeleteCardController(deleteCardStub, getCardsStub)
  return { sut, deleteCardStub }
}

describe('UpdateCardController', () => {
  it('should returns badrequest if param cardId has not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {},
      params: {}
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cardId')))
  })

  it('should returns notfound if deleteCard returns false', async () => {
    const { sut, deleteCardStub } = makeSut()
    jest.spyOn(deleteCardStub, 'delete').mockResolvedValueOnce(false)
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(
      notFound(new InvalidParamError('cardId does not exists'))
    )
  })

  it('should returns server error if DeleteCard throws', async () => {
    const { sut, deleteCardStub } = makeSut()
    jest.spyOn(deleteCardStub, 'delete').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return cardUpdated if CardUpdate has success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(ok(mockItems))
  })
})
