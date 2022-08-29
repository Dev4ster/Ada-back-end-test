export interface DeleteCardRepository {
  delete: (cardId: string) => Promise<boolean>
}
