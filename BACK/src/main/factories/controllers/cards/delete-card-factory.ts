import { DBDeleteCard } from '@data/usecases/cards/db-delete-card'
import { DeleteCardSqliteRepository } from '@infra/db/sqlite/card/delete-card-sqlite-repository'
import { DeleteCardController } from '@presentation/controllers/card/delete-card'
import { Controller } from '@presentation/protocols'

export const makeDeleteCardController = (): Controller => {
  const deleteCardRepository = new DeleteCardSqliteRepository()
  const dbDeleteCard = new DBDeleteCard(deleteCardRepository)
  return new DeleteCardController(dbDeleteCard)
}
