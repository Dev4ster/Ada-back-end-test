import { DBDeleteCard } from '@data/usecases/cards/db-delete-card'
import { DbGetCards } from '@data/usecases/cards/db-get-cards'
import { DeleteCardSqliteRepository } from '@infra/db/sqlite/card/delete-card-sqlite-repository'
import { GetCardsSqliteRepository } from '@infra/db/sqlite/card/get-cards-sqlite-repository'
import { DeleteCardController } from '@presentation/controllers/card/delete-card'
import { Controller } from '@presentation/protocols'

export const makeDeleteCardController = (): Controller => {
  const getCardsSqliteRepository = new GetCardsSqliteRepository()
  const dbGetCards = new DbGetCards(getCardsSqliteRepository)
  const deleteCardRepository = new DeleteCardSqliteRepository()
  const dbDeleteCard = new DBDeleteCard(deleteCardRepository)
  return new DeleteCardController(dbDeleteCard, dbGetCards)
}
