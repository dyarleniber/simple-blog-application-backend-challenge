import { ValidationComposite } from '@infra/http/validations/ValidationComposite';
import { RequiredFieldValidation } from '@infra/http/validations/RequiredFieldValidation';
import { EmailValidation } from '@infra/http/validations/EmailValidation';
import { EmailValidatorAdapter } from '@infra/http/validators/EmailValidatorAdapter';

export const makeSignInValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter();
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', emailValidator),
  ], 'body');
};
