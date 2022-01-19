import { AuthenticateInterface } from '@application/interfaces/use-cases/authentication/AuthenticateInterface';
import { Authenticate } from '@application/use-cases/authentication/Authenticate';
import { JWTAdapter } from '@infra/cryptography/JWTAdapter';
import env from '@main/config/env';

export const makeAuthenticate = (): AuthenticateInterface => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret);
  return new Authenticate(jwtAdapter);
};
