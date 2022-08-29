import { Express, Router } from 'express'
import { resolve } from 'path'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/', router)

  readdirSync(resolve(__dirname, '..', 'routes')).map(async (file) => {
    if (!file.includes('.test.')) {
      const route = (await import(resolve(__dirname, '..', 'routes', file)))
        .default
      route(router)
    }
  })
}
