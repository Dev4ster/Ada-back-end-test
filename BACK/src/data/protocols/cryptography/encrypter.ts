/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Encrypter {
  encrypt: (value: any) => Promise<string>
}
