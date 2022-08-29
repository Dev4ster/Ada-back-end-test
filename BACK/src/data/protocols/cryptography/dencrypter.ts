/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Decrypter {
  decrypt: (token: string) => Promise<any>
}
