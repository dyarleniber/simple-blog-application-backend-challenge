import { ValidationComposite } from '@infra/http/validations/ValidationComposite';
import { RequiredFieldValidation } from '@infra/http/validations/RequiredFieldValidation';

export const makeCreateCommentValidation = (): ValidationComposite => new ValidationComposite([
  new RequiredFieldValidation('userId'),
  new RequiredFieldValidation('postId'),
  new RequiredFieldValidation('text'),
], 'body');
