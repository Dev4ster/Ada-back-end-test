import { DbGetCards } from '@data/usecases/cards/db-get-cards'
import { GetCardsSqliteRepository } from '@infra/db/sqlite/card/get-cards-sqlite-repository'
import { GetCardsController } from '@presentation/controllers/card/get-cards'
import { Controller } from '@presentation/protocols'

export const makeGetCardsController = (): Controller => {
  const getCardsSqliteRepository = new GetCardsSqliteRepository()
  const dbGetCards = new DbGetCards(getCardsSqliteRepository)
  return new GetCardsController(dbGetCards)
}
