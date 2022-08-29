import { UpdateCardRepository } from '@data/protocols/db/card/update-card-repository'
import { Card } from '@domain/models/card'
import { UpdateCard } from '@domain/usecases/update-card'

export class DBUpdateCard implements UpdateCard {
  constructor(private readonly updateCardRepository: UpdateCardRepository) {}
  async update(card: Card) {
    return this.updateCardRepository.update(card)
  }
}
