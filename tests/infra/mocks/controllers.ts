import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { ok } from '@infra/http/helpers/http';

export class ControllerStub extends BaseController {
  async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok('any_body');
  }
}
