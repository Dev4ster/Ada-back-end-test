import { notFound, ok } from '@presentation/helpers/http/http-helper'
import { UpdateCard } from '@domain/usecases/update-card'
import { Card } from '@domain/models/card'
import { Controller } from './update-cards-protocols'
import { UpdateCardController } from '.'
import { badRequest, serverError } from '@presentation/helpers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'

type SutType = {
  sut: Controller
  updateCardStub: UpdateCard
}

const fakeCardUpated = {
  conteudo: 'any_conteudo',
  id: 'any_id',
  lista: 'any_lista',
  titulo: 'any_titulo'
} as Card

const fakeHttpRequest = {
  body: {
    conteudo: 'any_conteudo',
    lista: 'any_lista',
    titulo: 'any_titulo'
  },
  params: {
    id: 'any_id'
  }
}

const makeUpdateCardStub = (): UpdateCard => {
  class UpdateCardStub implements UpdateCard {
    update() {
      return Promise.resolve(fakeCardUpated)
    }
  }

  return new UpdateCardStub()
}

const makeSut = (): SutType => {
  const updateCardStub = makeUpdateCardStub()
  const sut = new UpdateCardController(updateCardStub)
  return { sut, updateCardStub }
}

describe('UpdateCardController', () => {
  it('should returns badrequest if param title has not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        ...fakeHttpRequest.body,
        titulo: null
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('titulo')))
  })

  it('should returns badrequest if param conteudo has not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        ...fakeHttpRequest.body,
        conteudo: null
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('conteudo')))
  })

  it('should returns badrequest if param lista has not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        ...fakeHttpRequest.body,
        lista: null
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('lista')))
  })

  it('should returns badrequest if param cardId has not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        ...fakeHttpRequest.body
      },
      params: {}
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cardId')))
  })

  it('should returns badrequest if param cardUpdate returns empty', async () => {
    const { sut, updateCardStub } = makeSut()
    jest.spyOn(updateCardStub, 'update').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(
      notFound(new InvalidParamError('cardId does not exists'))
    )
  })

  it('should returns server error if CardUpdate throws', async () => {
    const { sut, updateCardStub } = makeSut()
    jest.spyOn(updateCardStub, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return cardUpdated if CardUpdate has success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(ok(fakeCardUpated))
  })
})
