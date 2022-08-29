import { Card } from '@domain/models/card'

export interface GetCardsRepository {
  getAll: () => Promise<Card[]>
}
