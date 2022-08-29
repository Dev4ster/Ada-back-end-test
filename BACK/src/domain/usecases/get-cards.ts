import { Card } from '@domain/models/card'

export interface GetCards {
  getAll: () => Promise<Card[]>
}
