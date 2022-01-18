import { ValidationComposite } from '@infra/http/validations/ValidationComposite';
import { RequiredFieldValidation } from '@infra/http/validations/RequiredFieldValidation';

export const makeUpdateCommentValidation = (): ValidationComposite => new ValidationComposite([
  new RequiredFieldValidation('text'),
], 'body');
