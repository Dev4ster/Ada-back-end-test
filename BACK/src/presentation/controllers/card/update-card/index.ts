import {
  UpdateCard,
  HttpResponse,
  Controller,
  HttpRequest
} from './update-cards-protocols'
import { badRequest, notFound, ok, serverError } from '@presentation/helpers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'

export class UpdateCardController implements Controller {
  constructor(private readonly updateCard: UpdateCard) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const bodyParams = httpRequest.body
    const requestParams = httpRequest.params
    const requiredParams = ['lista', 'titulo', 'conteudo']
    for (const param of requiredParams) {
      if (!bodyParams[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    if (!requestParams.id) {
      return badRequest(new MissingParamError('cardId'))
    }

    const cardData = { id: requestParams.id, ...bodyParams }

    try {
      const card = await this.updateCard.update(cardData)

      if (!card)
        return notFound(new InvalidParamError('cardId does not exists'))
      return ok(card)
    } catch (error) {
      return serverError(new Error())
    }
  }
}
