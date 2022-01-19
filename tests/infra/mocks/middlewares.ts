import { BaseMiddleware } from '@infra/http/middlewares/BaseMiddleware';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { ok } from '@infra/http/helpers/http';

export class MiddlewareStub extends BaseMiddleware {
  async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok('any_body');
  }
}
