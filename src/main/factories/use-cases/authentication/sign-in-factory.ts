import { SignInInterface } from '@application/interfaces/use-cases/authentication/SignInInterface';
import { SignIn } from '@application/use-cases/authentication/SignIn';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';
import { BcryptAdapter } from '@infra/cryptography/BcryptAdapter';
import { JWTAdapter } from '@infra/cryptography/JWTAdapter';
import env from '@main/config/env';

export const makeSignIn = (): SignInInterface => {
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter(env.bcryptSalt);
  const jwtAdapter = new JWTAdapter(env.jwtSecret);
  return new SignIn(userRepository, bcryptAdapter, jwtAdapter);
};
