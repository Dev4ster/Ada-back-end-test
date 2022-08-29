import { DBUpdateCard } from '@data/usecases/cards/db-update-card'
import { UpdateCardSqliteRepository } from '@infra/db/sqlite/card/update-card-sqlite-repository'
import { UpdateCardController } from '@presentation/controllers/card/update-card'
import { Controller } from '@presentation/protocols'

export const makeUpdateController = (): Controller => {
  const updateCardRepository = new UpdateCardSqliteRepository()
  const dbUpdatedCard = new DBUpdateCard(updateCardRepository)
  return new UpdateCardController(dbUpdatedCard)
}
