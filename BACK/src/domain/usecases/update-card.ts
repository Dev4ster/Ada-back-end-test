import { Card } from '@domain/models/card'

export interface UpdateCard {
  update: (card: Card) => Promise<Card | null>
}
