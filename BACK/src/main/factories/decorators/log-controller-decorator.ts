import { LogControllerDecorator } from '@main/decorators/log-controller-decorator'
import { ActionLog, Controller } from '@presentation/protocols'

export const makeLogControllerDecorator = (
  controller: Controller,
  action: ActionLog
): Controller => {
  const logControllerDecorator = new LogControllerDecorator(controller, action)
  return logControllerDecorator
}
