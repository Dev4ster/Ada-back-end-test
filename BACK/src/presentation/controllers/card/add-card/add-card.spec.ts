import { Card } from '@domain/models/card'
import { MissingParamError } from '@presentation/errors'
import { badRequest, created, serverError } from '@presentation/helpers'
import { AddCardController } from '.'
import { Controller, CreateCard } from './add-cards-protocols'

type SutType = {
  sut: Controller
  createCardStub: CreateCard
}

const fakeCardCreated = {
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
  }
}

const makeCreateCardStub = (): CreateCard => {
  class CreateCardStub implements CreateCard {
    add() {
      return Promise.resolve(fakeCardCreated)
    }
  }

  return new CreateCardStub()
}

const makeSut = (): SutType => {
  const createCardStub = makeCreateCardStub()
  const sut = new AddCardController(createCardStub)
  return { sut, createCardStub }
}

describe('AddCardController', () => {
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

  it('should return server error if addCard throws', async () => {
    const { sut, createCardStub } = makeSut()
    jest.spyOn(createCardStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return card correctly', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(created(fakeCardCreated))
  })
})
