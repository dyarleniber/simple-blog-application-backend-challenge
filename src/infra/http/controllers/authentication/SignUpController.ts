import { SignUpInterface } from '@application/interfaces/use-cases/authentication/SignUpInterface';
import { SignInInterface } from '@application/interfaces/use-cases/authentication/SignInInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { forbidden, ok } from '@infra/http/helpers/http';
import { EmailInUseError } from '@application/errors/EmailInUseError';

export class SignUpController extends BaseController {
  constructor(
    private readonly signUpValidation: Validation,
    private readonly signUp: SignUpInterface,
    private readonly signIn: SignInInterface,
  ) {
    super(signUpValidation);
  }

  async execute(
    httpRequest: SignUpController.Request,
  ): Promise<SignUpController.Response> {
    const {
      name, username, email, password,
    } = httpRequest.body!;
    const idOrError = await this.signUp.execute({
      name, username, email, password,
    });
    if (idOrError instanceof EmailInUseError) {
      return forbidden(idOrError);
    }
    const authenticationTokenOrError = await this.signIn.execute({ email, password });
    if (authenticationTokenOrError instanceof Error) {
      throw authenticationTokenOrError;
    }
    return ok({
      authenticationToken: authenticationTokenOrError,
    });
  }
}

export namespace SignUpController {
  export type Request = HttpRequest<SignUpInterface.Request>;
  export type Response = HttpResponse<{ authenticationToken: string } | EmailInUseError>;
}
