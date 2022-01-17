import { Validation } from '@infra/http/interfaces/Validation';
import { EmailValidator } from '@infra/http/validations/interfaces/EmailValidator';
import { InvalidParamError } from '@infra/http/errors/InvalidParamError';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}
