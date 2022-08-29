import { makeLogControllerDecorator } from '@main/factories/decorators/log-controller-decorator'
import { Router } from 'express'

import { adaptRoute } from '@main/adapters/express-route-adapter'
import { makeAddCardController } from '@main/factories/controllers/cards/add-card-factory'
import { makeGetCardsController } from '@main/factories/controllers/cards/get-cards-factory'
import { adaptMiddlewareAuth } from '@main/factories/middlewares/auth-middleware-factory'
import { makeUpdateController } from '@main/factories/controllers/cards/update-card-factory'
import { makeDeleteCardController } from '@main/factories/controllers/cards/delete-card-factory'

export default (router: Router): void => {
  router.get('/card', adaptMiddlewareAuth, adaptRoute(makeGetCardsController()))
  router.post('/card', adaptMiddlewareAuth, adaptRoute(makeAddCardController()))
  router.put(
    '/card/:id',
    adaptMiddlewareAuth,
    adaptRoute(makeLogControllerDecorator(makeUpdateController(), 'Alterar'))
  ),
    router.delete(
      '/card/:id',
      adaptMiddlewareAuth,
      adaptRoute(
        makeLogControllerDecorator(makeDeleteCardController(), 'Remover')
      )
    )
}
