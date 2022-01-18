import { AuthenticateInterface } from '@application/interfaces/use-cases/authentication/AuthenticateInterface';
import { JWTVerifier } from '@application/interfaces/cryptography/JWTVerifier';
import { ForbiddenError } from '@application/errors/ForbiddenError';

export class Authenticate implements AuthenticateInterface {
  constructor(
    private readonly jwtVerifier: JWTVerifier,
  ) {}

  async execute(
    authenticationToken: AuthenticateInterface.Request,
  ): Promise<AuthenticateInterface.Response> {
    const decodedToken = await this.jwtVerifier.verify(authenticationToken);
    if (!decodedToken) {
      return new ForbiddenError();
    }
    return decodedToken;
  }
}
