import {
  ActionLog,
  Controller,
  HttpRequest,
  HttpResponse
} from '@presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly action: ActionLog
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      const date = new Date().toLocaleString('pt-br')
      const cardInfo = httpRequest.body
      const cardId = httpRequest.params.id
      console.log(
        `${date} - Card ${cardId} - ${cardInfo.titulo || 'Sem Titulo'} - ${
          this.action
        }`
      )
    }
    return httpResponse
  }
}
