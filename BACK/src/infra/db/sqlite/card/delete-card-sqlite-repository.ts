import { DeleteCardRepository } from '@data/protocols/db/card/delete-card-repository'
import { db } from '../helpers/sqlite-helper'

export class DeleteCardSqliteRepository implements DeleteCardRepository {
  async delete(cardId: string) {
    const sql = `
    DELETE FROM cards
    WHERE id = ?
    `
    return new Promise<boolean>((resolve, reject) => {
      db.run(sql, [cardId], function (err) {
        if (err) reject(err)
        if (this.changes === 0) resolve(false)
        resolve(true)
      })
    })
  }
}
