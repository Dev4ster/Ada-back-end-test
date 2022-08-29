import { notFound, ok } from '@presentation/helpers/http/http-helper'
import { DeleteCardController } from '.'
import { badRequest, serverError } from '@presentation/helpers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { DeleteCard, Controller } from './delete-card-protocols'

type SutType = {
  sut: Controller
  deleteCardStub: DeleteCard
}

const fakeHttpRequest = {
  params: {
    id: 'any_id'
  }
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
  const sut = new DeleteCardController(deleteCardStub)
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
    expect(httpResponse).toEqual(ok({ deleted: true }))
  })
})
