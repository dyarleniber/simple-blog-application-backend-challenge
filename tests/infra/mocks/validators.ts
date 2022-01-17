import { Validation } from '@infra/http/interfaces/Validation';
import { EmailValidator } from '@infra/http/validations/interfaces/EmailValidator';

export class ValidationStub implements Validation {
  validate(_input: any): Error | null {
    return null;
  }
}

export class EmailValidatorStub implements EmailValidator {
  isValid(_email: string): boolean {
    return true;
  }
}
