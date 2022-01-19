import { BaseMiddleware } from '@infra/http/middlewares/BaseMiddleware';
import { AuthMiddleware } from '@infra/http/middlewares/authentication/AuthMiddleware';
import { makeAuthenticate } from '@main/factories/use-cases/authentication/authenticate-factory';

export const makeAuthMiddleware = (): BaseMiddleware => {
  const authenticateUseCase = makeAuthenticate();
  return new AuthMiddleware(authenticateUseCase);
};
