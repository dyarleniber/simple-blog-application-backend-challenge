import validator from 'validator';
import { EmailValidator } from '@infra/http/validations/interfaces/EmailValidator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
