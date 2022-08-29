import {
  DeleteCard,
  HttpResponse,
  Controller,
  HttpRequest
} from './delete-card-protocols'
import { badRequest, notFound, ok, serverError } from '@presentation/helpers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'

export class DeleteCardController implements Controller {
  constructor(private readonly deleteCard: DeleteCard) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requestParams = httpRequest.params

    if (!requestParams.id) {
      return badRequest(new MissingParamError('cardId'))
    }

    try {
      const card = await this.deleteCard.delete(requestParams.id)

      if (!card)
        return notFound(new InvalidParamError('cardId does not exists'))

      return ok({ deleted: card })
    } catch (error) {
      return serverError(new Error())
    }
  }
}
