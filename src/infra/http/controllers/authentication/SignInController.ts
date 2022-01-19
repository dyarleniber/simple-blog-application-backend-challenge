import { SignInInterface } from '@application/interfaces/use-cases/authentication/SignInInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { unauthorized, ok } from '@infra/http/helpers/http';
import { UnauthorizedError } from '@application/errors/UnauthorizedError';

export class SignInController extends BaseController {
  constructor(
    private readonly signInValidation: Validation,
    private readonly signIn: SignInInterface,
  ) {
    super(signInValidation);
  }

  async execute(
    httpRequest: SignInController.Request,
  ): Promise<SignInController.Response> {
    const { email, password } = httpRequest.body!;
    const authenticationTokenOrError = await this.signIn.execute({ email, password });
    if (authenticationTokenOrError instanceof UnauthorizedError) {
      return unauthorized(authenticationTokenOrError);
    }
    return ok({
      authenticationToken: authenticationTokenOrError,
    });
  }
}

export namespace SignInController {
  export type Request = HttpRequest<SignInInterface.Request>;
  export type Response = HttpResponse<{ authenticationToken: string } | UnauthorizedError>;
}
