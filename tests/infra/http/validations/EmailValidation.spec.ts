import { EmailValidation } from '@infra/http/validations/EmailValidation';
import { InvalidParamError } from '@infra/http/errors/InvalidParamError';
import { EmailValidatorStub } from '@tests/infra/mocks/validators';

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidatorStub
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new EmailValidation('email', emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('EmailValidation', () => {
  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should return an InvalidParamError if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ email: 'invalid_email' });
    expect(error).toEqual(new InvalidParamError('email'));
  });

  it('should return null on success', () => {
    const { sut } = makeSut();
    const error = sut.validate({ email: 'valid_email@mail.com' });
    expect(error).toBeNull();
  });
});
