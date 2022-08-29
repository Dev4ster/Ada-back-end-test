export interface DeleteCard {
  delete: (cardId: string) => Promise<boolean>
}
