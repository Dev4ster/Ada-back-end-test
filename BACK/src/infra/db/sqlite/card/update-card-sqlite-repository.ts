import { UpdateCardRepository } from '@data/protocols/db/card/update-card-repository'
import { Card } from '@domain/models/card'
import { db } from '../helpers/sqlite-helper'

export class UpdateCardSqliteRepository implements UpdateCardRepository {
  async update(card: Card) {
    const sql = `
    UPDATE cards
    SET titulo = ?,
     conteudo = ?,
     lista = ?
    WHERE id = ?
    `
    return new Promise<Card | null>((resolve, reject) => {
      db.run(
        sql,
        [card.titulo, card.conteudo, card.lista, card.id],
        function (err) {
          if (err) reject(err)
          if (this.changes === 0) resolve(null)
          resolve(card)
        }
      )
    })
  }
}
