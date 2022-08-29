import { GetCards, HttpResponse, Controller } from './get-cards-protocols'
import { ok, serverError } from '@presentation/helpers'

export class GetCardsController implements Controller {
  constructor(private readonly getCards: GetCards) {}
  async handle(): Promise<HttpResponse> {
    try {
      const cards = await this.getCards.getAll()
      return ok(cards)
    } catch (error) {
      return serverError(new Error())
    }
  }
}
