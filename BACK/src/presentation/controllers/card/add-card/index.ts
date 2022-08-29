import { MissingParamError } from '@presentation/errors'
import { badRequest, created, serverError } from '@presentation/helpers'
import {
  HttpResponse,
  Controller,
  CreateCard,
  HttpRequest
} from './add-cards-protocols'

export class AddCardController implements Controller {
  constructor(private readonly createCard: CreateCard) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const bodyParams = httpRequest.body
    const requiredParams = ['lista', 'titulo', 'conteudo']
    for (const param of requiredParams) {
      if (!bodyParams[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    try {
      const card = await this.createCard.add(bodyParams)
      return created(card)
    } catch (error) {
      return serverError(new Error())
    }
  }
}
