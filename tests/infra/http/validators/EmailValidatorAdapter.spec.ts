import validator from 'validator';
import { EmailValidatorAdapter } from '@infra/http/validators/EmailValidatorAdapter';

jest.mock('validator', () => ({
  isEmail(_email: string): boolean {
    return true;
  },
}));

describe('EmailValidatorAdapter', () => {
  it('should call validator with correct email', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    emailValidatorAdapter.isValid('any_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should return false if validator returns false', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = emailValidatorAdapter.isValid('invalid_email');
    expect(isValid).toBe(false);
  });

  it('should return true if validator returns true', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const isValid = emailValidatorAdapter.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });
});
