import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { badRequest, serverError } from '@infra/http/helpers/http';

export abstract class BaseController {
  constructor(private readonly validation?: Validation) {}

  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation?.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      return await this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
