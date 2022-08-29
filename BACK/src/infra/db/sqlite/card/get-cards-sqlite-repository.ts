import { GetCardsRepository } from '@data/protocols/db/card/get-cards-repository'
import { Card } from '@domain/models/card'
import { db } from '../helpers/sqlite-helper'

export class GetCardsSqliteRepository implements GetCardsRepository {
  async getAll() {
    const sql = `SELECT * FROM cards`
    return new Promise<Card[]>((resolve, reject) => {
      db.all(sql, [], (err, row) => {
        if (err) reject(err)
        resolve(row)
      })
    })
  }
}
