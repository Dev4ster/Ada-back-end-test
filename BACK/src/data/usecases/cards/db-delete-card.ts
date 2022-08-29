import { DeleteCardRepository } from '@data/protocols/db/card/delete-card-repository'
import { DeleteCard } from '@domain/usecases/delete-card'

export class DBDeleteCard implements DeleteCard {
  constructor(private readonly deleteCardRepository: DeleteCardRepository) {}
  delete(cardId: string) {
    return this.deleteCardRepository.delete(cardId)
  }
}
