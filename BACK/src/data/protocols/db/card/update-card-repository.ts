import { Card } from '@domain/models/card'

export interface UpdateCardRepository {
  update: (card: Card) => Promise<Card | null>
}
