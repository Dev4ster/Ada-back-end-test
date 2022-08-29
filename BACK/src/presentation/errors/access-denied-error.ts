export class AccessDeniedError extends Error {
  constructor() {
    super('Access Token is expired or invalid')
    this.name = 'AccessDeniedError'
  }
}
