import { BaseController } from '@infra/http/controllers/BaseController';
import { SignUpController } from '@infra/http/controllers/authentication/SignUpController';
import { makeSignUpValidation } from '@main/factories/controllers/authentication/sign-up/validation-factory';
import { makeSignUp } from '@main/factories/use-cases/authentication/sign-up-factory';
import { makeSignIn } from '@main/factories/use-cases/authentication/sign-in-factory';

export const makeSignUpController = (): BaseController => {
  const validation = makeSignUpValidation();
  const signUpUseCase = makeSignUp();
  const signInUseCase = makeSignIn();
  return new SignUpController(validation, signUpUseCase, signInUseCase);
};
