import { BaseMiddleware } from '@infra/http/middlewares/BaseMiddleware';
import { AuthenticateInterface } from '@application/interfaces/use-cases/authentication/AuthenticateInterface';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { forbidden, ok } from '@infra/http/helpers/http';
import { ForbiddenError } from '@application/errors/ForbiddenError';
import { AuthTokenNotProvidedError } from '@infra/http/errors/AuthTokenNotProvidedError';
import { InvalidAuthTokenError } from '@infra/http/errors/InvalidAuthTokenError';

export class AuthMiddleware extends BaseMiddleware {
  constructor(
    private readonly authenticate: AuthenticateInterface,
  ) {
    super();
  }

  async execute(httpRequest: AuthMiddleware.Request): Promise<AuthMiddleware.Response> {
    const authHeader = httpRequest.headers?.authorization;
    if (!authHeader) {
      return forbidden(new AuthTokenNotProvidedError());
    }
    const [, authToken] = authHeader.split(' ');
    const userIdOrError = await this.authenticate.execute(authToken);
    if (userIdOrError instanceof ForbiddenError) {
      return forbidden(new InvalidAuthTokenError());
    }
    return ok({ userId: userIdOrError });
  }
}

export namespace AuthMiddleware {
  export type Request = HttpRequest<undefined, undefined, { authorization: string }>;
  export type Response =
    HttpResponse<{ userId: string } | AuthTokenNotProvidedError | InvalidAuthTokenError>;
}
