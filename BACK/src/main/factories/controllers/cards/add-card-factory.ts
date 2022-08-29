import { DBCreateCard } from '@data/usecases/cards/db-create-card'
import { AddCardSqliteRepository } from '@infra/db/sqlite/card/add-card-sqlite-repository'
import { AddCardController } from '@presentation/controllers/card/add-card'
import { Controller } from '@presentation/protocols'

export const makeAddCardController = (): Controller => {
  const getCardsSqliteRepository = new AddCardSqliteRepository()
  const dbAddCard = new DBCreateCard(getCardsSqliteRepository)
  return new AddCardController(dbAddCard)
}
