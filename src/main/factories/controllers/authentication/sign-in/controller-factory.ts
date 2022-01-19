import { BaseController } from '@infra/http/controllers/BaseController';
import { SignInController } from '@infra/http/controllers/authentication/SignInController';
import { makeSignInValidation } from '@main/factories/controllers/authentication/sign-in/validation-factory';
import { makeSignIn } from '@main/factories/use-cases/authentication/sign-in-factory';

export const makeSignInController = (): BaseController => {
  const validation = makeSignInValidation();
  const useCase = makeSignIn();
  return new SignInController(validation, useCase);
};
