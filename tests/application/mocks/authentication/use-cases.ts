import { AuthenticateInterface } from '@application/interfaces/use-cases/authentication/AuthenticateInterface';

export class AuthenticateStub implements AuthenticateInterface {
  async execute(
    _authenticationToken: AuthenticateInterface.Request,
  ): Promise<AuthenticateInterface.Response> {
    return 'any_token';
  }
}
