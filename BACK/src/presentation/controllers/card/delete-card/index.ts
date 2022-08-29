import {
  DeleteCard,
  HttpResponse,
  Controller,
  HttpRequest
} from './delete-card-protocols'
import { badRequest, notFound, ok, serverError } from '@presentation/helpers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { GetCards } from '../get-cards/get-cards-protocols'

export class DeleteCardController implements Controller {
  constructor(
    private readonly deleteCard: DeleteCard,
    private readonly getCards: GetCards
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requestParams = httpRequest.params

    if (!requestParams.id) {
      return badRequest(new MissingParamError('cardId'))
    }

    try {
      const cardDelete = await this.deleteCard.delete(requestParams.id)

      if (!cardDelete)
        return notFound(new InvalidParamError('cardId does not exists'))

      const remainCards = await this.getCards.getAll()
      return ok(remainCards)
    } catch (error) {
      return serverError(new Error())
    }
  }
}
