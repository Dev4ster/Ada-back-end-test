import { GetCards } from '@domain/usecases/get-cards'
import { GetCardsRepository } from '@data/protocols/db/card/get-cards-repository'

export class DbGetCards implements GetCards {
  constructor(private readonly getCardsRepository: GetCardsRepository) {}
  async getAll() {
    return this.getCardsRepository.getAll()
  }
}
