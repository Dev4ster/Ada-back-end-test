import { CreateCardRepository } from '@data/protocols/db/card/create-card-repository'
import { CreateCard, CardCreateParams } from '@domain/usecases/create-card'

export class DBCreateCard implements CreateCard {
  constructor(private readonly createCardRepository: CreateCardRepository) {}
  add(data: CardCreateParams) {
    return this.createCardRepository.add(data)
  }
}
