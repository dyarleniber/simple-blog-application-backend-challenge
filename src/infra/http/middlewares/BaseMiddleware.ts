import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { serverError } from '@infra/http/helpers/http';

export abstract class BaseMiddleware {
  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
