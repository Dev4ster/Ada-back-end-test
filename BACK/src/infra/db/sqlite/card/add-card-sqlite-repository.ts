import {
  CreateCardRepository,
  CardCreateParams
} from '@data/protocols/db/card/create-card-repository'
import { Card } from '@domain/models/card'
import { db } from '../helpers/sqlite-helper'
import { v4 } from 'uuid'

export class AddCardSqliteRepository implements CreateCardRepository {
  add(card: CardCreateParams) {
    const id = v4()
    const cardCreated = { ...card, id }
    const sql = `INSERT into cards (id, titulo, conteudo, lista) VALUES(?, ?, ?, ?)`
    return new Promise<Card>((resolve, reject) => {
      db.run(sql, [id, card.titulo, card.conteudo, card.lista], (err) => {
        if (err) reject(err)
        resolve(cardCreated)
      })
    })
  }
}
